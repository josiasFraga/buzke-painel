import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { format, addMonths, parseISO } from 'date-fns';
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

export default function Step3(props) {

    const indexes = useSelector(state => state.app.average_price_indexes);

    const legal_fees_types = [
        {id: 'percentage', name: 'Percentual (%)', label: 'Percentual de honorários', symbol: '%'},
        {id: 'fixed', name: 'Valor Fixo (R$)', label: 'Valor fixo dos honorários', symbol: 'R$'}
    ];

    return (
        <BlockUi tag="div" blocking={props.formik.isSubmitting}>
            <div className="row mb-10">
                
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>

                        <div className="row mb-5">
                            <div className="col-xl-6 col-md-12">
                                <label className="form-label">Índice Para Correção Dívida/Abatimentos <span class="text-danger">&nbsp;*</span></label>
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
                                <label className="form-label">Início da correção <span class="text-danger">&nbsp;*</span></label>
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
                                            className={"btn btn-outline-secondary input-group-button " + (props.formik.values.interest_rate_period == 'semiannual' ? 'active' : '')}
                                            onClick={() => {
                                                props.formik.setFieldValue('interest_rate_period', 'semiannual');
                                                if (props.formik.values.interest_rate_start === 'semiannual') {
                                                    props.formik.setFieldValue('interest_rate_start', props.formik.values.late_since_date);
                                                }
                                            }}>Semestral</button>
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
                                <label className="form-label">Início dos juros</label>
                                <input
                                    className="form-control"
                                    name="interest_rate_start"
                                    type="date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.interest_rate_start}
                                />
                            </div>


                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-12 col-md-12">
                                <label className="form-label">Multa (%)</label>
                                <CurrencyInput
                                    className="form-control"
                                    value={props.formik.values.fine}
                                    prefix=""
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('fine', floatvalue)}
                                />
                            </div>
                        </div>

                        <div className="row mb-5">
                        <div className="col-xl-3 col-md-12">
                                <label className="form-label">Honorários</label>
                                <Select
                                    name="legal_fees_type"
                                    isSearchable={false}
                                    className={props.formik.errors.legal_fees_type && props.formik.touched.legal_fees_type ? 'is-invalid' : ''}
                                    isClearable={false}
                                    options={legal_fees_types}
                                    onChange={(value) => {
                                        props.formik.setFieldValue('legal_fees_type', value);
                                    }}
                                    theme={customSelectStyle}
                                    value={props.formik.values.legal_fees_type}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {props.formik.errors.legal_fees_type && props.formik.touched.legal_fees_type && <label className="invalid-feedback">{props.formik.errors.legal_fees_type}</label>}

                            </div>
                        { props.formik.values.legal_fees_type !== null &&
                            <div className="col-xl-9 col-md-12">
                                <label className="form-label">{props.formik.values.legal_fees_type.label}</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">{props.formik.values.legal_fees_type.symbol}</span>
                                    </div>
                                    <CurrencyInput
                                        className="form-control"
                                        value={props.formik.values.legal_fees}
                                        prefix=""
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('legal_fees', floatvalue)}
                                    />
                                </div>
                            </div>
                        }
                        </div>                
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-4 col-md-12">
                    <button type="button" className="btn btn-cinza" style={{width: '150px'}} onClick={() => props.setStep(props.step-1)}>VOLTAR</button>
                </div>
                <div className="col-xl-4 col-md-12"></div>
                <div className="col-xl-4 col-md-12">
                    <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={props.formik.handleSubmit}>CALCULAR</button>
                    
                </div>
            </div>
        </BlockUi>
    );
}