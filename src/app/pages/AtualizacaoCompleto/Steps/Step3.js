import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async';
import Select, { components } from 'react-select';
import CurrencyInput from 'react-currency-input';
import BlockUi from 'react-block-ui';

export default function Step3(props) {
    const dispatch = useDispatch();

    const proximo = async () => {
        const validation = await props.formik.validateForm();

        props.formik.setTouched(validation);
        console.log(props.step);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }

    return (
<>
    <BlockUi tag="div" blocking={props.formik.isSubmitting}>

        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label">Multa (%)</label>
                            <CurrencyInput
                                name="fine"
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
                        <div className="col">
                            <label className="form-label">Honorários (%)</label>
                            <CurrencyInput
                                name="legal_fees"
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
    </>);
}