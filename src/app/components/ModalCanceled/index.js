import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';

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

export default function ModalCanceled(props) {
    return (
        <ResponsiveModal
            show={props.isOpen}
            onHide={props.close}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <h1>Seu plano está cancelado! Entre em contato para mais informações.</h1>
            </Modal.Body>
        </ResponsiveModal>
    ); 
}