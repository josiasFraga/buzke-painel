import React from 'react';
import NavigationButtons from '../NavigationButtons';

export default function DataContratoMes(props) {
    return (
    <>
        <h2>Mês de assinatura do contrato</h2>

        <select
            name="contract_date_month"
            onChange={props.formik.handleChange}
            className="form-control">
                <option value="">selecione..</option>
                <option value="1">JANEIRO</option>
                <option value="2">FEVEREIRO</option>
                <option value="3">MARÇO</option>
                <option value="4">ABRIL</option>
                <option value="5">MAIO</option>
                <option value="6">JUNHO</option>
                <option value="7">JULHO</option>
                <option value="8">AGOSTO</option>
                <option value="9">SETEMBRO</option>
                <option value="10">OUTUBRO</option>
                <option value="11">NOVEMBRO</option>
                <option value="12">DEZEMBRO</option>
        </select>

        <NavigationButtons formik={props.formik} setStep={props.setStep} step={props.step} isValidated={(props.formik.values.contract_date_month != '')} />
    </>
    );
}