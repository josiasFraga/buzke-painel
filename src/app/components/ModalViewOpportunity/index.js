import React from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FloatToCurrency from '../../helpers/FloatToCurrency';

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

    .modal-content {
        border-radius: 10px !important;
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

export default function ModalViewOpportunity(props) {
    return (
        <ResponsiveModal
            show={props.isOpen}
            onHide={props.close}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <ButtonClose onClick={props.close}>X</ButtonClose>

                {Object.keys(props.opportunity).length > 0 &&
                <>
                    <p>Nome do cliente: <strong>{props.opportunity.name}</strong></p>
                    <p>Telefone: <strong>{props.opportunity.phone}</strong></p>
                    <p>E-mail: <strong>{props.opportunity.email}</strong></p>
                    <p>Valor contratado: 
                         { props.opportunity.amount > 0 &&
                            <strong> R$ {FloatToCurrency(props.opportunity.amount)}</strong>
                        }
                    </p>
                    <p>Estado: <strong>{props.opportunity.state}</strong></p>
                    <p>Tempo de contato: <strong>{props.opportunity.long_ago}</strong></p>
                </>
                }
            </Modal.Body>
          </ResponsiveModal>
    ); 
}