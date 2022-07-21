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

export function AtualizacaoCompleto(props) {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const subheader = useSubheader();
    const calculation = useSelector(state => state.calculation.calculation);
    const calculation_loading = useSelector(state => state.calculation.calculation_loading);

    const installment_types = useSelector(state => state.app.installment_types);
    const periodicity_types = useSelector(state => state.app.periodicity_types);
    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Juscalc Completo',
                title: 'Juscalc Completo',
                href: ''
            }
        ])
    }, []);
    const step1SchemaValidation = yup.object().shape({
        /*
        contract_person_type: yup.object().nullable().required('O campo tipo de pessoa é obrigatório!'),
        contract_type: yup.object().nullable().required('O campo modalidade de contrato é obrigatório!'),
        */
    });
    const step2SchemaValidation = yup.object().shape({
        /*
        contract_date: yup.string().required('O campo data do contrato é obrigatorio!'),
        contract_value: yup.number().moreThan(0, 'O campo valor financiado é obrigatorio!'),
        contract_installments: yup.number().moreThan(0, 'O campo quantidade de parcelas é obrigatorio!'),
        installment_amount: yup.number().moreThan(0, 'O campo valor da 1ª parcela é obrigatorio!'),
        amortization_system: yup.string().required('O campo tipo das parcelas é obrigatorio!'),
        first_installment_date: yup.string().required('O campo data de vencimento da 1ª parcela é obrigatório!'),
        amortization_system: yup.object().nullable().required('O campo tipo da parcela é obrigatório!'),
        */
    });

    const schemaArray = [step1SchemaValidation, step2SchemaValidation];


    const defaultStakeholder = {
        name: '',
        type: null
    }

    const defaultIndex = {
        index: null,
        startDate: '',
        endDate: format(new Date, 'yyyy-MM-dd'),
    };

    const defaultInterest = {
        interest: 0,
        apply_index: false,
        type: periodicity_types[0],
        startDate: '',
        endDate: format(new Date, 'yyyy-MM-dd'),
    };

    const defaultInstallment = {
        description: 'Parcela',
        calculation_date: format(new Date, 'yyyy-MM-dd'),
        amount: 0,
        type: installment_types[0],
        indexes: [defaultIndex],
        interests: [defaultInterest]
    };

    const formInitialValues = {
        // step 1
        process_number: '',
        res_judicata_date: '',
        stakeholders: [defaultStakeholder],

        // step 2
        installments: [defaultInstallment],

        // step 3
        fine: 0,
        legal_fees: 0,

    };
    const [initialValues, setInitialValues] = useState(formInitialValues);

    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            // formatting to send only ids:
            const submitValues = prepareFormRequestData();

            dispatch({type: 'REPORT_CORRECTION_COMPLETE', payload: {
                ...submitValues,
                setSubmitting,
                callback: () => {
                    setStep(3);
                }
            }});
        }, 
        validationSchema: schemaArray[step]
    });

    const appendStakeholder = () => {
        formik.setFieldValue('stakeholders', [...formik.values.stakeholders, defaultStakeholder]);
    }

    const removeStakeholder = (stakeholderKey) => {
        formik.setFieldValue('stakeholders', formik.values.stakeholders.filter((_,key) => key != stakeholderKey));
    }

    const appendIndex = (installment_key) => {
        let tmpDefaultIndex = {...defaultIndex};
        tmpDefaultIndex.endDate = formik.values.installments[installment_key].calculation_date;

        formik.setFieldValue(`installments[${installment_key}].indexes`, [...formik.values.installments[installment_key].indexes, tmpDefaultIndex]);
    }

    const appendInterest = (installment_key) => {
        let tmpDefaultInterest = {...defaultInterest};
        tmpDefaultInterest.endDate = formik.values.installments[installment_key].calculation_date;

        formik.setFieldValue(`installments[${installment_key}].interests`, [...formik.values.installments[installment_key].interests, tmpDefaultInterest]);
    }

    const appendInstallment = (cloneIndex, count, addMonth = false) => {
        let newInstallments = [];

        for (let i = 1; i <= count; i++) {
            let newInstallmentObj = {};
            if (cloneIndex != null) {
                newInstallmentObj = _.cloneDeep(formik.values.installments[cloneIndex]);
            } else {
                newInstallmentObj = _.cloneDeep(defaultInstallment);
            }

            if (addMonth) {
                if (newInstallmentObj.indexes[0].startDate != "") {
                    newInstallmentObj.indexes[0].startDate = format(addMonths(parseISO(newInstallmentObj.indexes[0].startDate), i), "yyyy-MM-dd");
                }
                if (newInstallmentObj.interests[0].startDate != "") {
                    newInstallmentObj.interests[0].startDate = format(addMonths(parseISO(newInstallmentObj.interests[0].startDate), i), "yyyy-MM-dd");
                }
            }
            newInstallments.push(newInstallmentObj);
        }

        formik.setFieldValue('installments', formik.values.installments.concat(newInstallments));        
    }

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

        setInitialValues({
            // step 1
            process_number: (calculation.calculation.process_number || ''),
            res_judicata_date: (calculation.calculation.res_judicata_date || ''),
            stakeholders: (calculation.calculation.stakeholders || formInitialValues.stakeholders),

            // step 2
            installments: (calculation.calculation.installments || formInitialValues.installments),

            // step 3
            fine: (calculation.calculation.fine || 0),
            legal_fees: (calculation.calculation.legal_fees || 0),
        });
    }, [calculation]);


    const prepareFormRequestData = () => {
        const values = formik.values;
        return values;
    }

    const generateReportPdf = () => {
        const submitValues = prepareFormRequestData();
        dispatch({type: 'REPORT_CORRECTION_COMPLETE_PDF', payload: {
            ...submitValues,
        }});
    }

    
    return (
    <BlockUi tag="div" blocking={calculation_loading}>
        <h1 className="azul-cabecalho">JUSCALC COMPLETO</h1>
        <p className="subheader-text mb-10">Realize cálculos complexos como liquidação de sentença.</p>

        <div className="row steps mb-10">
            <div className="d-flex" style={{width: '25%'}}>
                <div>
                    <div className={"step " + ((step == 0 || step == 1 || step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>1</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 1</span>
                    <span className="step-description">dados básicos</span>
                </div>
            </div>
            <div className="d-flex" style={{width: '25%'}}>
                <div>
                    <div className={"step " + ((step == 1 || step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>2</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 2</span>
                    <span className="step-description">informações das parcelas</span>
                </div>
            </div>
            <div className="d-flex" style={{width: '25%'}}>
                <div>
                    <div className={"step " + ((step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>3</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 3</span>
                    <span className="step-description">informações extras, multas, honorários </span>
                </div>
            </div>
            <div className="d-flex" style={{width: '25%'}}>
                <div>
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
                appendStakeholder={appendStakeholder}
                removeStakeholder={removeStakeholder}
            />
        }
        {step == 1 &&
            <Step2
                step={step}
                setStep={setStep}
                formik={formik} 
                appendInstallment={appendInstallment}
                appendIndex={appendIndex}
                appendInterest={appendInterest}
            />
        }
        {step == 2 && <Step3 step={step} setStep={setStep} formik={formik} /> }
        {step == 3 && <Step4 step={step} setStep={setStep} formik={formik} /> }

        

    </BlockUi>
    );
}