import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import BlockUi from 'react-block-ui';

export function Perfil() {
    const dispatch = useDispatch();


    const subheader = useSubheader();
    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Meu Perfil',
                title: 'Meu Perfil',
                href: ''
            }
        ])
    }, []);


    return (
        <BlockUi tag="div" blocking={false}>
            <h1 className="azul-cabecalho">Perfil</h1>
            <p className="mb-10" style={{ fontSize: '15px', opacity: '0.6' }}>Atualize seus dados</p>
            <div className="card card-custom">
                <div className="card-header card-header-tabs-line nav-tabs-line-3x">
                    <div className="card-toolbar">
                        
                    </div>
                </div>
            
                Em Construção
            </div>
        </BlockUi>
    );
}
