import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import Resumo from './Steps/Resumo';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { format, parseISO, endOfMonth } from 'date-fns';
import { toast } from 'react-toastify';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import BlockUi from 'react-block-ui';

export function Revisional(props) {
    const dispatch = useDispatch();
    const subheader = useSubheader();
    const person_types = useSelector(state => state.app.person_types);
    const calculation_loading = useSelector(state => state.calculation.calculation_loading);

    const [step, setStep] = useState(0);
    const initialForm = {
        // step 1
        contract_institution: '',
        contract_customer: '',
        contract_type: '',
        contract_person_type: '',

        // step 2
        contract_date: '',
        contract_value: 0,
        contract_service_tax: 0,
        contract_iof: 0,
        contract_another_taxes: 0,
        contract_goods: 0,
        contract_installments: 0,
        installment_amount: 0,
        amortization_system: '',
        first_installment_date: '',
        interest_rate: 0,
        interest_rate_periodicity: 'monthly',

        own_average_interest: false,
        average_interest: 0,
        average_interest_periodicity: 'monthly',



        // step 3
        contract_price_index: '',
        contract_balance_index: '',
        differences_has_interests: false,
        report_date: format(new Date(), 'yyyy-MM-dd'),
        //report_date: '2020-04-30',

        // step 4
        paid_installments: [],
        paid_installments_count: 0
    };

    const [initialValues, setInitialValues] = useState(initialForm);

    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Cálculo Revisional',
                title: 'Cálculo Revisional',
                href: '#'
            }
        ])
    }, []);

    const calculation = useSelector(state => state.calculation.calculation);
    const [latestIndexUpdate, setLatestIndexUpdate] = useState('');
    const [startIndexUpdate, setStartIndexUpdate] = useState('');
    
    
    yup.addMethod(yup.number, "sumContractValue", function (errorMessage) {
        return false;
    });
      
    const step1SchemaValidation = yup.object().shape({
        contract_person_type: yup.object().nullable().required('O campo tipo de pessoa é obrigatório!'),
        contract_type: yup.object().nullable().required('O campo modalidade de contrato é obrigatório!'),
    });

    const step2SchemaValidation = yup.object().shape({
        contract_date: yup.string()
            .required('O campo data do contrato é obrigatorio!')
            .test("isFutureDate", "A data não pode ser maior que a data de hoje.", function(value) {
                return (parseISO(value) < new Date());
            })
            .test("isLaterThanEndIndex", `Os índices de taxa média do BACEN estão disponibilizados apenas até ${latestIndexUpdate}.`, function(value) {
                return parseISO(value) <= endOfMonth(parseISO(formik.values.contract_type.latest_update));
            })
            .test("isEarlierThanStartIndex", `Os índices de taxa média do BACEN estão disponibilizados apenas a partir de ${startIndexUpdate}.`, function(value) {
                return parseISO(value) >= parseISO(formik.values.contract_type.first_update);
            }),
        contract_value: yup.number()
            .moreThan(0, 'O campo valor financiado é obrigatorio!')
            .test("sumContractValue", "O total deve ser igual ao somatório dos itens ao lado.", function(value) {
                const { contract_service_tax, contract_iof, contract_another_taxes, contract_goods } = this.parent;
                if (contract_service_tax > 0 || contract_iof > 0 || contract_another_taxes > 0 || contract_goods > 0) {
                    let sum_items = contract_service_tax + contract_iof + contract_another_taxes + contract_goods;
                    return value.toFixed(2) == sum_items.toFixed(2)
                }
                return true;
            }),
        contract_installments: yup.number().moreThan(0, 'O campo quantidade de parcelas é obrigatorio!'),
        installment_amount: yup.number().moreThan(0, 'O campo valor da 1ª parcela é obrigatorio!'),
        amortization_system: yup.string().required('O campo tipo das parcelas é obrigatorio!'),
        first_installment_date: yup.string()
            .required('O campo data de vencimento da 1ª parcela é obrigatório!')
            .test("isBiggerThanContract", "A data não pode ser menor ou igual a data do contrato.", function(value) {
                const { contract_date } = this.parent;
                return parseISO(value) > parseISO(contract_date);
            }),
        amortization_system: yup.object().nullable().required('O campo tipo da parcela é obrigatório!'),
        interest_rate: yup.number()
            .when('amortization_system', {
                is: value => value && value.id == 'sac',
                then: yup.number().moreThan(0, 'O campo taxa de juros é obrigatório!')
            }),
            average_interest: yup.number()
            .when('own_average_interest', {
                is: value => value && value === true,
                then: yup.number().moreThan(0, 'O campo taxa média de juros é obrigatório!')
            })
    });
    const step3SchemaValidation = yup.object().shape({
        contract_price_index: yup.object().nullable().required('O campo índice de ajuste de diferenças é obrigatório!'),
        contract_balance_index: yup.object().nullable().required('O campo índice de saldo devedor é obrigatório!'),
    });
    const step4SchemaValidation = yup.object().shape({
        //paid_installments: yup.array().nullable().required('Escolha pelo menos uma parcela paga!'),
    });

    const schemaArray = [step1SchemaValidation, step2SchemaValidation, step3SchemaValidation, step4SchemaValidation];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            // formatting to send only ids:
            const submitValues = prepareFormRequestData();

            dispatch({type: 'REPORT_REVIEW', payload: {
                ...submitValues,
                setSubmitting,
                callback: () => {
                    setStep(4);
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
            setInitialValues(initialForm);
            return;
        }


        setInitialValues({
            // step 1
            contract_institution: (calculation.calculation.contract_institution || ''),
            contract_customer: (calculation.calculation.contract_customer || ''),
            contract_type: (calculation.calculation.contract_type || ''),
            contract_person_type: (calculation.calculation.contract_person_type || ''),
    
            // step 2
            contract_date: (calculation.calculation.contract_date || ''),
            contract_value: (calculation.calculation.contract_value || 0),
            contract_service_tax: (calculation.calculation.contract_service_tax || 0),
            contract_iof: (calculation.calculation.contract_iof || 0),
            contract_another_taxes: (calculation.calculation.contract_another_taxes || 0),
            contract_goods: (calculation.calculation.contract_goods || 0),
            contract_installments: (calculation.calculation.contract_installments || 0),
            installment_amount: (calculation.calculation.installment_amount || 0),
            amortization_system: (calculation.calculation.amortization_system || ''),
            first_installment_date: (calculation.calculation.first_installment_date || ''),
            interest_rate: (calculation.calculation.interest_rate || 0),
            interest_rate_periodicity: (calculation.calculation.interest_rate_periodicity || 'monthly'),

            own_average_interest: (calculation.own_average_interest || false),
            average_interest: (calculation.average_interest || 0),
            average_interest_periodicity: (calculation.average_interest_periodicity || 'monthly'),

            // step 3
            contract_price_index: (calculation.calculation.contract_price_index || ''),
            contract_balance_index: (calculation.calculation.contract_balance_index || ''),
            differences_has_interests: (calculation.calculation.differences_has_interests || false),
            report_date: format(new Date(), 'yyyy-MM-dd'),
            //report_date: '2020-04-30',
    
            // step 4
            paid_installments: (calculation.calculation.paid_installments || []),
            paid_installments_count: (calculation.calculation.paid_installments_count || 0)
        });
    }, [calculation]);

    useEffect(() => {
        const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        if (formik.values.contract_type.latest_update) {
            const latestMonth = months[parseInt(format(parseISO(formik.values.contract_type.latest_update), 'MM')) - 1];
            const latestYear = format(parseISO(formik.values.contract_type.latest_update), 'yyyy');

            const startMonth = months[parseInt(format(parseISO(formik.values.contract_type.first_update), 'MM')) - 1];
            const startYear = format(parseISO(formik.values.contract_type.first_update), 'yyyy');

            setStartIndexUpdate(`${startMonth}/${startYear}`);
            setLatestIndexUpdate(`${latestMonth}/${latestYear}`);
        }
    }, [formik.values.contract_type]);

    const goToStep = async (target_step) => {
        if (target_step == 4) {
            toast.warn("Por favor, utilize o botão avançar para realizar o cálculo.");
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

    const prepareFormRequestData = () => {
        const values = formik.values;

        return {
            ...values,
            // step 1
            contract_institution: (values.contract_institution.value ? values.contract_institution.value : ''),
            contract_customer: (values.contract_customer.id ? values.contract_customer.id : ''),
            contract_type: (values.contract_type.id ? values.contract_type.id : ''),
            contract_person_type: (values.contract_person_type.id ? values.contract_person_type.id : ''),

            // step 2
            amortization_system: (values.amortization_system.id ? values.amortization_system.id : ''),

            // step 3
            contract_price_index: (values.contract_price_index.id ? values.contract_price_index.id : ''),
            contract_balance_index: (values.contract_balance_index.id ? values.contract_balance_index.id : ''),
        };
    }

    const generateReportPdf = () => {
        const submitValues = prepareFormRequestData();
        dispatch({type: 'REPORT_REVIEW_PDF', payload: {
            ...submitValues,
        }});
    }

    
    return (
    <BlockUi tag="div" blocking={calculation_loading}>
        <h1 className="azul-cabecalho">CÁLCULO REVISIONAL</h1>

        <p className="subheader-text mb-10">Realize cálculos revisionais facilmente.</p>

        <div className="row steps mb-10">
            <div className={"d-flex " + (step == 0 ? '' : 'opacity-50')} style={{width: '20%'}}>
                <div className="pointer" onClick={() => goToStep(0)}>
                    <div className={"step " + ((step == 0 || step == 1 || step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>1</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 1</span>
                    <span className="step-description">dados básicos</span>
                </div>
            </div>
            <div className={"d-flex " + (step == 1 ? '' : 'opacity-50')} style={{width: '20%'}}>
                <div className="pointer" onClick={() => goToStep(1)}>
                    <div className={"step " + ((step == 1 || step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>2</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 2</span>
                    <span className="step-description">informações do contrato</span>
                </div>
            </div>
            <div className={"d-flex " + (step == 2 ? '' : 'opacity-50')} style={{width: '20%'}}>
                <div className="pointer" onClick={() => goToStep(2)}>
                    <div className={"step " + ((step == 2 || step == 3 || step == 4) ? 'active' : '')}><span>3</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 3</span>
                    <span className="step-description">outras informações</span>
                </div>
            </div>
            <div className={"d-flex " + (step == 3 ? '' : 'opacity-50')} style={{width: '20%'}}>
                <div className="pointer" onClick={() => goToStep(3)}>
                    <div className={"step " + ((step == 3 || step == 4) ? 'active' : '')}><span>4</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 4</span>
                    <span className="step-description">parcelas pagas</span>
                </div>
            </div>
            <div className={"d-flex " + (step == 4 ? '' : 'opacity-50')} style={{width: '20%'}}>
                <div className="pointer" onClick={() => goToStep(4)}>
                    <div className={"step " + ((step == 4) ? 'active' : '')}><span>5</span></div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 5</span>
                    <span className="step-description">resultado do cálculo</span>
                </div>
            </div>
        </div>
        {/*
        <pre>
            {JSON.stringify(formik.values,null,'\t')}
            </pre>
        */}
  
        <div className={(step == 0 ? '' : 'd-none')}>
            <Step1 step={step} setStep={setStep} formik={formik} />
        </div>
        
       <div className={(step == 1 ? '' : 'd-none')}>
            <Step2 step={step} setStep={setStep} formik={formik} />
        </div>
       <div className={(step == 2 ? '' : 'd-none')}>
          <Step3 step={step} setStep={setStep} formik={formik} />
        </div>
       <div className={(step == 3 ? '' : 'd-none')}>
            <Step4 step={step} setStep={setStep} formik={formik} /> 
        </div>
       <div className={(step == 4 ? '' : 'd-none')}>
            <Resumo step={step} setStep={setStep} formik={formik} generateReportPdf={generateReportPdf} />
        </div>
        

        

    </BlockUi>
    );
}