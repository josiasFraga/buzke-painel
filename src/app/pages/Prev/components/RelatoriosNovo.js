import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Button, Card, Accordion} from "react-bootstrap";
import { useSelector } from 'react-redux';

import RegraInfo from './RegraInfo';

export default function RelatoriosNovo(props) {
    const relatorios = useSelector(state => state.app.report_prev);

    const abrirRegra = (regra) => {
        window.scrollTo(0, 0);
        setScreen('info');
        setRegraAberta(regra);
    };
    const [regraAberta, setRegraAberta] = useState(0);
    const [screen, setScreen] = useState('info');

    return (
    <>
        <div className="defaultContent">
        <a href="#" className="btn btn-secondary backPage" onClick={props.back}><i className="flaticon2-left-arrow-1 icon-sm"></i> VOLTAR</a>

            <div className="container">
                

                <div className="row">
                    
                    <div className="col-4 p-10">

                        <h1 className="text-center">Atenção</h1>
                        <p className="value text-center">Confira as regras disponibilizadas abaixo.</p>

                        <ul className="mt-10">
                    { relatorios.regras && relatorios.regras.map((rule, key) => (
                            <li onClick={() => abrirRegra(key)} className={(key == regraAberta ? 'active' : '')}><i class={`${rule.regra.enabled ? 'flaticon2-check-mark text-success' : 'flaticon2-cancel text-danger'}`}></i> {rule.regra.title} <span>{rule.regra.subtitle} </span></li>
                    ))}
                        </ul>
                    </div>
                { relatorios.regras && relatorios.regras.length > 0 &&
                    <div className="col-8 bg p-10">
                        <RegraInfo
                            regraAberta={regraAberta}
                            screen={screen}
                            setScreen={setScreen}
                        />
                    </div>
                }
                </div>
            </div>
        </div>
    </>
    );
}