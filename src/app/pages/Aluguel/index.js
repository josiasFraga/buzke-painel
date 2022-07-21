import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';

import {useFormik} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { format, parseISO, addMonths } from 'date-fns';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import _ from 'lodash'; 
import BlockUi from 'react-block-ui';
import { toast } from 'react-toastify';

export function Aluguel(props) {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const subheader = useSubheader();
    const calculation = useSelector(state => state.calculation.calculation);
    const calculation_loading = useSelector(state => state.calculation.calculation_loading);

    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Calculadora de Aluguel',
                title: 'Calculadora de Aluguel',
                href: ''
            }
        ])
    }, []);
    const step1SchemaValidation = yup.object().shape({
        late_since_date: yup.string().required('Este campo é obrigatório!'),
        late_until_date: yup.string().required('Este campo é obrigatório!'),
        calculation_date: yup.string().required('Este campo é obrigatório!'),

        contract_correction_index: yup.object().nullable().required('Este campo é obrigatório!'),
        contract_correction_period:  yup.string().required('Este campo é obrigatório!'),
        //: yup.object().nullable().required('Este campo é obrigatório!'),
        //monthly_amount: yup.number().moreThan(0, 'Este campo é obrigatório!'),
    });
    const step2SchemaValidation = yup.object().shape({
        /*
        contract_date: yup.string().required('O campo data do contrato é obrigatorio!'),
        contract_value: yup.number().moreThan(0, 'O campo valor financiado é obrigatorio!'),
        contract_installments: yup.number().moreThan(0, 'O campo quantidade de parcelas é obrigatorio!'),
        installment_amount: yup.number().moreThan(0, 'O campo valor da 1ª parcela é obrigatorio!'),
        */
    });
    const step3SchemaValidation = yup.object().shape({
        monthly_payment_index: yup.object().nullable().required('Este campo é obrigatório!'),
        monthly_payment_index_start: yup.string().required('Este campo é obrigatório!'),
        
    });

    const schemaArray = [step1SchemaValidation, step2SchemaValidation, step3SchemaValidation];

    const formInitialValues = {
        // step 1
        name: '',
        calculation_date: format(new Date, 'yyyy-MM-dd'),
        late_since_date: '',
        late_until_date: '',
        contract_start_date: '',
        monthly_amount: 0,

        contract_correction_index: null,
        contract_correction_period: '',

        // step 2
        installments: [],

        // step 3
        fine: 0,
        legal_fees_type: null,
        legal_fees: 0,

        monthly_payment_index: null,
        monthly_payment_index_start: '',

        interest_rate: 0,
        interest_rate_period: null,
        interest_rate_start: '',


    };

    const formInitialValuesTeste = {
        // step 1
        name: '',
        calculation_date: format(new Date, 'yyyy-MM-dd'),
        late_since_date: '',
        late_until_date: '',
        contract_start_date: '',
        monthly_amount: '',

        contract_correction_index: null,
        contract_correction_period: '',

        // step 2
        installments: [],

        // step 3
        fine: 0,
        legal_fees_type: null,
        legal_fees: 0,

        monthly_payment_index: null,
        monthly_payment_index_start: '',

        interest_rate: 0,
        interest_rate_period: null,
        interest_rate_start: '',

    };

    const [initialValues, setInitialValues] = useState(formInitialValues);

    
    const formik = useFormik({
        enableReinitialize: true,
        //initialValues: formInitialValues,
        initialValues: formInitialValuesTeste,
        onSubmit: (values, {setSubmitting}) => {
            // formatting to send only ids:
            const submitValues = prepareFormRequestData();

            dispatch({type: 'REPORT_RENT', payload: {
                ...submitValues,
                setSubmitting,
                callback: () => {
                    setStep(3);
                }
            }});
        }, 
        validationSchema: schemaArray[step]
    });

    useEffect(() => {
        dispatch({type: 'LOAD_INDEXES'});

        dispatch({
            type: 'LOAD_CALCULATION',
            payload: {
                id: props.match.params.calculo_id || ''
            }
        });

    }, []);

    useEffect(() => {
        if (!calculation.calculation) {
            setInitialValues(formInitialValues);
            return;
        }
        console.log(
            {
                name: (calculation.calculation.name || ''),
                calculation_date: (calculation.calculation.calculation_date || ''),
                late_since_date: (calculation.calculation.late_since_date || ''),
                late_until_date: (calculation.calculation.late_until_date || ''),
                contract_start_date: (calculation.calculation.contract_start_date || ''),
                monthly_amount: (calculation.calculation.monthly_amount || 0),

                contract_correction_index: (calculation.calculation.contract_correction_index || null),
                contract_correction_period: (calculation.calculation.contract_correction_period || ''),

                // step 2
                installments: (calculation.calculation.installments || []),

                // step 3
                fine: (calculation.calculation.fine || 0),
                legal_fees_type: (calculation.calculation.legal_fees_type || null),
                legal_fees: (calculation.calculation.legal_fees || 0),
                monthly_payment_index: (calculation.calculation.monthly_payment_index || null),
                monthly_payment_index_start: (calculation.calculation.monthly_payment_index_start || ''),

                interest_rate: (calculation.calculation.interest_rate || 0),
                interest_rate_period: (calculation.calculation.interest_rate_period || null),
                interest_rate_start: (calculation.calculation.interest_rate_start || ''),
            }
        );
    
        formik.setValues({
            name: (calculation.calculation.name || ''),
            calculation_date: (calculation.calculation.calculation_date || ''),
            contract_start_date: (calculation.calculation.contract_start_date || ''),
            late_since_date: (calculation.calculation.late_since_date || ''),
            late_until_date: (calculation.calculation.late_until_date || ''),
            monthly_amount: (calculation.calculation.monthly_amount || 0),

            contract_correction_index: (calculation.calculation.contract_correction_index || null),
            contract_correction_period: (calculation.calculation.contract_correction_period || ''),
    
            // step 2
            installments: (calculation.calculation.installments || []),
    
            // step 3
            fine: (calculation.calculation.fine || 0),
            legal_fees_type: (calculation.calculation.legal_fees_type || null),
            legal_fees: (calculation.calculation.legal_fees || 0),

            monthly_payment_index: (calculation.calculation.monthly_payment_index || null),
            monthly_payment_index_start: (calculation.calculation.monthly_payment_index_start || ''),

            interest_rate: (calculation.calculation.interest_rate || 0),
            interest_rate_period: (calculation.calculation.interest_rate_period || null),
            interest_rate_start: (calculation.calculation.interest_rate_start || ''),
        });
    }, [calculation]);


    const prepareFormRequestData = () => {
        const values = formik.values;
        return values;
    }

    const goToStep = async (target_step) => {
        if (target_step == 3) {
            toast.warn("Por favor, utilize o botão calcular para realizar o cálculo.");
            return;
        }

        if (target_step > (step+1)) {
            toast.warn("Por favor, utilize o botão avançar.");
            return;
        }
        
        if (target_step <= step) {
            setStep(target_step);
        }

        const validation = await formik.validateForm();
        formik.setTouched(validation);
        if (Object.keys(validation).length == 0) {
            setStep(target_step);
        }
    }

    
    return (
    <BlockUi tag="div" blocking={calculation_loading}>
        <h1 className="azul-cabecalho">CALCULADORA DE ALUGUEL</h1>
        <p className="subheader-text mb-10">Realize cálculos de aluguéis facilmente.</p>

        <div className="row steps mb-10">
            <div className="d-flex" style={{width: '25%'}}>
            <div className="pointer" onClick={() => goToStep(0)}>
                    <div className={"step " + ((step == 0 || step == 1 || step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>1</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 1</span>
                    <span className="step-description">dados básicos</span>
                </div>
            </div>
            <div className="d-flex" style={{width: '25%'}}>
                <div className="pointer" onClick={() => goToStep(1)}>
                    <div className={"step " + ((step == 1 || step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>2</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 2</span>
                    <span className="step-description">abatimentos</span>
                </div>
            </div>
            <div className="d-flex" style={{width: '25%'}}>
                <div className="pointer" onClick={() => goToStep(2)}>
                    <div className={"step " + ((step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>3</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 3</span>
                    <span className="step-description">informações extras, multas, honorários </span>
                </div>
            </div>
            <div className="d-flex" style={{width: '25%'}}>
                <div className="pointer" onClick={() => goToStep(3)}>
                    <div className={"step " + ((step == 3 || step == 4) ? 'active' : '')}><span>4</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 4</span>
                    <span className="step-description">resultado do cálculo </span>
                </div>
            </div>
            
        </div>
        {/*
        <pre>
            {JSON.stringify(formik.values,null,'\t')}
            </pre>
        */}
  
        {step == 0 &&
            <Step1
                step={step}
                setStep={setStep}
                formik={formik}
            />
        }
        {step == 1 &&
            <Step2
                step={step}
                setStep={setStep}
                formik={formik} 
            />
        }

        {step == 2 &&
            <Step3
                step={step}
                setStep={setStep}
                formik={formik} 
            />
        }

        {step == 3 && <Step4 step={step} setStep={setStep} formik={formik} /> }
        

    </BlockUi>
    );
}