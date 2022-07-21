import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { format, addMonths, parseISO, isValid, startOfMonth, endOfMonth } from 'date-fns';
import CurrencyInput from 'react-currency-input';
import Select from 'react-select';
import BlockUi from 'react-block-ui';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';

import {useSubheader} from "../../../../_metronic/layout/_core/MetronicSubheader";

import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

export default function Step1(props) {
    const dispatch = useDispatch();
    const indexes = useSelector(state => state.app.average_price_indexes);
    const minimum_wages = useSelector(state => state.app.minimum_wages);
    const monthly_payment_types = [
        {id: 'percentage', name: 'Percentual do salário mínimo (%)', label: 'Percentual do salário mínimo', symbol: '%'},
        {id: 'fixed', name: 'Valor Fixo Mensal (R$)', label: 'Valor fixo mensal da pensão', symbol: 'R$'}
    ];
    useEffect(() => {
        dispatch({type: 'LOAD_MINIMUM_WAGES'});
    }, []);

    const proximo = async () => {
        // devemos gerar 
        const validation = await props.formik.validateForm();

        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }

    const generateDates = () => {
        let installments = [];

        // devemos 
        if (props.formik.values.monthly_payment_index == null) {
            return;
        }
        if (isValid(parseISO(props.formik.values.late_since_date)) && isValid(parseISO(props.formik.values.late_until_date))) {
            let wages = minimum_wages.filter(wage => 
                parseISO(wage.date) >= startOfMonth(parseISO(props.formik.values.late_since_date)) && parseISO(wage.date) <= endOfMonth(parseISO(props.formik.values.late_until_date))
            );
            
            
            for (let i = 0; i < wages.length; i++) {
                let description;
                let amount;
                if (props.formik.values.monthly_payment_type != null && props.formik.values.monthly_payment_type.id == 'percentage') {
                    description = `Pensão ${props.formik.values.monthly_amount}% do salário mínimo ${parseFloat(wages[i].price).toFixed(2)}`;
                    amount = wages[i].price * (props.formik.values.monthly_amount / 100);
                } else {
                    description = `Pensão fixada`;
                    amount = props.formik.values.monthly_amount;
                }
                installments.push({
                    description: description,
                    description_original: description,
                    date: `${format(addMonths(parseISO(props.formik.values.late_since_date), i), 'yyyy-MM-dd')}`,
                    amount: amount,
                    paid: false
                });

            }            
        }

        props.formik.setFieldValue('installments', installments);
    }


    /*
    useEffect(() => {
        generateDates();
    }, [props.formik.values.monthly_payment_type, props.formik.values.monthly_amount, props.formik.values.monthly_payment_index])
    */

    return (
    <>
            <div className="row mb-10">
                
                <div className="col-xl-12">

                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <div className="row mb-5">
                            <div className="col-xl-12 col-md-12">
                                <label className="form-label">Nome do cálculo</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.name}
                                    placeholder="Digite um nome para identificar o cálculo"
                                />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Data do início do atraso <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.late_since_date && props.formik.touched.late_since_date ? 'is-invalid' : '')}
                                    name="late_since_date"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.late_since_date}
                                    onBlur={generateDates}
                                    placeholder="Digite o número de pensões atrasadas atualmente"
                                />
                                {props.formik.errors.late_since_date && props.formik.touched.late_since_date && <label className="invalid-feedback">{props.formik.errors.late_since_date}</label>}
                            </div>
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Data do fim do atraso <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.late_until_date && props.formik.touched.late_until_date ? 'is-invalid' : '')}
                                    name="late_until_date"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.late_until_date}
                                    onBlur={generateDates}
                                    placeholder="Digite a data limite para as pensões atrasadas"
                                />
                                {props.formik.errors.late_until_date && props.formik.touched.late_until_date && <label className="invalid-feedback">{props.formik.errors.late_until_date}</label>}
                            </div>
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Data do cálculo <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.calculation_date && props.formik.touched.calculation_date ? 'is-invalid' : '')}
                                    name="calculation_date"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.calculation_date}
                                />
                                {props.formik.errors.calculation_date && props.formik.touched.calculation_date && <label className="invalid-feedback">{props.formik.errors.calculation_date}</label>}
                            </div>
                        </div>
                        <div className="row mb-5">
                        <div className="col-xl-6 col-md-12">
                                <label className="form-label">Forma estipulada de pensão <span class="text-danger">&nbsp;*</span></label>
                                <Select
                                    name="monthly_payment_type"
                                    isSearchable={false}
                                    className={props.formik.errors.monthly_payment_type && props.formik.touched.monthly_payment_type ? 'is-invalid' : ''}
                                    isClearable={false}
                                    options={monthly_payment_types}
                                    theme={customSelectStyle}
                                    onChange={(value) => {
                                        props.formik.setFieldValue('monthly_payment_type', value);
                                    }}
                                    onBlur={generateDates}
                                    value={props.formik.values.monthly_payment_type}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {props.formik.errors.monthly_payment_type && props.formik.touched.monthly_payment_type && <label className="invalid-feedback">{props.formik.errors.monthly_payment_type}</label>}
                            </div>
                        { props.formik.values.monthly_payment_type !== null &&
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">{props.formik.values.monthly_payment_type.label} <span class="text-danger">&nbsp;*</span></label>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">{props.formik.values.monthly_payment_type.symbol}</span>
                                    </div>
                                    <CurrencyInput
                                        className={"form-control " + (props.formik.errors.monthly_amount && props.formik.touched.monthly_amount ? 'is-invalid' : '')}
                                        value={props.formik.values.monthly_amount}
                                        prefix=""
                                        onBlur={generateDates}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => {
                                            props.formik.setFieldValue('monthly_amount', floatvalue);
                                        }}
                                    />
                                    {props.formik.errors.monthly_amount && props.formik.touched.monthly_amount && <label className="invalid-feedback">{props.formik.errors.monthly_amount}</label>}
                                </div>
                            </div>
                        }
                        </div>
                        <div className="row mb-5">
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Índice para corrigir os valores <span class="text-danger">&nbsp;*</span></label>
                                <Select
                                    name="monthly_payment_index"
                                    className={props.formik.errors.monthly_payment_index && props.formik.touched.monthly_payment_index ? 'is-invalid' : ''}
                                    options={[
                                        {
                                            bacen_code: null,
                                            id: null,
                                            name: 'NENHUM'
                                        },
                                        ...indexes
                                    ]}
                                    onChange={(value) => {
                                        props.formik.setFieldValue('monthly_payment_index', value)
                                        if (props.formik.values.monthly_payment_index_start === '') {
                                            props.formik.setFieldValue('monthly_payment_index_start', props.formik.values.late_since_date);
                                        }
                                    }}
                                    onBlur={generateDates}
                                    value={props.formik.values.monthly_payment_index}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                    theme={customSelectStyle}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                                {props.formik.errors.monthly_payment_index && props.formik.touched.monthly_payment_index && <label className="invalid-feedback">{props.formik.errors.monthly_payment_index}</label>}
                            </div>
                        { props.formik.values.monthly_payment_index !== null &&
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Data do início da correção <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.monthly_payment_index_start && props.formik.touched.monthly_payment_index_start ? 'is-invalid' : '')}
                                    name="monthly_payment_index_start"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.monthly_payment_index_start}
                                />
                                {props.formik.errors.monthly_payment_index_start && props.formik.touched.monthly_payment_index_start && <label className="invalid-feedback">{props.formik.errors.monthly_payment_index_start}</label>}
                            </div>
                        }
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Juros (%)</label>
                                <div className="input-group">
                                    <CurrencyInput
                                        className="form-control"
                                        value={props.formik.values.interest_rate}
                                        prefix=""
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('interest_rate', floatvalue)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className={"btn btn-outline-secondary input-group-button " + (props.formik.values.interest_rate_period == 'monthly' ? 'active' : '')}
                                            onClick={() => {
                                                props.formik.setFieldValue('interest_rate_period', 'monthly');
                                                if (props.formik.values.interest_rate_start === '') {
                                                    props.formik.setFieldValue('interest_rate_start', props.formik.values.late_since_date);
                                                }
                                            }}>Mensal</button>
                                        <button
                                            type="button"
                                            className={"btn btn-outline-secondary input-group-button " + (props.formik.values.interest_rate_period == 'annually' ? 'active' : '')}
                                            onClick={() => {
                                                props.formik.setFieldValue('interest_rate_period', 'annually');
                                                if (props.formik.values.interest_rate_start === '') {
                                                    props.formik.setFieldValue('interest_rate_start', props.formik.values.late_since_date);
                                                }
                                            }}>Anual</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Data do início dos juros</label>
                                <input
                                    className="form-control"
                                    name="interest_rate_start"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.interest_rate_start}
                                />
                            </div>


                        </div>
                    </div>
                </div>


 </div>

 <div className="row">
            <div className="col-xl-4 col-md-12">
            </div>
            <div className="col-xl-4 col-md-12"></div>
            <div className="col-xl-4 col-md-12">
                <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={proximo}>PRÓXIMO</button>
                
            </div>
        </div>
            
    </>
    );
}