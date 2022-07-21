import React, { useEffect } from 'react';
import BlockUi from 'react-block-ui';
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import RightInfo from '../components/RightInfo';
import { useSelector } from 'react-redux';
import FloatToCurrency from '../../../helpers/FloatToCurrency';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import {
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    FormHelperText,
    Switch
} from "@material-ui/core";

const IMAGE_DEFAULT_CREDIT_CARD = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTc2IDM3NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wbGFjZWhvbGRlcjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InBsYWNlaG9sZGVyIj4gICAgICAgICAgICA8cGF0aCBkPSJNNTI3LjkzMzc5MywzNzYuOTk4MjggTDQ4LjA2NjIwNjksMzc2Ljk5ODI4IEMzNS40MjM0ODAzLDM3Ny4xMDM5NjggMjMuMjU2NTg2NCwzNzIuMTg3ODkgMTQuMjQyMzI4MSwzNjMuMzMxNjE4IEM1LjIyODA2OTc1LDM1NC40NzUzNDYgMC4xMDQ5MTcxMDIsMzQyLjQwNDQwNyAwLDMyOS43NzQ0OTQgTDAsNDcuMjI1NDU1NCBDMC4xMDQ5MTcxMDIsMzQuNTk1NTQyNSA1LjIyODA2OTc1LDIyLjUyNDYwNCAxNC4yNDIzMjgxLDEzLjY2ODMzMTkgQzIzLjI1NjU4NjQsNC44MTIwNTk4NSAzNS40MjM0ODAzLC0wLjEwNDAxODI5NiA0OC4wNjYyMDY5LDAuMDAxNjY5NDg2NDYgTDUyNy45MzM3OTMsMC4wMDE2Njk0ODY0NiBDNTQwLjU3NjUyLC0wLjEwNDAxODI5NiA1NTIuNzQzNDE0LDQuODEyMDU5ODUgNTYxLjc1NzY3MiwxMy42NjgzMzE5IEM1NzAuNzcxOTMsMjIuNTI0NjA0IDU3NS44OTUwODMsMzQuNTk1NTQyNSA1NzYsNDcuMjI1NDU1NCBMNTc2LDMyOS45NzI5MTMgQzU3NS42NzI3ODYsMzU2LjE5NTY2MyA1NTQuMTg0MjczLDM3Ny4yMTg4NTcgNTI3LjkzMzc5MywzNzYuOTk4MjggWiIgaWQ9InNoYXBlIiBmaWxsPSIjRThFQkVFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMjAiIHg9IjQxOCIgeT0iNTgiIHdpZHRoPSI5MSIgaGVpZ2h0PSI2MyIgcng9IjMwIj48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSI1MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzc1NzU3NSIgeD0iNDEzIiB5PSIyMDgiIHdpZHRoPSIxMDciIGhlaWdodD0iNDAiIHJ4PSI4Ij48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSIyOTMiIHk9IjIwOCIgd2lkdGg9IjEwNyIgaGVpZ2h0PSI0MCIgcng9IjgiPjwvcmVjdD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGZpbGw9IiM3NTc1NzUiIHg9IjE3MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+";

const ButtonBack = styled.img`
    filter: brightness(0) saturate(100%) invert(58%) sepia(59%) saturate(452%) hue-rotate(103deg) brightness(92%) contrast(83%);
    cursor: pointer;
    margin: 0 5px 10px 0;
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

export default function Step2(props) {
    const setPaymentMethod = (status, response) => {
        if (status == 200) {
            const paymentMethod = response[0];
            console.log(paymentMethod);
            //getInstallments(paymentMethod.id);

            if (paymentMethod.additional_info_needed.includes("issuer_id")) {
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
    const getSvgCreditCard = (card_payment_method) => {
        const payment_methods_relation = [
            { "id": "master", "svg": "/media/svg/credit-card/flat/mastercard.svg" },
            { "id": "visa", "svg": "/media/svg/credit-card/flat/visa.svg" },
            { "id": "amex", "svg": "/media/svg/credit-card/flat/amex.svg" },
            { "id": "hipercard", "svg": "/media/svg/credit-card/flat/hipercard.svg" },
            { "id": "elo", "svg": "/media/svg/credit-card/flat/elo.svg" },
        ];

        const relation = payment_methods_relation.filter(relation => relation.id == card_payment_method.id);
        if (relation[0]) {
            return toAbsoluteUrl(relation[0].svg);
        }

        return card_payment_method.thumbnail;
    }

    const coupom = useSelector(state => state.app.coupom);
    const defaultTrialDays = useSelector(state => state.app.default_trial_days);

    return (
        <BlockUi tag="div" blocking={props.formik.isSubmitting}>
            <div className="row no-gutters mb-20">
                <div className="col-xl-8">
                    <div className="border-radius-only-left" style={{ backgroundColor: '#fff', padding: '40px', height: '100%' }}>

                        <div className="row">
                            <div className="col-xl-4 d-flex mb-10" style={{cursor: 'pointer'}} onClick={() => props.setStep(0)}>
                                <div>
                                    <div className={`step ${props.step == 0 ? 'active' : ''}`}><span>1</span></div>
                                </div>
                                <div className="step-info d-flex flex-column">
                                    <span className="step-title">Cadastro</span>
                                    <span className="step-description">preencha os seus dados</span>
                                </div>
                            </div>
                            <div className="col-xl-4 d-flex mb-10">
                                <div>
                                    <div className={`step ${props.step == 1 ? 'active' : ''}`}><span>2</span></div>
                                </div>
                                <div className="step-info d-flex flex-column">
                                    <span className="step-title">Financeiro</span>
                                    <span className="step-description">dados financeiros</span>
                                </div>
                            </div>
                        </div>

                        <div className="hr mb-3"></div>
                    { Object.keys(coupom).length == 0 &&
                    <>
                        <div className="blocksPrice mt-6">
                            <div className="row">
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}} className="centerBlock">
                                    <span style={{ fontSize: '12px', lineHeight: '36px', marginRight: '10px' }}>Anual</span>
                                    <FormControl component="fieldset" style={{ width: '40px' }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={(props.periodicity == 'monthly')}
                                                        value="gilad"
                                                        onChange={() => {
                                                            if (props.periodicity == 'monthly') {
                                                                props.setPeriodicity('annually');
                                                                props.switchAnnual();
                                                            } else if (props.periodicity == 'annually') {
                                                                props.setPeriodicity('monthly');
                                                                props.switchMonthly();
                                                            }
                                                        }}
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </FormControl>
                                    <span style={{ fontSize: '12px', lineHeight: '36px', marginLeft: '10px' }}>Mensal</span>
                                </div>
                            </div>
                            <div className="row">
                            {props.plans.filter(plan => plan.type == props.periodicity).map(plan => (
                                <div className={"col-3 mr-5 ml-5 " + (props.formik.values.plan.id == plan.id ? 'active' : '')} onClick={() => props.formik.setFieldValue('plan', plan)}>
                                    {plan.type === 'annually' && <span className="badge badge-primary">20% <br />OFF</span> }
                                    <span>{plan.name}</span>
                                    <h3>R$ {plan.amount} <small className="month">/{plan.type == 'monthly' ? 'mensal' : 'anual'}</small></h3>
                                </div>
                            ))}
                            </div>
                        </div>

                            

                        <div className="d-flex mb-5">
                            <p className="font-size-sm azul-cabecalho mb-5 mt-7" style={{ opacity: 0.8 }}>Teste grátis durante 7 dias. Cancele facilmente.</p>
                        </div>
                         </>   
                        }

                        {Object.keys(coupom).length > 0 &&
                            <div className="d-flex mb-10">
                                <div style={{ flex: '1', paddingRight: '5px', paddingLeft: '5px' }}>
                                    <p className="font-size-h3 azul-cabecalho font-weight-bolder mb-0" style={{ opacity: 0.8 }}>{coupom.description}</p>
                                    <p className="font-size-sm azul-cabecalho mb-5" style={{ opacity: 0.8 }}>{coupom.subtitle}</p>
                                    de <span style={{ fontSize: '37px', opacity: 0.8, textDecoration: 'line-through' }} className="azul-cabecalho font-weight-bolder">R$ {FloatToCurrency(coupom.old_amount)}</span> / mensal
                                    <br /><br />
                                    por <span style={{ fontSize: '37px', opacity: 0.8 }} className="azul-cabecalho font-weight-bolder">R$ {FloatToCurrency(coupom.amount)}</span> / mensal
                                </div>
                            </div>
                        }

                        <div className="hr mb-10"></div>

                        <div className="row mb-10">
                            <div className="col-xl-12">
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
                        </div>
                        <div className="row mb-10">
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
                                    {props.formik.values.card_payment_method != null &&
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

                        <div className="row mb-5">
                            <div className="col-xl-12">
                                <button type="button" className="btn btn-primary" style={{ width: '100%', height: '50px' }} onClick={props.formik.handleSubmit}>INICIAR TESTE GRÁTIS</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                {(Object.keys(coupom).length == 0 || (Object.keys(coupom).length > 0 && coupom.trial_days > 0)) &&
                                    <p className="azul-cabecalho font-size-sm" style={{ opacity: 0.45 }}>Cobraremos o cartão informado <span className="font-weight-bolder">somente se não houver cancelamento da assinatura durante os {(coupom && coupom.trial_days) ? coupom.trial_days : defaultTrialDays} dias de teste.</span> Veja ao lado
                                        porque pedimos o cartão.</p>
                                }
                                <p className="azul-cabecalho font-size-sm" style={{ opacity: 0.45 }}>Ao clicar no botão acima, você concorda com nossos <a href="https://jusfy.com.br/termos.html" target="_BLANK"><span className="font-weight-bolder">Termos de Uso</span></a> e <a href="https://jusfy.com.br/privacidade.html" target="_BLANK"><span className="font-weight-bolder">Política de Privacidade</span></a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <RightInfo formik={props.formik} />
            </div>
        </BlockUi>
    );
}
