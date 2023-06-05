import React, { useState, useEffect, createContext } from "react";
import { useDispatch } from 'react-redux';
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            m   gin: 0 auto !important;
        }
    }

`;

const Content = styled.div`
    input:focus {
        border: 1px solid #41C78F !important;
    }
    img { width: 80px; margin: 0 auto; display: block; }
    p { text-align: center; margin-top: 20px; color: #2e3f75; opacity: 0.6; padding: 0px 30px; margin-top: 20px; margin-bottom: 0;}
    .btn-primary { background: #41C78F; border:none; margin: 0 auto; display: block; border-radius: 50px; padding: 12px 50px; font-size: 16px; text-transform: uppercase; font-weight: 600; margin-top: 20px; }
    .btn-primary:hover { cursor: pointer; background: #3ab380; }

    @media only screen and (max-width:899px) {
        p { padding: 0; font-size: 14px; padding: 0px 30px;}
        .btn-primary { padding: 10px 30px; font-size: 14px; }
    }
`;

export default function ModalDeslogado(props) {
    const register = () => {
        window.location = 'https://app.buzke.com.br/register/jusfinder';
    }

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

                <Content>
                    <img className="mb-10" src={toAbsoluteUrl("/media/logo-jusfy.svg")} />
                    <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
                            <div className="alert-text font-weight-bold">Realize o seu cadastro na Jusfy e ganhe 3 consultas gratuitas de localização de CPF. Teste grátis a plataforma por 7 dias.</div>
                        </div>
                        
                    <p>Você precisa ser um usuário Jusfy para efetuar a compra</p>
			        <button class="btn btn-primary" onClick={register}>Teste grátis agora</button>
			        <p>Ou faça seu login, <a href="#" onClick={props.openModalLogin}>clicando aqui</a>.</p>
                </Content>
          </Modal.Body>
          </ResponsiveModal>
    ); 
}