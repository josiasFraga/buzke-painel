import React from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';

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

export default function ModalNotification(props) {
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

                {Object.keys(props.notification).length > 0 &&
                <>
                    <h1>{props.notification.notification_title}</h1>
                    {props.notification.notification_text}
                </>
                }
            </Modal.Body>
          </ResponsiveModal>
    ); 
}