import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import BlockUi from 'react-block-ui';
import { MyScheduler } from "./components/MyScheduler";
import { Filters } from "./components/Filters";
import Paper from '@material-ui/core/Paper';
import DialogNewScheduling from "../../components/DialogNewScheduling";

export function Agenda() {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.app.is_schedules_loading);
    const [filterCourtServices, setFilterCourtServices] = useState({services_ids: []});
    const [filterClient, setFilterClient] = useState("");
    const [schedulerView, setSchedulerView] = useState("default");
    const [open, setOpen] = React.useState(false);
    const [dataToView, setDataToView] = React.useState(null);

    const handleClickNew = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setDataToView(null);
        setOpen(false);
        dispatch({type: 'LOAD_SCHEDULING_DATA', payload: {reset: true}});
    }

    const loadSchedules = () => {
        const today = new Date(); // obtém a data atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // define a data para o primeiro dia do mês atual

        const formattedDate = firstDayOfMonth.toISOString().slice(0, 10); // formata a data para o formato "yyyy-mm-dd"

        dispatch({type: 'LOAD_SCHEDULES', payload: {params: {type: 1, data: formattedDate, cliente_cliente_id: filterClient, ...filterCourtServices}}});
    }

    useEffect(() => {
        const interval = setInterval(() => {
            loadSchedules();
        }, 60000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        loadSchedules();
    }, [filterCourtServices, filterClient]);

    useEffect(() => {
        if ( dataToView != null ) {
            setOpen(true);
        }
    }, [dataToView]);

    useEffect(() => {
        dispatch({type: 'LOAD_COURTS_SERVICES', payload: {params: {tipo: "meus"}}});
        dispatch({type: 'LOAD_BUSINESS_CONFIGS', payload: {params: {}}});
    }, []);

    return (
        <>
            <DialogNewScheduling 
                open={open}
                handleClose={handleClose}
                dataToView={dataToView}
                loadSchedules={loadSchedules}
            />

            <div className="row">
                <div className="col-md-6">
                    <h1 className="azul-cabecalho">Agenda</h1>
                    <p className="subheader-text mb-10">Gestão de Agendamentos </p>
                </div>
                <div className="col-md-6 text-right">
                    <button type="button" className="btn btn-primary mb-10 rightBtn" onClick={() => { handleClickNew() }}>NOVO AGENDAMENTO</button>
                </div>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <BlockUi tag="div" blocking={loading}>
                    <div className="row">
                        <div className="col-md-3">
                            <Filters 
                                filterCourtServices={filterCourtServices} 
                                setFilterCourtServices={setFilterCourtServices}
                                schedulerView={schedulerView}
                                setSchedulerView={setSchedulerView}
                                filterClient={filterClient}
                                setFilterClient={setFilterClient}
                            />
                        </div>
                        <div className="col-md-9">
                            <MyScheduler 
                                filterCourtServices={filterCourtServices}
                                schedulerView={schedulerView}
                                setDataToView={setDataToView}
                            />
                        </div>
                    </div>
                </BlockUi>
            </Paper>
        </>
    );
}