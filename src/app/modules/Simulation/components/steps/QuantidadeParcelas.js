import React from 'react';
import NavigationButtons from '../NavigationButtons';

export default function QuantidadeParcelas(props) {
    return (
    <>
        <h2>Quantidade total de prestações</h2>
        <input name="installments_count" onChange={props.formik.handleChange} value={props.formik.values.installments_count} type="text" className="form-control" placeholder="0" />
        <NavigationButtons formik={props.formik} action={props.simular} setStep={props.setStep} step={props.step} isValidated={(props.formik.values.installments_count != '')} />
    </>
    );
}