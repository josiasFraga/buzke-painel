import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";

export function Clientes() {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.app.customers);
    const subheader = useSubheader();

    useEffect(() => {
        dispatch({type: 'LOAD_CUSTOMERS'});
    }, []);

    return (
    <>
        <h1 className="azul-cabecalho">Meus Clientes</h1>
        <p className="subheader-text mb-10">Listagem de todos clientes</p>
        <Link to="/clientes/form">
            <button type="button" className="btn btn-primary mb-10 rightBtn">NOVO CLIENTE</button>
        </Link>

        <div className="row mb-10">
        {customers.map(cliente => 
            <div className="col-xl-6 mb-5">
                <div className="card-custom" style={{color: '#0b236e', padding: '26px'}}>
                    <div className="d-flex mb-5">
                        <div style={{backgroundColor: '#293667', width: '60px', height: '60px', borderRadius: '10px', justifyContent: 'center'}} className="d-flex">
                            <h3 style={{color: '#FFF', lineHeight: '60px'}}><i class="flaticon-users-1 icon-2x"></i></h3>
                        </div>
                    
                        <div className="d-flex flex-column ml-5">
                            <h4 className="font-weight-bold">{cliente.name}</h4>
                            <span style={{fontSize: '13px'}}><span className="font-weight-bold">E-mail:</span> {cliente.email}</span>
                            <span style={{fontSize: '13px'}}><span className="font-weight-bold">Data de nascimento:</span> {cliente.birthday == null ? '' : format(parseISO(cliente.birthday), 'dd/MM/yyyy')}</span>
                        </div>
                        <span style={{marginLeft: 'auto', fontSize: '13px'}} className="font-weight-bold">{cliente.document_type}: {cliente.document_number}</span>
                    </div>
                        
                           
                    <div className="hr mb-5"></div>

                    <div className="d-flex">
                        <i className="flaticon2-information primary icon-1x"></i> <span className="ml-2 font-weight-bold" style={{fontSize: '13px', opacity: 0.71}}>Última Atualização: {cliente._long_ago}</span>
                        
                        <div style={{marginLeft: 'auto'}}>
                            <Link style={{color: 'inherit'}} to={"/clientes/form/" + cliente.id}><i className="flaticon2-search primary icon-1x"></i> <span className="ml-2 font-weight-bold" style={{fontSize: '13px', opacity: 0.71}}>Visualizar Cliente</span></Link>
                        </div>

                    </div>


                       
                </div>

            </div>
        )}
        </div>

        {/*
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
        */}
        

    </>
    );
}