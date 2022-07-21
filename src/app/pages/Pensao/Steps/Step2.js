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

import {useSubheader} from "../../../../_metronic/layout/_core/MetronicSubheader";

import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

export default function Step2(props) {
    const indexes = useSelector(state => state.app.average_price_indexes);
    const monthly_payment_types = [
        {id: 'percentage', name: 'Percentual do salário mínimo (%)', label: 'Percentual do salário mínimo', symbol: '%'},
        {id: 'fixed', name: 'Valor Fixo Mensal (R$)', label: 'Valor fixo mensal da pensão', symbol: 'R$'}
    ];

    const proximo = async () => {
        const validation = await props.formik.validateForm();

        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }

    const removeItem = (key) => {
        if (!window.confirm("Deseja realmente remover esta pensão?")) {
            return;
        }
        let items = props.formik.values.installments;
        items.splice(key, 1);
        props.formik.setFieldValue('installments', items);
    }

    const [installmentCount, setInstallmentCount] = useState(1);

    const changeInstallmentCount = (count) => {

    }

    const addInstallment = () => {
        let _installmentCount = installmentCount;
        if (_installmentCount == '' || _installmentCount <= 0) {
            _installmentCount = 1;
        }

        let paidInstallmentsTmp = props.formik.values.installments;

        for (let i = 1; i <= _installmentCount; i++) {
            if (paidInstallmentsTmp[paidInstallmentsTmp.length - 1]) {
                paidInstallmentsTmp.push({
                    description: 'Abatimento/Pagamento',
                    description_original: 'Abatimento/Pagamento',
                    date: paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date != '' ? format(addMonths(parseISO(paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date), 1), 'yyyy-MM-dd') : '',
                    amount: paidInstallmentsTmp[paidInstallmentsTmp.length - 1].amount,
                });
            } else {
                paidInstallmentsTmp.push({
                    description: 'Abatimento/Pagamento',
                    description_original: 'Abatimento/Pagamento',
                    date: '',
                    amount: 0,
                });
            }

        }

        props.formik.setFieldValue('installments', paidInstallmentsTmp);

        setInstallmentCount(1);
    }

    return (
    <>
    {/*
                <pre>
                {JSON.stringify(props.formik.values, null, 2)}
                </pre>
                */}
                <div className="row mb-10">
                    <div className="col-xl-12">
                        <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <div key={props.formik.values.installments}>
                    { props.formik.values.installments.map((installment, key) => 
                        <div key={key} className="row mb-5">

                            <div className="col-xl-1">
                                <div className="form-group">
                                    <label className="form-label">Item nº</label>
                                    <div className="input-remover-container">
                                        <div className="icon-remover pointer" onClick={() => removeItem(key)}><span>&times;</span></div>
                                        <input className="form-control input-parcela" value={(key+1)} disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="form-group">
                                    <label className="form-label">Data da época <span class="text-danger">&nbsp;*</span></label>
                                    <input
                                        name={`installments[${key}].date`}
                                        type="date"
                                        max="2999-12-31"
                                        className="form-control"
                                        value={props.formik.values.installments[key].date}
                                        onChange={props.formik.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-3">
                                <div className="form-group">
                                    <label className="form-label">Descrição do item</label>
                                    <input
                                        name={`installments[${key}].description`}
                                        type="text"
                                        maxlength="18"
                                        className="form-control"
                                        placeholder="Ex.: Aluguel, reforma.."
                                        value={props.formik.values.installments[key].description}
                                        onChange={props.formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="form-group">
                                    <label className="form-label">Digite o valor <span class="text-danger">&nbsp;*</span></label>
                                    <CurrencyInput
                                        name={`installments[${key}].amount`}
                                        className="form-control"
                                        value={props.formik.values.installments[key].amount}
                                        prefix="R$ "
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue(`installments[${key}].amount`, floatvalue)}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="row justify-content-end">
                                    <div>
                                        <label className="form-label">Esta pensão foi paga?</label>  
                                        <div className="input-group">  
                                            <div className="btn-group">
                                                <button type="button" onClick={() => { 
                                                    props.formik.setFieldValue(`installments[${key}].paid`, true);
                                                    props.formik.setFieldValue(`installments[${key}].description`, 'Abatimento/Pagamento');
                                                }}
                                                className={"btn " + (props.formik.values.installments[key].paid ? 'btn-primary' : 'btn-cinza')}
                                                style={{width: '80px'}}>SIM</button>

                                                <button type="button"
                                                onClick={() => {
                                                    props.formik.setFieldValue(`installments[${key}].paid`, false);
                                                    props.formik.setFieldValue(`installments[${key}].description`, props.formik.values.installments[key].description_original);
                                                }}
                                                className={"btn " + (!props.formik.values.installments[key].paid ? 'btn-vermelho' : 'btn-cinza')}
                                                style={{width: '80px'}}>NÃO</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                    </div>
                    <div className="hr mb-5"></div>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                style={{display: 'inline-block', width: '60px', marginLeft: '10px'}}
                                value={installmentCount}
                                onChange={(e) => changeInstallmentCount(e.target.value)}
                                onClick={(evt) => evt.currentTarget.select()}
                            />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-secondary mb-10" style={{width: '230px'}} onClick={addInstallment}>ADICIONAR PARCELA(S)</button>
                            </div>
                        </div>
                        </div>
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
                <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={proximo}>PRÓXIMO</button>
                
            </div>
        </div>

    </>
    );
}