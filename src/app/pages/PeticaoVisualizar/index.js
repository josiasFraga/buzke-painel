import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';

import BlockUi from 'react-block-ui';
import _ from 'lodash';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
  
export function PeticaoVisualizar(props) {
    const dispatch = useDispatch();
    const subheader = useSubheader();

    const petition = useSelector(state => state.app.petition);
    const is_petition_loading = useSelector(state => state.app.is_petition_loading);
    useEffect(() => {
        dispatch({type: 'LOAD_PETITION', payload: {id:props.match.params.petition_id}});
    }, []);
    const google_docs_url = `https://docs.google.com/gview?url=`;
    const download = (url) => {
        window.open(url);
    }

    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Petições',
                title: 'Petições',
                pathname: '/peticoes',
                href: ''
            },
            {
                text: 'Listagem',
                title: 'Listagem',
                pathname: `/peticoes/listagem/${props.match.params.category_id}`,
                href: ''
            },
            {
                text: 'Visualização',
                title: 'Visualização',
                href: ''
            }
        ])
    }, []);


    return (
    <>
        <BlockUi tag="div" blocking={is_petition_loading}>
        
            <div key={petition}>
                <h3 className="azul-cabecalho">{petition.name}</h3>
                <p style={{color: '#2E3F75', opacity: 0.6, fontSize: '15px'}} className="mb-10">Tipo de petição: {petition['petitions_category_type.name']}</p>

                <div className="row mb-10">
                    <div className="col-xl-12">
                        <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                            <div className="d-flex mb-10">
                                <h3 className="azul-cabecalho flex-grow-1">Conteúdo da Petição</h3>
                                <button className="btn btn-primary" style={{height: '35px'}} onClick={() => download(petition.url)}>Realizar Download</button>
                            </div>
                        { petition && petition.url &&
                            <iframe style={{width: '100%', height: '700px'}} frameborder="0" src={!petition.url ? `about:blank` : `${google_docs_url}${petition.url}&embedded=true`}></iframe>
                        }


                        </div>
                    </div>
                </div>
            </div>
        </BlockUi>
    </>
    );
}