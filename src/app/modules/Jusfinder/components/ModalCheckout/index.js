import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { cardMask } from '../../../../../_metronic/_helpers/MasksHelper';
import InputMask from 'react-input-mask';
import Select, { components } from 'react-select';
import BlockUi from 'react-block-ui';
import FloatToCurrency from '../../../../helpers/FloatToCurrency';

const IMAGE_DEFAULT_CREDIT_CARD = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTc2IDM3NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wbGFjZWhvbGRlcjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InBsYWNlaG9sZGVyIj4gICAgICAgICAgICA8cGF0aCBkPSJNNTI3LjkzMzc5MywzNzYuOTk4MjggTDQ4LjA2NjIwNjksMzc2Ljk5ODI4IEMzNS40MjM0ODAzLDM3Ny4xMDM5NjggMjMuMjU2NTg2NCwzNzIuMTg3ODkgMTQuMjQyMzI4MSwzNjMuMzMxNjE4IEM1LjIyODA2OTc1LDM1NC40NzUzNDYgMC4xMDQ5MTcxMDIsMzQyLjQwNDQwNyAwLDMyOS43NzQ0OTQgTDAsNDcuMjI1NDU1NCBDMC4xMDQ5MTcxMDIsMzQuNTk1NTQyNSA1LjIyODA2OTc1LDIyLjUyNDYwNCAxNC4yNDIzMjgxLDEzLjY2ODMzMTkgQzIzLjI1NjU4NjQsNC44MTIwNTk4NSAzNS40MjM0ODAzLC0wLjEwNDAxODI5NiA0OC4wNjYyMDY5LDAuMDAxNjY5NDg2NDYgTDUyNy45MzM3OTMsMC4wMDE2Njk0ODY0NiBDNTQwLjU3NjUyLC0wLjEwNDAxODI5NiA1NTIuNzQzNDE0LDQuODEyMDU5ODUgNTYxLjc1NzY3MiwxMy42NjgzMzE5IEM1NzAuNzcxOTMsMjIuNTI0NjA0IDU3NS44OTUwODMsMzQuNTk1NTQyNSA1NzYsNDcuMjI1NDU1NCBMNTc2LDMyOS45NzI5MTMgQzU3NS42NzI3ODYsMzU2LjE5NTY2MyA1NTQuMTg0MjczLDM3Ny4yMTg4NTcgNTI3LjkzMzc5MywzNzYuOTk4MjggWiIgaWQ9InNoYXBlIiBmaWxsPSIjRThFQkVFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMjAiIHg9IjQxOCIgeT0iNTgiIHdpZHRoPSI5MSIgaGVpZ2h0PSI2MyIgcng9IjMwIj48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSI1MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzc1NzU3NSIgeD0iNDEzIiB5PSIyMDgiIHdpZHRoPSIxMDciIGhlaWdodD0iNDAiIHJ4PSI4Ij48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSIyOTMiIHk9IjIwOCIgd2lkdGg9IjEwNyIgaGVpZ2h0PSI0MCIgcng9IjgiPjwvcmVjdD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGZpbGw9IiM3NTc1NzUiIHg9IjE3MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+";

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
    }

`;

const Content = styled.div`
    input:focus {
        border: 1px solid #41C78F !important;
    }

    span { color: #2e3f75; font-weight: bold; font-size: 30px; }
    h3 { color: #2e3f75; font-size: 22px; display: inline-block;}
    p { width: 70%; text-align: left; color: #2e3f75; opacity: 0.6; margin-top: 5px; margin-bottom: 15px; }
    span.price { font-size: 30px; text-align: right; display: inline-block; float: right; margin-top: -68px;}
    span.desc-payment { font-weight: normal; font-size: 12px; width: 61%; display: inline-block; margin-top: 20px;}
    hr { opacity: 0.1; margin: 10px 0px 20px 0px; }
    label { margin: 0; padding: 0; font-size: 13px; opacity: 0.6; color: #091d5c; margin:10px 0px;}
    input.form-control { margin: 0; padding: 9px; margin-bottom: 20px; outline: none; box-shadow: none; border:1px solid #ccc;}

    .btn-primary { background: #41C78F; border:none; display: inline-block; border-radius: 50px; padding: 12px 40px; font-size: 16px; text-transform: uppercase; font-weight: 600; margin-top: 13px; float: right; }
    .btn-primary:hover { cursor: pointer; background: #3ab380; }

    @media only screen and (max-width:899px) {
        .row { margin-top: 0px; }
        hr { margin: 10px; }
        label { margin: 5px 0px; }
        span { font-size: 16px; }
        h3 { font-size: 14px; }
        p { font-size: 12px; width: 100%; }

        span.price { float: none; margin: 0 auto; text-align: center; letter-spacing: -0.9; }
        input.form-control { width: 100%; margin-bottom: 10px; padding: 4px; }
        span.desc-payment { width: 100%; margin-top: 0; opacity: 0.6; font-size: 10px; }

        .btn-primary { padding: 10px 40px; font-size: 14px; width: 100%; margin-top: 10px;}
    }
`;

const ButtonBack = styled.img`
    filter: brightness(0) saturate(100%) invert(58%) sepia(59%) saturate(452%) hue-rotate(103deg) brightness(92%) contrast(83%);
    cursor: pointer;
    margin: 0 5px 5px 0;
`;

const CreditCardContainer = styled.div`
  position: relative;

  img {
    height: 23px;
    position: absolute;
    right: 9px;
    top: 8px;
  }
`;

export default function ModalCheckout(props) {
    const user = useSelector((state) => state.auth.user);

    const setIssuers = (status, response) => {
        console.log('issuers')
        console.log(response);
    }

    const getIssuers = (paymentMethodId) => {
        window.Mercadopago.getIssuers(
            paymentMethodId,
            setIssuers
        );
    }
    
   const setInstallments = (status, response) => {
        if (status == 200) {
            console.log(response);
            props.formik.setFieldValue('card_installments', response);
        }
   }
    const getInstallments = (paymentMethodId) => {
        window.Mercadopago.getInstallments({
            payment_method_id: paymentMethodId,
            amount: props.formik.values.product_selected.price,
            issuer_id: null
        }, setInstallments)
   }

    const setPaymentMethod = (status, response) => {
        if (status == 200) {
            const paymentMethod = response[0];
            console.log(paymentMethod);
            //getInstallments(paymentMethod.id);
            
            if(paymentMethod.additional_info_needed.includes("issuer_id")) {
                props.formik.setFieldValue('card_payment_method', null);
                //getIssuers(paymentMethod.id);
                return false;
            }

            props.formik.setFieldValue('card_payment_method', paymentMethod);

        } else {
            props.formik.setFieldValue('card_payment_method', null);
            console.log('Error payment method', response);
        }
    }
// createToken
    const keyUpCardNumber = (evt) => {
        if (props.formik.values.card_number && props.formik.values.card_number.length >= 6) {
            const bin = props.formik.values.card_number.replace(/\D/g, '').substring(0, 6);
            window.Mercadopago.getPaymentMethod({
                bin: bin
            }, setPaymentMethod)
        } else {
            props.formik.setFieldValue('card_payment_method', null);
        }
    }

    const setToken = (status, response) => {
        console.log(response);
    }

    const checkout = () => {
        props.formik.handleSubmit();
    }
    
    const getSvgCreditCard = (card_payment_method) => {
        const payment_methods_relation = [
            {"id": "master", "svg": "/media/svg/credit-card/flat/mastercard.svg"},
            {"id": "visa", "svg": "/media/svg/credit-card/flat/visa.svg"},
            {"id": "amex", "svg": "/media/svg/credit-card/flat/amex.svg"},
            {"id": "hipercard", "svg": "/media/svg/credit-card/flat/hipercard.svg"},
            {"id": "elo", "svg": "/media/svg/credit-card/flat/elo.svg"},
        ];

        const relation = payment_methods_relation.filter(relation => relation.id == card_payment_method.id);
        if (relation[0]) {
            return toAbsoluteUrl(relation[0].svg);
        }

        return card_payment_method.thumbnail;
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
                <BlockUi tag="div" blocking={props.formik.isSubmitting}>
                    <ButtonClose onClick={props.close}>X</ButtonClose>
                {props.formik.values.product_selected != null &&
                    <Content>
                        <ButtonBack onClick={() => props.back()} src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-left.svg")} />

                        <span>Checkout</span>
                        <hr/>
                        <h3>{props.formik.values.product_selected.name}</h3>
                        <p>{props.formik.values.product_selected.description}</p>
                        <span className="price">R$ {FloatToCurrency(props.formik.values.product_selected.price)}</span>
                        <hr/>

                        <div className="row">
                            <div className="col-12">
                                <label>Nome impresso no cartão</label>
                                <input
                                    name="cardholder_name"
                                    type="text"
                                    className={"form-control " + (props.formik.errors.cardholder_name && props.formik.touched.cardholder_name ? 'is-invalid' : '')}
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.cardholder_name}
                                />
                                {props.formik.errors.cardholder_name && props.formik.touched.cardholder_name && <label className="invalid-feedback">{props.formik.errors.cardholder_name}</label>}
                            </div>

                            <div className="col-lg-6">
                                <label>Número do cartão</label>
                                <CreditCardContainer>
                                    <InputMask
                                        name="card_number"
                                        placeholder="0000 0000 0000 0000"
                                        mask="9999 9999 9999 9999"
                                        maskChar={null}
                                        className={"form-control " + (props.formik.errors.card_number && props.formik.touched.card_number ? 'is-invalid' : '')}
                                        type="tel"
                                        onChange={props.formik.handleChange}
                                        onKeyUp={keyUpCardNumber}
                                        value={props.formik.values.card_number}
                                    />
                                { props.formik.values.card_payment_method != null &&
                                    <img src={getSvgCreditCard(props.formik.values.card_payment_method)} />
                                }
                                {props.formik.values.card_payment_method == null &&
                                    <img src={IMAGE_DEFAULT_CREDIT_CARD} />
                                }
                                    {props.formik.errors.card_number && props.formik.touched.card_number && <label className="invalid-feedback">{props.formik.errors.card_number}</label>}   
                                </CreditCardContainer>
                                                        
                            
                            </div>

                            <div className="col-lg-3 col-6">
                                <label>Vencimento</label>
                                <InputMask
                                    name="card_expiration"
                                    placeholder="MM / AAAA"
                                    mask="99 / 9999"
                                    maskChar={null}
                                    className={"form-control " + (props.formik.errors.card_expiration && props.formik.touched.card_expiration ? 'is-invalid' : '')}
                                    type="tel"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.card_expiration}
                                />
                                {props.formik.errors.card_expiration && props.formik.touched.card_expiration && <label className="invalid-feedback">{props.formik.errors.card_expiration}</label>}
                            </div>

                            <div className="col-lg-3 col-6">
                                <label>CVV</label>
                                <InputMask
                                    name="card_cvv"
                                    placeholder="000"
                                    mask="9999"
                                    maskChar={null}
                                    className={"form-control " + (props.formik.errors.card_cvv && props.formik.touched.card_cvv ? 'is-invalid' : '')}
                                    type="tel"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.card_cvv}
                                />
                                {props.formik.errors.card_cvv && props.formik.touched.card_cvv && <label className="invalid-feedback">{props.formik.errors.card_cvv}</label>}

                            </div>
                        </div>
                        <span className="desc-payment">&nbsp;</span>
                        <button className="btn btn-primary" type="button" onClick={checkout}>Comprar agora</button>
                    </Content>
                }
            </BlockUi>
        </Modal.Body>
        </ResponsiveModal>
    
    ); 
}