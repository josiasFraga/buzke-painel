import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Scheduler } from "@aldabil/react-scheduler";
import ptBR from 'date-fns/locale/pt-BR';
import { 
    parseISO, 
    add
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

export function MyScheduler() {

    const schedules = useSelector(state => state.app.schedules);

    let schedulesToRender = [];
    let min_hour = 18;
    let max_hour = 5;

    Object.values(schedules).map((schedules_day)=>{
        return schedules_day.map((schedule)=>{

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
                event_id: schedule.id,
                title: schedule.name + " " + schedule.usuario,
                start: parseISO(schedule.horario),
                end: scheduling_end,
                admin_id: schedule.admin_id,
                dispatchEvent: schedule.status != "confirmed",
                editable: schedule.status == "confirmed",
                color: schedule.service_color
            });

        });
    });

    if ( min_hour > max_hour ) {
        min_hour = 9;
        max_hour = 18;
    }

    if ( schedulesToRender.length == 0 ) {
        return false

    }

    return (
        <Scheduler
        draggable={false}
        deletable={false}
        translations={translations}
        hourFormat={"24"}
        events={schedulesToRender}
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
        fields={[
            {
            name: "user_id",
            type: "select",
            // Should provide options with type:"select"
            options: [
                { id: 1, text: "John", value: 1 },
                { id: 2, text: "Mark", value: 2 }
            ],
            config: { label: "User", required: true, errMsg: "Plz Select User" }
            },
            {
            name: "Description",
            type: "input",
            default: "Default Value...",
            config: { label: "Details", multiline: true, rows: 4 }
            },
            {
            name: "anotherdate",
            type: "date",
            config: {
                label: "Other Date",
                md: 6,
                modalVariant: "dialog",
                type: "datetime"
            }
            }
        ]}
        />
    );
}