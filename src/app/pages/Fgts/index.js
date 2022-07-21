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
import Upload from './components/Upload';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import styled from 'styled-components';
import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

const ReportDetails = styled.div`
margin-left: 10px;
padding-top: 16px;
`;

const ReportTitle = styled.p`
    font-size: 13px;
    color: #7D89AB;
    opacity: 0.8;
    font-weight: bold;
    margin-bottom: 0px;
`;
const ReportIcon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background-color: #7D89AB;
    text-align: center;

    i {
        color: #FFF !important;
        position: relative;
        top: calc(50% - 19px);
    }
`;

function TeseCalculo(props) {
    return (<>
        <label className="form-label">Tese de cálculo <span class="text-danger">&nbsp;*</span></label>
        <Select
            name="thesis"
            options={props.list_thesis}
            className={props.formik.errors.thesis && props.formik.touched.thesis ? 'is-invalid' : ''}
            onChange={(value) => props.chooseThesis(value)}
            value={props.formik.values.thesis}
            placeholder="Selecione a tese.."
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            noOptionsMessage={() => <span>Sem resultados.</span>}
        />
        {props.formik.errors.thesis && props.formik.touched.thesis && <label className="invalid-feedback">{props.formik.errors.thesis}</label>}  
    </>);
}

export function Fgts(props) {
    const dispatch = useDispatch();

    const subscription_status = useSelector(state => state.subscription.subscription_status);
    const isTrialing = (Object.keys(subscription_status).length > 0 && subscription_status.subscription_info && subscription_status.subscription_info == 'trialing');

    const [installmentCount, setInstallmentCount] = useState(1);
    const subheader = useSubheader();

    const calculation = useSelector(state => state.calculation.calculation);
    const calculation_loading = useSelector(state => state.calculation.calculation_loading);

    const initialItems = [
        {
            date: '',
            amount: 0,
        }
    ];
    const [items, setItems] = useState(initialItems);

    const indexes = useSelector(state => state.app.average_price_indexes);
    const jam_interests_options = [
        {id: '3', name: '3% a.a.'},
        {id: '4', name: '4% a.a.'},
        {id: '5', name: '5% a.a.'},
        {id: '6', name: '6% a.a.'},
    ];
    const list_thesis = [
        {id: 'deposit', name: 'Depósitos (Realiza a correção dos valores depositados)'},
        {id: 'jam', name: 'JAM (Realiza a correção monetária do JAM)'},
    ];

    const reportCorrection = useSelector(state => state.app.report_correction_fgts);

    const processed_pdf_data = useSelector(state => state.app.processed_pdf_data);
    const is_processing_pdf = useSelector(state => state.app.is_processing_pdf);
    const [until2013, setUntil2013] = useState(false);

    useEffect(() => {
        if (processed_pdf_data.length == 0) {
            setItems([{
                date: '',
                amount: 0,
            }]);
        } else {
            let _items_pdf = [];
            _items_pdf = processed_pdf_data.map(row => ({
                date: row.date,
                amount: row.amount,
            }));
            if (until2013) {
                setItems(_items_pdf.filter(item => parseISO(item.date) <= parseISO('2013-12-31')));
            } else {
                setItems(_items_pdf);
            }
        }
    }, [processed_pdf_data]);

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
        if (formik.values.files[0] !== undefined) {
            dispatch({type: 'FGTS_PROCESS', payload: { thesis: formik.values.thesis.id, file: formik.values.files[0].upload_data }})
        }    
    }, [until2013]);

    const formInitialValues = {
        index: null,
        files: [],
        end_date: format(new Date(), 'yyyy-MM-dd'),
        thesis: list_thesis[1],
        author: '',
        jam_interests: jam_interests_options[0]
    };

    const [initialValues, setInitialValues] = useState(formInitialValues);

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
                if (item.date == '') {
                    setSubmitting(false);
                    toast.error("Existe contribuições com a data em branco, revise e tente novamente.");
                    return;
                }
            }

            const submitValues = {jam_interests: values.jam_interests, author: values.author, thesis: values.thesis, end_date: values.end_date, index: values.index, items: items};

            dispatch({type: 'REPORT_CORRECTION_FGTS', payload: {
                ...submitValues,
                setSubmitting
            }});
        },
        validationSchema: yup.object().shape({
            index: yup.object().nullable().required('Escolha o índice para correção!'),
            end_date: yup.string().nullable().required('Digite a data do cálculo!'),
        })
    });

    useEffect(() => {
        if (!calculation.calculation) {
            setInitialValues(formInitialValues);
            setItems(initialItems);
            return;
        }

        setInitialValues({
            index: (calculation.calculation.index || null),
            files: [],
            end_date: format(new Date(), 'yyyy-MM-dd'),
            thesis: (calculation.calculation.thesis || formInitialValues.thesis),
            author: (calculation.calculation.author || ''),
            jam_interests: (calculation.calculation.jam_interests || formInitialValues.interests)
        });
        setItems(calculation.calculation.items || initialItems);
    }, [calculation]);


    const isThesisJamSelected = (formik.values.thesis && formik.values.thesis.id && formik.values.thesis.id == 'jam');

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
                    date: paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date != '' ? format(addMonths(parseISO(paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date), 1), 'yyyy-MM-dd') : '',
                    amount: paidInstallmentsTmp[paidInstallmentsTmp.length - 1].amount,
                });
            } else {
                paidInstallmentsTmp.push({
                    date: '',
                    amount: 0,
                });
            }

        }
        setItems(paidInstallmentsTmp);

        setInstallmentCount(1);
    }

    const chooseThesis = (value) => {
      formik.setFieldValue('thesis', value)

      if (value !== null && formik.values.files[0] !== undefined) {
          dispatch({type: 'FGTS_PROCESS', payload: { thesis: value.id, file: formik.values.files[0].upload_data }})
      }
    }

    return (
    <>
            <h1 className="azul-cabecalho">Correção do FGTS</h1>
            <p className="mb-10" style={{ fontSize: '15px', opacity: '0.6' }}>Realize cálculos da correção do FGTS facilmente.</p>

{ isTrialing &&
        <div class="alert alert-info" role="alert">
            No período de testes você tem direito a 2 cálculos! Aproveite!
        </div>
}

        <BlockUi tag="div" blocking={formik.isSubmitting || is_processing_pdf || calculation_loading}>
            <div className="row mb-10">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <div className="row mb-5">
                            <div className="col-xl-7 col-md-12">
                                <label className="form-label">Índice para corrigir os valores (recomendado INPC) <span class="text-danger">&nbsp;*</span></label>
                                <Select
                                    name="index"
                                    className={formik.errors.index && formik.touched.index ? 'is-invalid' : ''}
                                    options={indexes}
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
                        </div>
						<div className="row mb-5">
							<div className="col-xl-7 col-md-12">
								<label className="form-label">Nome do autor da ação</label>
	                            <input
	                                className={"form-control"}
	                                type="text"
	                                value={formik.values.author}
	                                name="author"
	                                onChange={formik.handleChange}
	                            />
							</div>
						</div>
                        <div className="row mb-5">
                            <div className="col-xl-4 col-md-12">
                                <label className="form-label">Data do cálculo <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    className={"form-control " + (formik.errors.end_date && formik.touched.end_date ? 'is-invalid' : '')}
                                    type="date"
                                    max="2999-12-31"
                                    value={formik.values.end_date}
                                    name="end_date"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.end_date && formik.touched.end_date && <label className="invalid-feedback">{formik.errors.end_date}</label>}
                            </div>
                            <div className="col-xl-3 col-md-12">
                            <FormControlLabel
                                style={{margin: '23px 0px 0px -11px'}}
                                onChange={() => setUntil2013(!until2013)}
                                control={
                                    <Checkbox
                                        checked={until2013}
                                        color="default"
                                        value="checkedG"
                                        inputProps={{
                                        "aria-label": "checkbox with default color"
                                        }}
                                />
                                }
                                label={"Importar dados apenas até 2013"}
                            />

                            </div>

                        </div>
                        <div className="row mb-5">
                        { isThesisJamSelected &&
                        <>
                            <div className="col-xl-4 col-md-12">
                                <TeseCalculo formik={formik} list_thesis={list_thesis} chooseThesis={chooseThesis} />
                            </div>
                            <div className="col-xl-3 col-md-12">
                                <label className="form-label">Juros da conta <span class="text-danger">&nbsp;*</span></label>

                                <Select
                                    name="jam_interests"
                                    className={formik.errors.jam_interests && formik.touched.jam_interests ? 'is-invalid' : ''}
                                    options={jam_interests_options}
                                    onChange={(value) => formik.setFieldValue('jam_interests', value)}
                                    value={formik.values.jam_interests}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={false}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {formik.errors.jam_interests && formik.touched.jam_interests && <label className="invalid-feedback">{formik.errors.jam_interests}</label>}
                                <small className="text-muted form-text">Verifique no extrato do FGTS a taxa de juros da conta. Dica: O mais comum é 3% a.a.</small>
                            </div>
                        </>
                        }
                        {!isThesisJamSelected &&
                        <div className="col-xl-7 col-md-12">
                            <TeseCalculo formik={formik} list_thesis={list_thesis} chooseThesis={chooseThesis} />
                        </div>
                        }
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-7">
                                <Upload formik={formik} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-10">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <h3 className="azul-cabecalho mb-10">Detalhamento das contribuições</h3>
                        <div key={items} style={{maxHeight: '600px', overflowY: 'scroll', overflowX: 'hidden'}}>
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
                            <div className="col-xl-3">
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

                        </div>
                    )}
                    </div>
                    <div className="hr mb-5"></div>
                    <div className="row">
                        <div className="col-xl-6">
                            <button type="button" className="btn btn-secondary mb-10" style={{width: '230px'}} onClick={addInstallment}>+ INCLUIR CONTRIBUIÇÃO</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <button type="button" className="btn btn-primary mb-10" style={{width: '230px'}} onClick={formik.handleSubmit}>CALCULAR</button>
            {Object.keys(reportCorrection).length > 0 &&
            <>

                <a href={reportCorrection.pdf_filename} target="_BLANK">

                <div className="d-flex mb-10">
                <ReportIcon>
                    <i className="icon-2x text-dark-50 flaticon2-percentage"></i>
                </ReportIcon>
                <ReportDetails className="d-flex flex-column">
                    <ReportTitle>DOWNLOAD CÁLCULO COMPLETO</ReportTitle>
                </ReportDetails>

                </div>
                </a>


                <a href="https://peticoes.s3.us-east-2.amazonaws.com/fgts/Modelo+Inicial+FGTS+Jusfy.docx" target="_BLANK">
                <div className="d-flex mb-10">
                <ReportIcon>
                    <i className="icon-2x text-dark-50 flaticon2-document"></i>
                </ReportIcon>
                <ReportDetails className="d-flex flex-column">
                    <ReportTitle>DOWNLOAD PETIÇÃO INICIAL FGTS</ReportTitle>
                </ReportDetails>

                </div>
                </a>
                </>
                }
        </BlockUi>
    </>
    );
}
