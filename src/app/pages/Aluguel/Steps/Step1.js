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

    useEffect(() => {
        dispatch({type: 'LOAD_MINIMUM_WAGES'});
    }, []);

    const proximo = async () => {

        // devemos gerar 
        const validation = await props.formik.validateForm();

        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) {
            props.setStep(props.step+1)
        };
    }

    const generateDates = () => {

        dispatch({
            type: 'LOAD_RENT_INSTALLMENTS',
            payload: props.formik.values
        });

        proximo();
    }

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
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Início do contrato <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.contract_start_date && props.formik.touched.contract_start_date ? 'is-invalid' : '')}
                                    name="contract_start_date"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.contract_start_date}
                                    placeholder="Digite a data inicial do contrato"
                                />
                                {props.formik.errors.contract_start_date && props.formik.touched.contract_start_date && <label className="invalid-feedback">{props.formik.errors.contract_start_date}</label>}
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Início do atraso <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.late_since_date && props.formik.touched.late_since_date ? 'is-invalid' : '')}
                                    name="late_since_date"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.late_since_date}
                                    placeholder="Digite o número de alugéis atrasados atualmente"
                                />
                                {props.formik.errors.late_since_date && props.formik.touched.late_since_date && <label className="invalid-feedback">{props.formik.errors.late_since_date}</label>}
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Fim do atraso <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (props.formik.errors.late_until_date && props.formik.touched.late_until_date ? 'is-invalid' : '')}
                                    name="late_until_date"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.late_until_date}
                                    placeholder="Digite a data limite para os aluguéis atrasados"
                                />
                                {props.formik.errors.late_until_date && props.formik.touched.late_until_date && <label className="invalid-feedback">{props.formik.errors.late_until_date}</label>}
                            </div>
                            <div className="col-xl-6 col-md-12">
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
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Valor Inicial do Aluguel<span class="text-danger">&nbsp;*</span></label>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">R$</span>
                                    </div>
                                    <CurrencyInput
                                        className={"form-control " + (props.formik.errors.monthly_amount && props.formik.touched.monthly_amount ? 'is-invalid' : '')}
                                        value={props.formik.values.monthly_amount}
                                        prefix=""
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
                            <div className="col-xl-4 col-md-12">

                            <label className="form-label">Índice para corrigir o contrato <span class="text-danger">&nbsp;*</span></label>
                                <Select
                                    name="contract_correction_index"
                                    className={props.formik.errors.contract_correction_index && props.formik.touched.contract_correction_index ? 'is-invalid' : ''}
                                    options={[
                                        {
                                            bacen_code: null,
                                            id: null,
                                            name: 'NENHUM'
                                        },
                                        ...indexes
                                    ]}
                                    onChange={(value) => {
                                        props.formik.setFieldValue('contract_correction_index', value)
                                    }}
                                    value={props.formik.values.contract_correction_index}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                    theme={customSelectStyle}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                                {props.formik.errors.contract_correction_index && props.formik.touched.contract_correction_index && <label className="invalid-feedback">{props.formik.errors.contract_correction_index}</label>}
                            </div>
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Periodicidade de correção <span class="text-danger">&nbsp;*</span></label>

                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className={"btn btn-outline-secondary input-group-button " + (props.formik.values.contract_correction_period == 'quarterly' ? 'active' : '')}
                                        onClick={() => {
                                            props.formik.setFieldValue('contract_correction_period', 'quarterly');

                                        }}>Trimestral</button>
                                    <button
                                        type="button"
                                        className={"btn btn-outline-secondary input-group-button " + (props.formik.values.contract_correction_period == 'semiannual' ? 'active' : '')}
                                        onClick={() => {
                                            props.formik.setFieldValue('contract_correction_period', 'semiannual');

                                        }}>Semestral</button>
                                    <button
                                        type="button"
                                        className={"btn btn-outline-secondary input-group-button " + (props.formik.values.contract_correction_period == 'annually' ? 'active' : '')}
                                        onClick={() => {
                                            props.formik.setFieldValue('contract_correction_period', 'annually');
                                        }}>Anual</button>
                                    </div>

                                {props.formik.errors.contract_correction_period && props.formik.touched.contract_correction_period && <label className="invalid-feedback">{props.formik.errors.contract_correction_period}</label>}
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
                <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={async ()=>{
                    generateDates();
                }}>PRÓXIMO</button>
                
            </div>
        </div>
            
    </>
    );
}