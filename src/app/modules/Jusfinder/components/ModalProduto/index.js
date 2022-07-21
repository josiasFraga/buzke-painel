import React, { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import FloatToCurrency from '../../../../helpers/FloatToCurrency';
import BlockUi from 'react-block-ui';
import { Checkbox } from "@material-ui/core";

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
    span { color: #2e3f75; font-weight: bold; font-size: 19px; }
    p { text-align: left; color: #2e3f75; opacity: 0.6; margin-top: 5px; margin-bottom: 0; }
    p.small { font-size: 12px; }
    hr { opacity: 0.6; margin: 30px 0px; }
    span.price { font-size: 30px; text-align: right; display: inline-block; float: right; margin-top: 0px;}
    small { color: #2e3f75; font-weight: bold; }


    @media only screen and (max-width:899px) {
        span { font-size: 16px; }
        p { font-size: 12px; }
        p.small { font-size: 11px; }
        span.price { float: none; position: absolute; top: 160px; left: 0; right: 0; margin: 0 auto; text-align: center; letter-spacing: -0.9px;}
        span.price:before { content: "Valor:"; font-size: 17px; margin-right: 15px; opacity: 0.8; position: relative; top: -4px; }

    }
`;

const BtnComprar = styled.button`
    background: #41C78F; border:none; display: inline-block; border-radius: 50px; padding: 12px 40px; font-size: 16px; text-transform: uppercase; font-weight: 600; margin-top: 0px;
    :hover { background: #3ab380 !important; }

    @media only screen and (max-width:899px) {
        padding: 10px 40px; font-size: 14px; width: 80%; margin: 0 auto; display: block; margin-top: 108px;
    }
`;

const BtnUsarGratis = styled.button`
    margin-left: 10px; background: #41C78F; border:none; display: inline-block; border-radius: 50px; padding: 12px 40px; font-size: 16px; text-transform: uppercase; font-weight: 600; margin-top: 0px;
    :hover { background: #3ab380 !important; }

    @media only screen and (max-width:899px) {
        margin-left: 0px; padding: 10px 40px; font-size: 14px; width: 80%; margin: 0 auto; display: block; margin-top: 20px;
    }
`;

const ButtonBack = styled.img`
    filter: brightness(0) saturate(100%) invert(58%) sepia(59%) saturate(452%) hue-rotate(103deg) brightness(92%) contrast(83%);
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

const CheckboxTerms = styled(Checkbox)`
    span {
        color: #41C78F !important;
    }
`;

export default function ModalProduto(props) {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const checkout = (type = '') => {
        if (!termsAccepted) {
            alert('É necessário aceitar os termos para prosseguir.');
            return;
        }
        props.checkout(type);
    }
    
    return (
        <ResponsiveModal
            show={props.isOpen}
            onHide={() => props.close()}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <BlockUi tag="div" blocking={props.formik.isSubmitting}>

                    <ButtonClose onClick={() => props.close()}>X</ButtonClose>
                {props.formik.values.product_selected != null &&
                    <Content>
                        <ButtonBack onClick={() => props.back()} src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-left.svg")} />



                        <span>{props.formik.values.product_selected.name}</span>
                        <p className="mb-10">{props.formik.values.product_selected.description}</p>
                    { props.formik.values.product_selected.id == 'personal_data' &&
                        <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
                            <div className="alert-text font-weight-bold">Realize o seu cadastro na Jusfy e ganhe 3 consultas de localização de CPF. Se estiver logado, utilize o botão CRÉDITOS GRÁTIS.</div>
                        </div>
                    }

                        <hr />
                        <BtnComprar className="btn btn-cinza" onClick={checkout}>Comprar agora</BtnComprar>
                        <span className="price">R$ {FloatToCurrency(props.formik.values.product_selected.price)}</span>
                        <BtnUsarGratis className="btn btn-primary" onClick={() => checkout('free')}>Usar Créditos</BtnUsarGratis>
                    

                        <hr />
                        <small>Informações adicionais</small>
                        <p className="small">
                        <CheckboxTerms
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            value="checkedA"
                            color="primary"
                            style={{padding: '0px 5px 0px 0px'}}
                            inputProps={{
                                "aria-label": "primary checkbox"
                            }}
                        />
              Aceito e me declaro responsável legal, nos termos da Lei Geral de Proteção de Dados, Lei 13.709/2018, por toda a busca e tratamento realizados no presente banco de dados através do meu login e senha, declarando que os referidos dados serão usados exclusivamente ao exercício regular de direitos em possíveis processos judiciais, administrativos ou arbitrais, não realizando qualquer uso indevido e tampouco vazamento dos mesmos, sob pena de arcar com as possíveis consequências legais nos âmbitos cível e criminal.
Ao entrar nesse ambiente, o usuário, desde que devidamente habilitado com login e senha, terá acesso a um banco de dados pessoais específicos que se destinam, com a finalidade exclusiva, ao exercício regular de direitos em possíveis processos judiciais, administrativos ou arbitrais, nos termos do artigo 7°, VI, da Lei Geral de Proteção de Dados (Lei 13.709/2018).
Toda e qualquer utilização das referidas informações, que constam no respectivo banco de dados, é regida pela Lei Geral de Proteção de Dados (Lei 13.709/2018), que prevê sanções rigorosas em caso de tratamento indevido de dados pessoais, destinação de dados pessoais a fins não autorizados ou ainda em caso de vazamento de informações.
Nesse sentido, ao entrar no próximo ambiente, o usuário se declara ciente das informações prestadas acima, além de prestar compromisso de que todo e qualquer dado pessoal acessado por ele terá como único fim o exercício regular de direitos em possíveis processos judiciais, administrativos ou arbitrais, responsabilizando-se legalmente, nos âmbitos civil e criminal, por qualquer tratamento indevido de tais dados ou ainda vazamento ilegal de quaisquer informações.</p>

                    </Content>
                }
            </BlockUi>
          </Modal.Body>
        </ResponsiveModal>
    ); 
}