import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Scheduler } from "@aldabil/react-scheduler";

import ptBR from 'date-fns/locale/pt-BR';
import { 
    parseISO, 
 } from 'date-fns'

const translations = {
    navigation: {
        month: "Mês",
        week: "Semana",
        day: "Dia",
        today: "Hoje"
    },
    form: {
        addTitle: "Adicionar",
        editTitle: "Alterar",
        confirm: "Confirmar",
        delete: "Excluir",
        cancel: "Cancelar"
    },
    event: {
        title: "Título",
        start: "Início",
        end: "Fim"
    },
    moreEvents: "Mais..."
};

export function MyScheduler(props) {

    const schedules = useSelector(state => state.app.schedules);
    const my_courts_services = useSelector(state => state.app.courts_services);

    let schedulesToRender = [];
    let _recources = [];

    let min_hour = 18;
    let max_hour = 5;

    Object.values(schedules).map((schedules_day)=>{
        return schedules_day.map((schedule, index)=>{

            const scheduling_time = schedule.horario;
            const time = scheduling_time.split(" ")[1];
            const hour = time.split(":")[0];
            const end_hour = schedule.termino.split(":")[0];
            const date = scheduling_time.split(" ")[0];
            const scheduling_end = parseISO(date + " " + schedule.termino);
            
            if ( hour < min_hour ) {
                min_hour = hour;
            }
            
            if ( end_hour > max_hour ) {
                max_hour = end_hour;
            }

            schedulesToRender.push({
                event_id: parseInt(index)+1,
                internal_id: parseInt(schedule.id),
                title: schedule.name + " " + schedule.usuario,
                start: parseISO(schedule.horario),
                end: scheduling_end,
                //dispatchEvent: schedule.status != "confirmed",
                editable: schedule.status == "confirmed",
                admin_id: parseInt(schedule.admin_id),
            });

        });
    });

    Object.values(my_courts_services).map((court_service)=>{
        if ( props.filterCourtServices.services_ids.indexOf(court_service.ClienteServico.id) > -1 ) {
            _recources.push({
                admin_id: parseInt(court_service.ClienteServico.id),
                title: court_service.ClienteServico.nome,
                subtitle: court_service.ClienteServico.valor,
                avatar: court_service.ClienteServico.nome,
                color: court_service.ClienteServico.cor,
            });
        }
    });

    if ( min_hour > max_hour ) {
        min_hour = 9;
        max_hour = 18;
    }

    if ( schedulesToRender.length == 0 ) {
        return false
    }

    return (
        <Fragment>
            <Scheduler
            draggable={false}
            deletable={false}
            translations={translations}
            //events={EVENTS}
            events={schedulesToRender}
            resources={_recources}
            resourceFields={{
              idField: "admin_id",
              textField: "title",
              subTextField: "subtitle",
              avatarField: "avatar",
              colorField: "color"
            }}
            resourceViewMode={"default"}
            hourFormat={"24"}
            locale={ptBR}
            view={"day"}
            height={800}
            day={{
                startHour: min_hour, 
                endHour: max_hour, 
                step: 60, 
            }}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5], 
                weekStartOn: 6, 
                startHour: min_hour, 
                endHour: max_hour, 
                step: 60, 
            }}
            />
        </Fragment>
    );
}