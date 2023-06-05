import React, { useState, useEffect, useRef } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { format, addMonths, parseISO, formatDuration, eachMonthOfInterval, startOfMonth } from 'date-fns';
import CurrencyInput from 'react-currency-input';
import Select from 'react-select';
import BlockUi from 'react-block-ui';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Upload from './components/Upload';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import styled from 'styled-components';
import FloatToCurrency from '../../helpers/FloatToCurrency';
import humanizeDuration from 'humanize-duration';
import RadioButtonGroup from './components/RadioButtonGroup';
import SVG from "react-inlinesvg";
import Steps from './components/Steps';
import FormVinculo from './components/FormVinculo';
import Atividades from './components/Atividades';
import Contribuicoes from './components/Contribuicoes';
import Relatorios from './components/Relatorios';
import { cpfMask } from '../../../_metronic/_helpers/MasksHelper';

const CnisBox = styled.div`
    input[type=file] {
        display: none;
    }
`;
export function Telas(props) {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const [items, setItems] = useState([]);
    const [isFormVinculoOpen, setIsFormVinculoOpen] = useState(false);
    const [vinculo, setVinculo] = useState({});
    const [screen, setScreen] = useState('atividades');
    const [contribuicoesVinculoId, setContribuicoesVinculoId] = useState(null);

    const inputFile = useRef(null);
    const atividadesRef = useRef(null);
 
    const chooseFile = () => {
        inputFile.current.click();
    }

    const onChooseFile = (evt) => {
        dispatch({type: 'CNIS_PROCESS', payload: { file: evt.currentTarget.files[0] } });
    }

    const calculation = useSelector(state => state.calculation.calculation);
    const calculation_loading = useSelector(state => state.calculation.calculation_loading);
    const goToStep = async (target_step) => {
       

        setStep(target_step);
    }

    const processed_cnis_data = useSelector(state => state.app.processed_cnis_data);

    const scrollInfoSegurado = () => {
        const id = 'info-segurado';
        const yOffset = -140; 
        const element = document.getElementById(id);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
    }
    
    const validateForm = async () => {
        const validation = await formik.validateForm();
        formik.setTouched(validation);
    }

    useEffect(() => {
        if (Object.keys(processed_cnis_data).length > 0) {
            setTimeout(() => {
                scrollInfoSegurado();
                validateForm();
            }, 700);
        }
    }, [processed_cnis_data]);
    
    const is_processing_pdf = useSelector(state => state.app.is_processing_pdf);
    const report_prev = useSelector(state => state.app.report_prev);
    const is_report_prev_loading = useSelector(state => state.app.is_report_prev_loading);

    const prevProcess = () => {
        dispatch({type: 'CNIS_PROCESS', payload: { file: formik.values.files[0] }});
    }

    useEffect(() => {
        //document.body.classList.add("aside-minimize");
        //document.getElementsByClassName('novo-calculo')[0].classList.add('hidden');

        dispatch({type: 'LOAD_MINIMUM_WAGES'});
        dispatch({type: 'LOAD_INSS_TETOS'});

        dispatch({
            type: 'LOAD_CALCULATION',
            payload: {
                id: props.match.params.calculo_id || ''
            }
        });
    }, []);




    const formInitialValues = {
        files: [],
        vinculos: [],
        nome: '',
        data_nascimento: '',
        cpf: '',
        sexo: '',
        uploaded_url: ''
    };

    const [initialValues, setInitialValues] = useState(formInitialValues);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            let error = false;

            values.vinculos.map(vinculo => {
                if (vinculo.start_date === '' || vinculo.end_date === '') {
                    error = 'DATAS_VINCULOS';
                    return;
                }
            });

            if (error === 'DATAS_VINCULOS') {
                toast.error('Confira as datas dos vínculos, há datas em branco.');
                return;
            }

            dispatch({type: 'REPORT_PREV', payload: {
                values,
                setSubmitting
            }});
        },
        validationSchema: yup.object().shape({
            nome: yup.string().nullable().required('Digite o nome do segurado!'),
            cpf: yup.string().nullable().required('Digite o CPF!'),
            data_nascimento: yup.string().nullable().required('Digite a data de nascimento!'),
            sexo: yup.string().nullable().required('Escolha o sexo!'),
        })
    });

    useEffect(() => {
        if (Object.keys(processed_cnis_data).length == 0) {
            return;
        }
    
        let vinculos = [];

        for (const vinculo of processed_cnis_data.vinculos) {
            let contribuicoes = [];

            for (const contribuicao of vinculo.remuneracoes) {
                contribuicoes.push({
                    competencia: contribuicao.competencia,
                    contribuicao: contribuicao.remuneracao,
                    id: Math.random().toString(16).slice(-8),
                });
            }

            vinculos.push({
                id: Math.random().toString(16).slice(-8),
                company_name: vinculo.nome,
                start_date: vinculo.dataInicio,
                end_date: (vinculo.dataFim == null ? '' : vinculo.dataFim),
                activity_type: {id: 'NORMAL', name: 'NORMAL'},
                contribuicoes: contribuicoes
            });
        }

        formik.setFieldValue('vinculos', vinculos);
        formik.setFieldValue('nome', processed_cnis_data.nome);
        formik.setFieldValue('cpf', processed_cnis_data.cpf);
        formik.setFieldValue('data_nascimento', processed_cnis_data.data_nascimento);
        formik.setFieldValue('uploaded_url', processed_cnis_data.uploaded_url);
    }, [processed_cnis_data]);

    useEffect(() => {
        if (Object.keys(report_prev).length > 0) {
            setStep(1);
        }
    }, [report_prev]);

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


    const openFormVinculo = (row) => {
        setVinculo(row);
        setIsFormVinculoOpen(true);
    }

    const hideFormVinculo = () => {
        setIsFormVinculoOpen(false);
    }

    const salvarVinculo = (vinculo) => {
        if (vinculo.dataInicio == '' || vinculo.dataFim == '') {
            toast.warning('Preencha as datas de início e fim do vínculo!');
            return;
        }
        let tmpVinculos = _.cloneDeep(formik.values.vinculos);

        if (vinculo.id) {
            let vinculoEditar = _.cloneDeep(vinculo);
            let vinculoIndex = tmpVinculos.findIndex(row => row.id == vinculoEditar.id);

            let dataInicio = vinculoEditar.start_date;
            let dataFim = vinculoEditar.end_date;
            console.log(tmpVinculos[vinculoIndex].contribuicoes);

            let contribuicoes = _.cloneDeep(tmpVinculos[vinculoIndex].contribuicoes).filter(contribuicao => 
                parseISO(contribuicao.competencia) >= startOfMonth(parseISO(dataInicio))
                && parseISO(contribuicao.competencia) <= parseISO(dataFim)
            );

            let competenciasDatas = contribuicoes.map(remuneracao => remuneracao.competencia);

            let mesesCompetencia = eachMonthOfInterval({
                start: parseISO(dataInicio),
                end: parseISO(dataFim)
            }).map(mes => format(mes, 'yyyy-MM-dd'));

            const mesesAdicionarVinculo = _.difference(mesesCompetencia, competenciasDatas);
            for (const mesAdicionar of mesesAdicionarVinculo) {
                contribuicoes.push({
                    competencia: mesAdicionar,
                    contribuicao: 0,
                    id: Math.random().toString(16).slice(-8),
                });
            }

            contribuicoes.sort(function compare(a, b) {
                var dateA = new Date(a.competencia);
                var dateB = new Date(b.competencia);
                return dateA - dateB;
            });

            vinculoEditar.contribuicoes = contribuicoes;

            tmpVinculos[vinculoIndex] = vinculoEditar;
        } else {
            let remuneracoes = [];
            let dataInicio = vinculo.start_date;
            let dataFim = vinculo.end_date || format(new Date(), 'yyyy-MM-dd');
            let mesesCompetencia = eachMonthOfInterval({
                start: parseISO(dataInicio),
                end: parseISO(dataFim)
            }).map(mes => format(mes, 'yyyy-MM-dd'));

            const mesesAdicionarVinculo = mesesCompetencia;
            for (const mesAdicionar of mesesAdicionarVinculo) {
                remuneracoes.push({
                    competencia: mesAdicionar,
                    contribuicao: 0,
                    id: Math.random().toString(16).slice(-8),
                });
            }

            remuneracoes.sort(function compare(a, b) {
                var dateA = new Date(a.competencia);
                var dateB = new Date(b.competencia);
                return dateA - dateB;
            });

            tmpVinculos.push({
                id: Math.random().toString(16).slice(-8),
                company_name: vinculo.company_name,
                start_date: vinculo.start_date,
                end_date: vinculo.end_date,
                activity_type: {id: 'NORMAL', name: 'NORMAL'},
                contribuicoes: remuneracoes 
            });
        }
    
        formik.setFieldValue('vinculos', tmpVinculos);
        setIsFormVinculoOpen(false);
    }

    const removerVinculo = (row) => {
        if (!window.confirm("Deseja realmente remover este vínculo?")) {
            return false;
        }

        let tmpVinculos = _.cloneDeep(formik.values.vinculos);
        console.log(tmpVinculos);
        console.log(row.id);
        tmpVinculos.splice(tmpVinculos.findIndex(vinculo => vinculo.id == row.id), 1);

        formik.setFieldValue('vinculos', tmpVinculos);
    }

    const openContribuicoes = (row) => {
        setContribuicoesVinculoId(row.id);
        setScreen('contribuicoes');
    }

    const openAtividades = () => {
        setScreen('atividades');
    }

    const calcular = () => {
        formik.handleSubmit();
    }

    const back = () => {
        setStep(0);
    }


    useEffect(() => {
        if (!calculation.calculation) {
            setInitialValues(formInitialValues);
            return;
        }

        setInitialValues({
            files: [],
            vinculos: (calculation.calculation.vinculos || []),
            nome: (calculation.calculation.nome || ''),
            data_nascimento: (calculation.calculation.data_nascimento || ''),
            cpf: (calculation.calculation.cpf || ''),
            sexo: (calculation.calculation.sexo || ''),
            uploaded_url: (calculation.calculation.uploaded_url || ''),
        });
    }, [calculation]);

    return (
        <BlockUi tag="div" blocking={is_processing_pdf || is_report_prev_loading}>
            <FormVinculo
                show={isFormVinculoOpen}
                hide={hideFormVinculo}
                vinculo={vinculo}
                salvarVinculo={salvarVinculo}
            />

          
    { step == 0 &&
        <Upload formik={formik} onChooseFile={onChooseFile} />
    }

    <div className="row mb-3" id="info-segurado">
                <div className="col-xl-3">
                    <label className="form-label">SEGURADO</label>
                    <input
                        className={"form-control " + (formik.errors.nome && formik.touched.nome ? 'is-invalid' : '')}
                        name="nome"
                        value={formik.values.nome}
                        onChange={formik.handleChange}
                        readOnly={(step != 0)}
                    />
                    {formik.errors.nome && formik.touched.nome && <label className="invalid-feedback">{formik.errors.nome}</label>}
                </div>
                <div className="col-xl-3">
                    <label className="form-label">CPF</label>
                    <input
                        className={"form-control " + (formik.errors.cpf && formik.touched.cpf ? 'is-invalid' : '')}
                        name="cpf"
                        onChange={(evt) => formik.setFieldValue('cpf', cpfMask(evt.target.value))}
                        value={formik.values.cpf}
                        readOnly={(step != 0)}
                    />
                    {formik.errors.cpf && formik.touched.cpf && <label className="invalid-feedback">{formik.errors.cpf}</label>}

                </div>
                <div className="col-xl-3">
                    <label className="form-label">NASCIMENTO</label>
                    <input
                        className={"form-control " + (formik.errors.data_nascimento && formik.touched.data_nascimento ? 'is-invalid' : '')}
                        name="data_nascimento"
                        type="date"
                        max="2999-12-31"
                        value={formik.values.data_nascimento}
                        onChange={formik.handleChange}
                        readOnly={(step != 0)}
                    />
                    {formik.errors.data_nascimento && formik.touched.data_nascimento && <label className="invalid-feedback">{formik.errors.data_nascimento}</label>}
                </div>
                <div className="col-xl-3 d-flex flex-column">
                    <label className="form-label">SEXO</label>
                    <RadioButtonGroup
                        invalid={formik.errors.sexo && formik.touched.sexo}
                        readOnly={(step != 0)}
                        options={[
                            {key: 'M', value: 'MASCULINO'},
                            {key: 'F', value: 'FEMININO'},
                        ]}
                        value={formik.values.sexo}
                        onClick={(value) => formik.setFieldValue('sexo', value)}
                    />
                    {formik.errors.sexo && formik.touched.sexo && <label style={{color: '#F64E60', fontSize: '0.9rem', marginTop: '0.25rem', width: '100%', display: 'block'}}>{formik.errors.sexo}</label>}
                </div>
        </div>


    { step == 0 &&
        <>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '40px'}}>
                { screen == 'atividades' &&
                    <Atividades
                        formik={formik}
                        openFormVinculo={openFormVinculo}
                        openContribuicoes={openContribuicoes}
                        removerVinculo={removerVinculo}
                        calcular={calcular}
                    />
                }

                { screen == 'contribuicoes' &&
                    <Contribuicoes
                        key={formik.values}
                        formik={formik}
                        contribuicoesVinculoId={contribuicoesVinculoId}
                        back={openAtividades}
                    />
                }
                </div>
                
            </div>
        </div>
        </>
    }

    { step == 1 &&
        <Relatorios back={back} />
    }

    </BlockUi>
    );
}