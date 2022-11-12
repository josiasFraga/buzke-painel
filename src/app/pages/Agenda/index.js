import React, { useState, useEffect } from "react";
import { MyScheduler } from "./components/sheduler";
import { Filters } from "./components/filters";
import Paper from '@material-ui/core/Paper';

export function Agenda() {

    return (
        <>

            <h1 className="azul-cabecalho">Agenda</h1>
            <p className="subheader-text mb-10">Gestão de Agendamentos </p>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="row">
                    <div className="col-md-3">
                        <Filters />

                    </div>
                    <div className="col-md-9">
                        <MyScheduler />
                    </div>
                </div>
            </Paper>
        </>
    );
}