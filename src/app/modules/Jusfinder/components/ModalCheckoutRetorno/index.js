import React, { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import SvgSuccess from '../../../../components/SvgAnimations/Success.js';
import SvgWarning from '../../../../components/SvgAnimations/Warning.js';
import SvgError from '../../../../components/SvgAnimations/Error.js';

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
    span { font-size: 40px; display: block; padding: 5px; text-align: center; color: #a1a8c1; }
    hr { opacity: 0.1; margin: 0; }
    small { font-size: 16px; display: block; text-align: center; opacity: 0.6; margin-top: 20px;}

    .success { color: #41C78F !important; }
    .warning { color: #FFC107 !important; }
    .error { color: #FF6245 !important; }
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 19px;
    text-align: center; 
    font-size: 30px;
    margin-bottom: 20px;

`;

function _SvgComponent() {
    const response = useSelector(state => state.app.query_checkout_response);

    if (response.payment_info.status == 'approved') {
        return <SvgSuccess />;
    }
    if (response.payment_info.status == 'in_process') {
        return <SvgWarning />;
    }
    if (response.payment_info.status == 'rejected' || response.payment_info.status == 'no_credits') {
        return <SvgError />;
    }
    return <SvgError />;
}

export default function ModalCheckoutRetorno(props) {
    const response = useSelector(state => state.app.query_checkout_response);

    useEffect(() => {
        if (response.query_info && response.query_info.status && response.query_info.status == 'success') {
            fetch(response.query_info.pdf)
            .then(response => response.blob())
            .then(blob => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = 'Consulta.pdf';
              link.click();
          })
          .catch(console.error);
        }
    }, [response]);
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
                {response.payment_info &&
                <>
                    <_SvgComponent />

                {response.payment_info.status == 'approved' &&
                <>
                    <Title className="success">Parabéns, sua compra foi aprovada!</Title>
                    
                    { (response.query_info && response.query_info.status && response.query_info.status == 'success') &&
                        <>
                        <small>Seu navegador irá baixar automaticamente o resultado de sua consulta, caso não consiga baixar, clique no botão abaixo.</small>
                        <br />
                        <a
                            style={{display: 'block', width: '50%', margin: '0 auto'}}
                            target="_BLANK" className="btn btn-primary" href={response.query_info.pdf}>REALIZAR DOWNLOAD</a>
                        </>
                    }
                    { (response.query_info && response.query_info.status && response.query_info.status == 'query_failed') &&
                        <>
                        <small>Neste momento nossos servidores estão processando milhares de requisições, te pedimos mais alguns instantes e seu relatório estará disponível no seu painel de controle Jusfy.</small>
                        </>
                    }
                </>
                }

                {response.payment_info.status == 'in_process' &&
                <>
                    <Title className="warning">Pagamento em análise</Title>
                    <small>
                        <>Não se preocupe, em menos de 2 dias úteis informaremos no seu <a href="https://app.jusfy.com.br/">painel de controle Jusfy</a>, o status do seu pagamento e em caso de aprovação, seu relatório de consulta estará disponível lá!</>
                    </small>
                </>
                }

                {response.payment_info.status == 'rejected' &&
                <>
                    <Title className="error">Pagamento Rejeitado</Title>
                    <small>
                        <>Infelizmente a sua compra foi rejeitada pelo cartão de crédito, por favor, verifique se você informou os dados corretos e tente novamente.</>
                    </small>
                </>
                }

                {response.payment_info.status == 'no_credits' &&
                <>
                    <Title className="error">Sem Créditos</Title>
                    <small>
                        <>Os seus créditos grátis já se esgotaram! Por favor, utilize o botão de Comprar. Não esqueça, os créditos grátis são válidos apenas para consultas de localização.</>
                    </small>
                </>
                }
                </>
                }                
                </Content>
          </Modal.Body>
        </ResponsiveModal>
    ); 
}