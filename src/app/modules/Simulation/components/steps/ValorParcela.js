import React from 'react';
import NavigationButtons from '../NavigationButtons';
import CurrencyInput from 'react-currency-input';

export default function StepTaxaJuros(props) {
    return (
    <>
        <h2>Valor da prestação</h2>
        <CurrencyInput
            name="contract_amount"
            className="form-control"
            value={props.formik.values.first_installment_amount}
            prefix="R$ "
            selectAllOnFocus={true}
            decimalSeparator=","
            thousandSeparator="."
            onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('first_installment_amount', floatvalue)}
        />
        <NavigationButtons formik={props.formik} setStep={props.setStep} step={props.step} isValidated={(props.formik.values.contract_amount != '')} />
    </>
    );
}