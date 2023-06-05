import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    FormHelperText,
    Switch
  } from "@material-ui/core";
const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-content {
        border-radius: 10px !important;
        max-height: 90vh;
    }

    .modal-dialog {
        max-width: 700px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }
`;

export default function ModalUnpaid(props) {
    const subscription_status = useSelector(state => state.subscription.subscription_status);

    return (
        <ResponsiveModal
            show={props.isOpen}
            onHide={props.close}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <h1>Olá! Sua assinatura está pendente de pagamento, por favor, clique no botão abaixo para verificar os dados de pagamento.</h1>
                <a href={(Object.keys(subscription_status).length > 0 ? subscription_status.manage_url : '')} className="btn btn-primary" target="_BLANK">Gerenciar Pagamento</a>
                <br/>
                <br/>
                <a href="https://api.whatsapp.com/send?phone=5555996879932&text=" target="_BLANK">Entrar em contato via Whatsapp</a>
                <br/>
                <br/>
                <a href="https://app.buzke.com.br/logout">Sair do sistema</a>
            </Modal.Body>
        </ResponsiveModal>
    ); 
}