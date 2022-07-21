import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { format, addMonths, parseISO } from 'date-fns';
import CurrencyInput from 'react-currency-input';
import Select from 'react-select';
import BlockUi from 'react-block-ui';
import { toast } from 'react-toastify';
import _ from 'lodash';

import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";

import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

export function Atualizacao(props) {
    const dispatch = useDispatch();
    const installmentTypes = [
        {id: '0', name: 'Parcela de Débito'},
        {id: '1', name: 'Abatimento / Pagamento'}
    ];
    const calculation = useSelector(state => state.calculation.calculation);

    const calculation_loading = useSelector(state => state.calculation.calculation_loading);
    const [installmentCount, setInstallmentCount] = useState(1);
    const subheader = useSubheader();

    const formInitialValues = {
        name: '',
        index: null,
        interest_rate: 0,
        interest_rate_period: {id: 'monthly', name: 'Mensal'},
        fine: 0,
        legal_fees: 0,
        legal_fees_type: null,
        items_count: 0,
        pro_rata: true,
        pro_rata_interest: false,
        end_date: format(new Date(), 'yyyy-MM-dd')
    };

    const [initialValues, setInitialValues] = useState(formInitialValues);

    const changeInstallmentCount = (value) => {
        setInstallmentCount(value);
    }

    const initialItems = [
        {
            description: 'Parcela 1',
            date: '',
            amount: 0,
            debt: installmentTypes[0]
        }
    ];
    const [items, setItems] = useState(initialItems);

    const indexes = useSelector(state => state.app.average_price_indexes);

    const reportCorrection = useSelector(state => state.app.report_correction);

    useEffect(() => {
        dispatch({type: 'LOAD_INDEXES'});
        subheader.setBreadcrumbs([
            {
                text: 'Juscalc Simples',
                title: 'Juscalc Simples',
                href: ''
            }
        ])

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
            setItems(initialItems);
            return;
        }

        setInitialValues({
            name: (calculation.calculation.name || ''),
            index: (calculation.calculation.index || null),
            interest_rate: (calculation.calculation.interest_rate || 0),
            interest_rate_period: (calculation.calculation.interest_rate_period || formInitialValues.interest_rate_period),
            fine: (calculation.calculation.fine || 0),
            legal_fees: (calculation.calculation.legal_fees || 0),
            legal_fees_type: (calculation.calculation.legal_fees_type || null),
            items_count: 0,
            pro_rata: (calculation.calculation.pro_rata || true),
            pro_rata_interest: (calculation.calculation.legal_fees_type || false),
            end_date: format(new Date(), 'yyyy-MM-dd')
        });

        setItems(calculation.calculation.items || initialItems);
    }, [calculation]);


    useEffect(() => {
        formik.setFieldValue('items_count', items.length);
    }, [items]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            if (items.length == 0) {
                toast.error("Adicione no mínimo um item para atualização!");
                setSubmitting(false);
                return;
            }

            for (let item of items) {
                if (item.date == '' || item.amount == '' || item.amount == 0) {
                    setSubmitting(false);
                    toast.error("Existe itens com campos em branco, revise e tente novamente.");
                    return;
                }
            }

            const submitValues = {...values, items: items};

            dispatch({type: 'REPORT_CORRECTION', payload: {
                ...submitValues,
                setSubmitting
            }});
        },
        validationSchema: yup.object().shape({
            index: yup.object().nullable().required('Escolha o índice para correção!'),
            /*items_count: yup.number().required('Digite a quantidade de itens!').test(
                'positive',
                'Digite a quantidade de itens!',
                (value) => value > 0
            ),*/
            interest_rate_period: yup.object().nullable().when('interest_rate', {
                is: (value) => value > 0,
                then: yup.object().nullable().required('Escolha a periodicidade!')
            }),
            legal_fees_type: yup.object().nullable().when('legal_fees', {
                is: (value) => value > 0,
                then: yup.object().nullable().required('Escolha o tipo do valor!')
            }),
        })
    });

    const getPaidInstallments = () => {
        return _.cloneDeep(items);
    }

    const setInstallmentFieldValue = (key, field, value) => {
        let paidInstallmentsTmp = getPaidInstallments();
        paidInstallmentsTmp[key][field] = value;
        setItems(paidInstallmentsTmp);
    }

    const removeItem = (index) => {
        let paidInstallmentsTmp = getPaidInstallments();
        paidInstallmentsTmp.splice(index, 1);
        setItems(paidInstallmentsTmp);
    }

    const addInstallment = () => {
        let _installmentCount = installmentCount;
        if (_installmentCount == '' || _installmentCount <= 0) {
            _installmentCount = 1;
        }

        let paidInstallmentsTmp = getPaidInstallments();

        for (let i = 1; i <= _installmentCount; i++) {
            if (paidInstallmentsTmp[paidInstallmentsTmp.length - 1]) {
                paidInstallmentsTmp.push({
                    description: 'Parcela ' + (paidInstallmentsTmp.length+1),
                    date: paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date != '' ? format(addMonths(parseISO(paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date), 1), 'yyyy-MM-dd') : '',
                    amount: paidInstallmentsTmp[paidInstallmentsTmp.length - 1].amount,
                    debt: installmentTypes[0]
                });
            } else {
                paidInstallmentsTmp.push({
                    description: 'Parcela 1',
                    date: '',
                    amount: 0,
                    debt: installmentTypes[0]
                });
            }

        }
        setItems(paidInstallmentsTmp);

        setInstallmentCount(1);
    }

    return (
    <>
        <h1 className="azul-cabecalho mb-8">Atualização de valores</h1>
        <BlockUi tag="div" blocking={formik.isSubmitting || calculation_loading}>
            <div className="row mb-10">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <div className="row mb-5">
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Nome do cálculo</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    placeholder="Digite um nome para identificar o cálculo"
                                />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Índice para corrigir os valores <span class="text-danger">&nbsp;*</span></label>
                                <Select 
                                    name="index"
                                    className={formik.errors.index && formik.touched.index ? 'is-invalid' : ''}
                                    options={[
                                        {
                                            bacen_code: null,
                                            id: null,
                                            name: 'NENHUM'
                                        },
                                        ...indexes
                                    ]}
                                    onChange={(value) => formik.setFieldValue('index', value)}
                                    value={formik.values.index}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {formik.errors.index && formik.touched.index && <label className="invalid-feedback">{formik.errors.index}</label>}
                            </div>
                            <div className="col-xl-4 col-md-12" style={{paddingTop: '25px'}}>
                                <label className="form-label">&nbsp;</label>
                                <FormControlLabel
                                    onChange={() => formik.setFieldValue('pro_rata', !formik.values.pro_rata)}
                                    control={
                                        <Checkbox
                                            color="default"
                                            value="checkedG"
                                            inputProps={{
                                            "aria-label": "checkbox with default color"
                                            }}
                                            checked={formik.values.pro_rata}
                                    />
                                    }
                                    label="Correção pró-rata"
                                />
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-2 col-md-12">
                                <label className="form-label">Taxa de juros (%)</label>
                                <CurrencyInput
                                    className="form-control"
                                    value={formik.values.interest_rate}
                                    prefix=""
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => formik.setFieldValue('interest_rate', floatvalue)}
                                />
                            </div>
                            <div className="col-xl-2 col-md-12">
                                <label className="form-label">Periodicidade</label>
                                <Select
                                    name="interest_rate_period"
                                    className={formik.errors.interest_rate_period && formik.touched.interest_rate_period ? 'is-invalid' : ''}
                                    isSearchable={false}
                                    isClearable={false}
                                    options={[{id: 'monthly', name: 'Mensal'}, {id: 'annually', name: 'Anual'}]}
                                    onChange={(value) => {
                                        formik.setFieldValue('interest_rate_period', value);
                                    }}
                                    value={formik.values.interest_rate_period}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                    checked={formik.values.pro_rata_interest}
                                />
                                {formik.errors.interest_rate_period && formik.touched.interest_rate_period && <label className="invalid-feedback">{formik.errors.interest_rate_period}</label>}

                            </div>
                            <div className="col-xl-4 col-md-12" style={{paddingTop: '25px'}}>
                                <label className="form-label">&nbsp;</label>
                                <FormControlLabel
                                    onChange={() => formik.setFieldValue('pro_rata_interest', !formik.values.pro_rata_interest)}
                                    control={
                                        <Checkbox
                                            color="default"
                                            value="checkedG"
                                            inputProps={{
                                            "aria-label": "checkbox with default color"
                                            }}
                                    />
                                    }
                                    label="Correção pró-rata"
                                />
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-2 col-md-12">
                                <label className="form-label">Multa (%)</label>
                                <CurrencyInput
                                    className="form-control"
                                    value={formik.values.fine}
                                    prefix=""
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => formik.setFieldValue('fine', floatvalue)}
                                />
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-2 col-md-12">
                                <label className="form-label">Valor dos honorários</label>
                                <CurrencyInput
                                    className="form-control"
                                    value={formik.values.legal_fees}
                                    prefix=""
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => formik.setFieldValue('legal_fees', floatvalue)}
                                /> 
                            </div>
                            <div className="col-xl-2 col-md-12">
                                <label className="form-label">Tipo de Aplicação</label>
                                <Select
                                    name="legal_fees_type"
                                    isSearchable={false}
                                    className={formik.errors.legal_fees_type && formik.touched.legal_fees_type ? 'is-invalid' : ''}
                                    isClearable={false}
                                    options={[{id: 'percentage', name: 'Percentual (%)'}, {id: 'fixed', name: 'Fixo (R$)'}]}
                                    onChange={(value) => {
                                        formik.setFieldValue('legal_fees_type', value);
                                    }}
                                    value={formik.values.legal_fees_type}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {formik.errors.legal_fees_type && formik.touched.legal_fees_type && <label className="invalid-feedback">{formik.errors.legal_fees_type}</label>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row mb-10">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <h3 className="azul-cabecalho mb-10">Detalhamento dos itens</h3>
                        <div key={items}>
                    { items.map((installment, key) => 
                        <div key={key} className="row mb-5">

                            <div className="col-xl-1">
                                <div className="form-group">
                                    <label className="form-label">Item nº</label>
                                    <div className="input-remover-container">
                                        <div className="icon-remover pointer" onClick={() => removeItem(key)}><span>&times;</span></div>
                                        <input className="form-control input-parcela" value={(key+1)} disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="form-group">
                                    <label className="form-label">Descrição do item</label>
                                    <input
                                        type="text"
                                        maxlength="18"
                                        className="form-control"
                                        placeholder="Ex.: Aluguel, reforma.."
                                        onBlur={(evt) => setInstallmentFieldValue(key, 'description', evt.target.value)}
                                        defaultValue={installment.description}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="form-group">
                                    <label className="form-label">Data da época <span class="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="date"
                                        max="2999-12-31"
                                        className="form-control"
                                        onBlur={(evt) => setInstallmentFieldValue(key, 'date', evt.target.value)}
                                        defaultValue={installment.date}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="form-group">
                                    <label className="form-label">Digite o valor <span class="text-danger">&nbsp;*</span></label>
                                    <CurrencyInput
                                        name="amount"
                                        className="form-control"
                                        value={installment.amount}
                                        prefix="R$ "
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => setInstallmentFieldValue(key, 'amount', floatvalue)}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="form-group">
                                    <label className="form-label">A que se refere esta parcela? <span class="text-danger">&nbsp;*</span></label>
                                    <Select
                                        isSearchable={false}
                                        isClearable={false}
                                        options={installmentTypes}
                                        onChange={(value) => {
                                            setInstallmentFieldValue(key, 'debt', value);                                 
                                        }}
                                        defaultValue={installmentTypes[0]}
                                        placeholder="Selecione.."
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        noOptionsMessage={() => <span>Sem resultados.</span>}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                    <div className="hr mb-5"></div>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                style={{display: 'inline-block', width: '60px', marginLeft: '10px'}}
                                value={installmentCount}
                                onChange={(e) => changeInstallmentCount(e.target.value)}
                                onClick={(evt) => evt.currentTarget.select()}
                            />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-secondary mb-10" style={{width: '230px'}} onClick={addInstallment}>ADICIONAR PARCELA(S)</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>

            <button type="button" className="btn btn-primary mb-10" style={{width: '230px'}} onClick={formik.handleSubmit}>CALCULAR</button>

            
            {Object.keys(reportCorrection).length > 0 &&
                <div className="d-flex mb-10" style={{cursor: 'pointer'}} onClick={() => window.open(reportCorrection.pdf_filename)}>
                    <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                        <i className="flaticon2-protected"></i>
                        <span className="pulse-ring"></span>
                    </a>
                    <span className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Seu relatório está disponível para download, clique aqui.</span>
                </div>
                }
        </BlockUi>
    </>
    );
}