import React from 'react';
import NavigationButtons from '../NavigationButtons';

export default function TipoPessoa(props) {
    return (
    <>
        <h2>Selecione o Tipo</h2>
        <select className="form-control" name="person_type" onChange={props.formik.handleChange}>
            <option value="" selected={props.formik.values.person_type == ''}>Selecione...</option>
            <option value="PF" selected={props.formik.values.person_type == 'PF'}>Pessoa Física</option>
            <option value="PJ" selected={props.formik.values.person_type == 'PJ'}>Pessoa Jurídica</option>
        </select>

        <NavigationButtons formik={props.formik} setStep={props.setStep} step={props.step} isValidated={(props.formik.values.person_type != '')} />
    </>
    );
}