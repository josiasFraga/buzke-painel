import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import DataContratoMes from './steps/DataContratoMes';
import DataContratoAno from './steps/DataContratoAno';
import QuantidadeParcelas from './steps/QuantidadeParcelas';
import TipoContrato from './steps/TipoContrato';
import TipoPessoa from './steps/TipoPessoa';
import ValorContratado from './steps/ValorContratado';
import ValorParcela from './steps/ValorParcela';
import styled from 'styled-components';
import { Modal } from "react-bootstrap";

const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;
const ModalTermsConditions = styled(Modal)`
    .modal-body {
        padding: 40px !important;

        span.modal-title { font-size: 41px; letter-spacing: -0.01em; color: #091740; margin-bottom: 20px; display: block; text-align: center; margin-top: 10px;}
        p { font-size: 13px; letter-spacing: -0.01em; color: #091740; opacity: 0.6; margin-bottom: 6px; }
        ul li { font-size: 13px; letter-spacing: -0.01em; color: #091740; opacity: 0.6; margin-bottom: 6px; }
        h4 { font-weight: bold; font-size: 60px; text-align: center; }
        img { display: block; margin: 0 auto; text-align: center; width: 50%; margin-top: -20px; }
        small { display: block; text-align: center; padding: 0px 50px; opacity: 0.5; font-size: 1rem}
        button { border-radius: 3px; font-weight: bold; background: #41C78F; box-shadow: 0px 14px 15px rgba(92,199,143,0.31); border:none; padding: 13px 50px; margin:0 auto; display:block; margin-top: 33px; color:#fff; font-size: 17px; margin-bottom: 20px; }
        button:hover { background: #349f72; -moz-transition:all .2s;-webkit-transition:all .2s;-o-transition:all .2s; }
        button img { width: 20px; margin: 0; display: inline-block; margin-left: 20px; margin-top: -3px;}
    }

    

    .modal-dialog {
        max-width: 800px !important;
    }

    .modal-content {
        border-radius: 10px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }

        .modal-body {
            span.modal-title { font-size: 32px; }
        }
    }

    button.close { position: absolute; right: -15px; top: -15px; background: #349f72; opacity: 1; padding: 10px 14px; color:#fff; text-shadow: none; box-shadow: 0px 14px 15px rgba(92,199,143,0.31); z-index: 2; border-radius: 20px; }
`;

export default function Steps(props) {
    const [isModalTermsConditionsOpen, setIsModalTermsConditionsOpen] = useState(false);

    const simular = () => {
        props.setScreen('resultado');
    }

    const openTermos = () => {
        setIsModalTermsConditionsOpen(true);
    }

    return (
    <>
        <div className="content-step">
            <div className="container">
                <div className="vertical-center">
                    <div style={{display: props.step == 0 ? 'block' : 'none'}}>
                        <h2>Cansado de pagar <strong style={{color: '#41c78f'}}>JUROS ABUSIVOS?</strong></h2>
                        <p className="subtitle">Descubra agora se o seu financiamento possui juros abusivos. Sua dívida poderá ser reduzida em mais de 90%.</p>

                        <a href="https://6sgpdjro8ua.typeform.com/to/pKdjq9cK" target="_BLANK"><button style={{marginBottom: '60px', background: '#41c78f'}}>FAZER SIMULAÇÃO RÁPIDA E GRATUITA<img src={toAbsoluteUrl("/media/svg/icons/Navigation/ArrowRight.svg")}/></button></a>

                        
                        <p onClick={openTermos} class="subtitle-termos">Ao iniciar a simulação você está de acordo com os termos de uso, clique aqui para ler. </p>


                        <p className="subtitle" style={{fontWeight: 'bold'}}>9 em cada 10 contratos bancários no Brasil possuem JUROS ABUSIVOS além do permitido por lei.</p>
                    </div>
                    <div style={{display: props.step == 1 ? 'block' : 'none'}}>
                        <TipoPessoa formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
                    <div style={{display: props.step == 2 ? 'block' : 'none'}}>
                        <TipoContrato formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
                    <div style={{display: props.step == 3 ? 'block' : 'none'}}>
                        <ValorContratado formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
                    <div style={{display: props.step == 4 ? 'block' : 'none'}}>
                        <DataContratoMes formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
                    <div style={{display: props.step == 5 ? 'block' : 'none'}}>
                        <DataContratoAno formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
                    <div style={{display: props.step == 6 ? 'block' : 'none'}}>
                        <ValorParcela formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
                    <div style={{display: props.step == 7 ? 'block' : 'none'}}>
                        <QuantidadeParcelas simular={simular} formik={props.formik} step={props.step} setStep={props.setStep} />
                    </div>
              
                </div>

            </div>
        </div>
    

        <ModalTermsConditions modalOptions={{dismissible: false}} show={isModalTermsConditionsOpen} centered>
            <Modal.Body>
                <ButtonClose onClick={() => setIsModalTermsConditionsOpen(false)}>X</ButtonClose>

                <span className="modal-title" style={{fontWeight: 'bold'}}>Termos e condições</span>
                <p>Eu declaro que, em conformidade com o artigo 7° da Lei Geral de Proteção de Dados (Lei 13.709/2018), a partir da presente data, autorizo a JUSFY SERVIÇOS DE INTERNET LTDA. a compartilhar os dados pessoais por mim fornecidos no presente portal eletrônico, com advogados e escritórios de advocacia devidamente cadastrados, desde que garantido o devido sigilo, com a finalidade exclusiva de realização de procedimentos preliminares indispensáveis a possível pactuação de contrato de serviços advocatícios, pelo prazo de 60 dias.</p>
                <p>Portanto, declaro meu consentimento ao tratamento dos meus dados pessoais nos termos expostos, bem como a minha ciência acerca dos meus direitos contidos no artigo 18 da Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
                <p>Ainda, conforme o artigo 9° da Lei Geral de Proteção de Dados (Lei 13.709/2018), declaro ciência de todos os meus direitos como titular dos dados pessoais que serão tratados pelo JUSFY SERVIÇOS DE INTERNET LTDA. e demais cadastrados, explícitos no artigo 18 da respectiva Lei, quais sejam,</p>
                <ul>
                    <li>Poder confirmar a existência de tratamento sobre os meus dados;</li>
                    <li>acesso aos meus dados;</li>
                    <li>correção de possíveis dados incompletos, inexatos ou desatualizados;</li>
                    <li>anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a finalidade informada;</li>
                    <li>portabilidade dos meus dados a outro fornecedor de serviço ou produto, mediante minha requisição expressa, de acordo com a regulamentação da autoridade nacional;</li>
                    <li>eliminação dos dados pessoais tratados com o meu consentimento,</li>
                    <li>informação das entidades públicas e privadas com as quais a JUSFY realizou o compartilhamento dos meus </li>
                    <li>dados;</li>
                    <li>informação sobre a possibilidade de não fornecer consentimento e quais as consequências da negativa;</li>
                    <li>revogação do meu consentimento</li>
                </ul>
                <p>Portanto, declaro meu consentimento ao tratamento dos meus dados pessoais nos termos expostos, bem como a minha ciência acerca dos meus direitos contidos no artigo 18 da Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
            </Modal.Body>
        </ModalTermsConditions>
    </>
    );
}