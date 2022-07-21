import React, { useState, useEffect, createContext } from "react";
import { useDispatch } from 'react-redux';
import "../../../_metronic/_assets/sass/pages/simulation/index.scss";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import Resultado from './components/Resultado';
import Steps from './components/Steps';
import { useFormik } from 'formik';

export default function Simulation() {
    const dispatch = useDispatch();
    const [screen, setScreen] = useState('steps');
    const [step, setStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            'name': '',
            'person_type': '',
            'contract_type': '',
            'contract_date_month': '',
            'contract_date_year': '',
            //'institution': '5f6e066d10ef90c4c42fd121',
            'institution': {},
            'amortization_system': '',
            'contract_amount': '',
            'first_installment_amount': '',
            'installments_count': '',
            'paid_installments_count': '',
            'interest_rate': '',
            'periodicity_interest': ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <div className="simulation">
            <div className="heading-step">
                <div className="container">
                    <img className="logo" src={toAbsoluteUrl("/media/svg/logos/logo-jusfy.svg")} />
                </div>
            </div>
        { screen == 'steps' &&
            <Steps setScreen={setScreen} formik={formik} step={step} setStep={setStep} />
        }
        {screen == 'resultado' &&
            <Resultado setScreen={setScreen} formik={formik} step={step} setStep={setStep} />
        }
        </div>
    ); 
}