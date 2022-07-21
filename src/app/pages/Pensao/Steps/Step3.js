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