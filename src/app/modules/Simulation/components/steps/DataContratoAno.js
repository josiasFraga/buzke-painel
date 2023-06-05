import React, { useEffect, useState } from 'react';
import NavigationButtons from '../NavigationButtons';

function yearValidation(year) {
    var text = /^[0-9]+$/;
    let _year = year.toString();

    if (_year != 0) {
        if ((_year != "") && (!text.test(_year))) {
            return false;
        }
        if (_year.length != 4) {
            return false;
        }
        var current_year=new Date().getFullYear();
        if ((_year < 1920) || (_year > current_year)) {
            return false;
        }
        return true;
    }
}

  
export default function DataContratoAno(props) {
    const [isValidated, setIsValidated] = useState(false);
    useEffect(() => {
        setIsValidated(props.formik.values.contract_date_year != '' && yearValidation(props.formik.values.contract_date_year));
    }, [props.formik.values.contract_date_year]);

    return (
    <>
        <h2>Ano de assinatura do contrato</h2>

        <input
            name="contract_date_year"
            onChange={props.formik.handleChange}
            className="form-control"
            value={props.formik.values.contract_date_year}
            type="number"
        />

        <NavigationButtons formik={props.formik} setStep={props.setStep} step={props.step} isValidated={isValidated} />
    </>
    );
}