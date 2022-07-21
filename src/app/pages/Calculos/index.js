import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlockUi from 'react-block-ui';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import ListagemCalculos from './components/ListagemCalculos';
import Tabs from './components/Tabs';

export default function Calculos(props) {
    const dispatch = useDispatch();
    const calculations = useSelector(state => state.app.calculations);
    const calculations_loading = useSelector(state => state.app.calculations_loading);
    const [tab, setTab] = useState('calculations');

    useEffect(() => {
        dispatch({ type: 'LOAD_CALCULATIONS' });
    }, []);

    return (<>
        <h1 className="azul-cabecalho">Meus Cálculos</h1>
        <p className="subheader-text mb-10">Visualize os seus cálculos, edite e recalcule.</p>

        <BlockUi tag="div" blocking={calculations_loading}>

            <div className="card card-custom">
                <div className="card-header card-header-tabs-line nav-tabs-line-3x">
                    <div className="card-toolbar">
                        <Tabs tab={tab} setTab={setTab} />
                    </div>
                </div>

                <div className="card-body">
                    {tab === 'calculations' &&
                        <ListagemCalculos archived={false} />
                    }
                    {tab === 'archiveds' &&
                        <ListagemCalculos archived={true} />
                    }
                </div>

                {(calculations && calculations.count == 0) &&
                    <div className="alertMessage">
                        <h3>Não há nenhum cálculo ainda, faça o primeiro clicando no menu ao lado, em Novo Cálculo.</h3>
                    </div>
                }

            </div>


        </BlockUi>

    </>
    );
}
