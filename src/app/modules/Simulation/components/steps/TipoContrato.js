import React from 'react';
import NavigationButtons from '../NavigationButtons';
import { useSelector } from 'react-redux';

export default function TipoContrato(props) {
    const contract_types_pf = useSelector(state => state.app.contract_types).filter(contract_type => contract_type.type === 'PF');
    const contract_types_pj = useSelector(state => state.app.contract_types).filter(contract_type => contract_type.type === 'PJ');

    return (
    <>
        <h2>Tipo de Contrato</h2>
        <select className="form-control" name="contract_type" onChange={props.formik.handleChange}>
            <option selected={props.formik.values.contract_type == ''}>Selecione...</option>
        {props.formik.values.person_type === 'PF' && contract_types_pf.map(contract_type =>
            <option value={contract_type.code} selected={props.formik.values.contract_type == contract_type.code}>{contract_type.name}</option>
        )}
        {props.formik.values.person_type === 'PJ' && contract_types_pj.map(contract_type =>
            <option value={contract_type.code} selected={props.formik.values.contract_type == contract_type.code}>{contract_type.name}</option>
        )}
        </select>

        <NavigationButtons formik={props.formik} setStep={props.setStep} step={props.step} isValidated={(props.formik.values.contract_type != '')} />
    </>
    );
}