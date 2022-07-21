import React, { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import BlockUi from 'react-block-ui';

const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
    }

    .modal-dialog {
        max-width: 700px !important;
    }

    .modal-content {
        border-radius: 10px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }

`;

const Content = styled.div`
    input:focus {
        border: 1px solid #41C78F !important;
    }
     img { width: 80px; margin: 0 auto; display: block; margin-bottom: 30px; }
    span { color: #2e3f75; font-weight: bold; font-size: 19px; }
    p { text-align: left; color: #2e3f75; opacity: 0.6; margin-top: 5px; margin-bottom: 30px; }
    .row { margin-top: 10px; }

    
    @media only screen and (max-width:899px) {
        span { font-size: 16px; }
        p { font-size: 12px; }
        p.small { font-size: 11px; }
        span.price { float: none; position: absolute; top: 160px; left: 0; right: 0; margin: 0 auto; text-align: center; letter-spacing: -0.9px;}
        span.price:before { content: "Valor:"; font-size: 17px; margin-right: 15px; opacity: 0.8; position: relative; top: -4px; }
        .btn-primary { padding: 10px 40px; font-size: 14px; width: 80%; margin: 0 auto; display: block; margin-top: 70px;}
    }

`;

const Produto = styled.div`
   cursor:pointer;
   border:2px solid #f1f1f1;
   padding: 20px;
   border-radius: 5px;
   height: 100%;

   :hover {
       border:2px solid #41C78F;
       background: #fafafa;
    }
    span { font-size: 12px; }
   p { font-size: 11px; line-height: 18px; margin: 0; color:#5f677d; opacity: 0.6; margin-bottom: 31px; }
    a { color:#2e3f75; font-weight: bold; position: absolute; bottom: 23px; text-decoration: none; font-size: 12px; display: block; }
    a img { display: inline-block; width: 18px; margin-left: 10px; opacity: 0.5; margin-bottom: 0px; }

    @media only screen and (max-width: 899px) {
         width: 100%;
         margin-bottom: 10px;
         padding: 13px;
        span { color:#41C78F; }
        p { display: none; }
        a { position: relative; margin-top: 15px; bottom: 0px }
    }
`;


export default function ModalProdutos(props) {
    const query_available_products = useSelector(state => state.app.query_available_products);
    const query_document_type = useSelector(state => state.app.query_document_type);
    const query_document_number = useSelector(state => state.app.query_document_number);

    return (

        <ResponsiveModal
            show={props.isOpen}
            onHide={() => props.setIsOpen(false)}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <ButtonClose onClick={() => props.close()}>X</ButtonClose>
                <Content>
                    <img src={toAbsoluteUrl("/media/logo-jusfy.svg")} />
                    <p>Escolha um de nossos produtos abaixo para prosseguir com a consulta do {query_document_type} {query_document_number}.</p>
                    <div className="row">
                    {query_available_products && query_available_products.map(product => (
                        <div className="col-lg-6 col-12 mb-5">
                            <Produto onClick={() => props.chooseProduct(product)}>
                                <span>{product.name}</span>
                                <p>{product.description}</p>
                                <a href="#">Comprar agora <img src={toAbsoluteUrl("/media/icon-arrow.svg")} /></a>
                            </Produto>
                        </div>
                    ))}
                    </div>
                </Content>
          </Modal.Body>
        </ResponsiveModal>

    ); 
}