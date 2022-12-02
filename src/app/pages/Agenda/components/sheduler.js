import React, { Fragment } from "react";
import { useSelector } from 'react-redux';
import { Scheduler } from "@aldabil/react-scheduler";
import { Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns'

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
  
const useStyles = makeStyles(theme => ({
  buttonDelete: {
    //margin: theme.spacing(1),
    backgroundColor: "red",
    color: "white",
    padding: "6px 10px",
    minWidth: 0
  },
  buttonEdit: {
    //margin: theme.spacing(1),
    backgroundColor: "silver",
    color: "white",
    padding: "6px 6px",
    minWidth: 0
  },
}));

export function MyScheduler(props) {

    const classes = useStyles();

    const schedules = useSelector(state => state.app.schedules);
    const my_courts_services = useSelector(state => state.app.courts_services);

    let schedulesToRender = [];
    let _recources = [];

    let min_hour = 18;
    let max_hour = 5;

    const handleClickEdit = (event_id, horario) => {
        props.setDataToView({
          id: event_id,
          horario: horario
        });
    }

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
                title: schedule.usuario,
                start: parseISO(schedule.horario),
                end: scheduling_end,
                disabled: schedule.status != "confirmed",
                editable: false,
                admin_id: parseInt(schedule.admin_id),
                tipo: schedule.tipo_str,
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
            hourFormat={"24"}
            locale={ptBR}
            view={"day"}
            resourceViewMode={props.schedulerView}
            height={800}
            day={{
                startHour: min_hour, 
                endHour: max_hour, 
                step: 60, 
                cellRenderer: ({ disabled, onClick, ...props }) => {
                    // Fake some condition up
                    const restProps = disabled ? {} : props;
                    return (
                      <Button
                        style={{
                          cursor: "inherit"
                        }}
                        onClick={() => {
                            return false;
                        }}
                        disableRipple={disabled}
                        // disabled={disabled}
                        {...restProps}
                      ></Button>
                    );
                }
            }}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5], 
                weekStartOn: 6, 
                startHour: min_hour, 
                endHour: max_hour, 
                step: 60, 
                cellRenderer: ({ disabled, onClick, ...props }) => {
                    // Fake some condition up
                    const restProps = disabled ? {} : props;
                    return (
                      <Button
                        style={{
                          cursor: "inherit"
                        }}
                        onClick={() => {
                            return false;
                        }}
                        disableRipple={disabled}
                        // disabled={disabled}
                        {...restProps}
                      ></Button>
                    );
                }
            }}
            eventRenderer={({ disabled, start, end, title, onClick, ...props }) => {
                const restProps = props;
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100%"
                      }}
                    >
                      <div className="font-weight-bold">{title}</div>
                      <div>{start.toLocaleTimeString("pt-BR", { timeStyle: "short" })} - {end.toLocaleTimeString("pt-BR", { timeStyle: "short" })} ({restProps.tipo})</div>
                    </div>
                  );
            }}
            viewerExtraComponent={(fields, event) => {
                return (
                  <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignContent: "flex-end",
                    marginTop: 5
                  }}>
                    <Button 
                        variant="contained" 
                        className={classes.buttonEdit}
                        onClick={()=> {
                            handleClickEdit(event.internal_id, format(event.start, 'yyyy-MM-dd HH:mm:ss'))
                        }}
                    >
                        VISUALIZAR
                    </Button>
                    
                  </div>
                );
            }}
            />
        </Fragment>
    );
}