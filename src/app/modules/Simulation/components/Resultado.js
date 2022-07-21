import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import { Modal } from "react-bootstrap";
import Select from 'react-select';
import * as yup from 'yup';
import {useFormik} from 'formik';
import { useHistory } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import { phoneMask } from '../../../../_metronic/_helpers/MasksHelper';
import styled from 'styled-components';
import { Checkbox } from "@material-ui/core";

const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ModalTermsConditions = styled(Modal)`
    .modal-body {
        padding: 40px !important;

        span.modal-title { font-size: 41px; letter-spacing: -0.01em; color: #091740; margin-bottom: 20px; display: block; text-align: center; margin-top: 10px;}
        p { font-size: 13px; letter-spacing: -0.01em; color: #091740; opacity: 0.6; margin-bottom: 6px; }
        ul li { font-size: 13px; letter-spacing: -0.01em; color: #091740; opacity: 0.6; margin-bottom: 6px; }
        h4 { font-weight: bold; font-size: 60px; text-align: center; }
        img { display: block; margin: 0 auto; text-align: center; width: 50%; margin-top: -20px; }
        small { display: block; text-align: center; padding: 0px 50px; opacity: 0.5; font-size: 1rem}
        button { border-radius: 3px; font-weight: bold; background: #41C78F; box-shadow: 0px 14px 15px rgba(92,199,143,0.31); border:none; padding: 13px 50px; margin:0 auto; display:block; margin-top: 33px; color:#fff; font-size: 17px; margin-bottom: 20px; }
        button:hover { background: #349f72; -moz-transition:all .2s;-webkit-transition:all .2s;-o-transition:all .2s; }
        button img { width: 20px; margin: 0; display: inline-block; margin-left: 20px; margin-top: -3px;}
    }

    

    .modal-dialog {
        max-width: 800px !important;
    }

    .modal-content {
        border-radius: 10px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }

        .modal-body {
            span.modal-title { font-size: 32px; }
        }
    }

    button.close { position: absolute; right: -15px; top: -15px; background: #349f72; opacity: 1; padding: 10px 14px; color:#fff; text-shadow: none; box-shadow: 0px 14px 15px rgba(92,199,143,0.31); z-index: 2; border-radius: 20px; }
`;


const floatToCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value)
}

export default function Resultado(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const states = useSelector(state => state.app.states);
    const cities = useSelector(state => state.app.cities);
    const contract_types = useSelector(state => state.app.contract_types);
    const contract_type_name = contract_types.filter(contract_type => contract_type.code == props.formik.values.contract_type)[0]?.name;
    const [isModalResultOpen, setIsModalResultOpen] = useState(false);
    const [isModalLookupOpen, setIsModalLookupOpen] = useState(false);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const is_simulation_loading = useSelector(state => state.app.is_simulation_loading);
    const simulation_result = useSelector(state => state.app.simulation_result);
    const [isModalTermsConditionsOpen, setIsModalTermsConditionsOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    const back = () => {
        props.setStep(7);
        props.setScreen('steps');
    }

    const loadCidades = (state) => {
        dispatch({type: 'LOAD_CITIES', payload: {state: state}});
    }

    useEffect(() => {
        dispatch({type: 'LOAD_STATES'});
    }, []);

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const simulate = () => {
        dispatch({
            type: 'LOAD_SIMULATION',
            payload: {
                values: props.formik.values,
                callback: () => {
                    setIsModalResultOpen(true);
                }
            }
        });
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            state: null,
            city: null
        },
        onSubmit: (values, {setSubmitting}) => {
            if (!termsAccepted) {
                alert('É necessário aceitar os termos para prosseguir.');
                return;
            }
            dispatch({type: 'SAVE_OPPORTUNITY', payload: {
                submitValues: {
                    ...values,
                    ...props.formik.values,
                    name: values.name
                },
                setSubmitting,
                callback: () => {
                    setIsModalLookupOpen(false);
                    setIsModalSuccessOpen(true);
                }
            }});
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Preencha o seu nome!'),
            email: yup.string().required('Preencha o seu e-mail!'),
            phone: yup.string().required('Preencha o seu telefone!'),
            state: yup.object().nullable().required('Escolha o seu estado!'),
            city: yup.object().nullable().required('Escolha a sua cidade!'),
        })
    });

    const lookupLawyer = () => {
        formik.setFieldValue('name', props.formik.values.name);
        setIsModalResultOpen(false);
        setIsModalLookupOpen(true); 
    }

    const closeModalSuccess = () => {
        setIsModalSuccessOpen(false);
        history.go(0);
    }

    return ( 
	    <div className="content-resultado">
            <div className="container">
                <h2>Confirme seus dados</h2>
                <p>Confira abaixo se os dados inseridos estão corretos.</p>

                <div className="row">
                    <div className="col">
                        <span>Tipo de Contrato:</span>
                        <p>{contract_type_name}</p>

                        <span>Valor do Contrato:</span>
                        <p>R$ {floatToCurrency(props.formik.values.contract_amount)}</p>
                    </div>

                    <div className="col">
                        <span>Tipo de pessoa:</span>
                        <p>{props.formik.values.person_type}</p>

                        <span>Contrato assinado em:</span>
                        <p>{months[parseInt(props.formik.values.contract_date_month)-1] + '/' + props.formik.values.contract_date_year}</p>
                    </div>

                    <div className="col">
                        <span>Número de parcelas:</span>
                        <p>{props.formik.values.installments_count} parcelas</p>

                        <span>Valor 1ª parcela:</span>
                        <p>R$ {floatToCurrency(props.formik.values.first_installment_amount)}</p>
                    </div>
                </div>
                <button type="button" className="btn-cinza" style={{marginRight: '15px'}} onClick={back}>Voltar</button>
                <button type="button" onClick={simulate}>Simular agora</button>
                
                <Modal id="modalSimulationResult" modalOptions={{dismissible: false}} show={isModalResultOpen} centered>
                    <Modal.Body>
                        <ButtonClose onClick={() => setIsModalResultOpen(false)}>X</ButtonClose>

                        <span style={{fontWeight: 'bold'}}>Resultado</span>
                        { simulation_result.odds == 7 && <p>Seu contrato está abaixo da média de juros praticadas pelo mercado. A possibilidade de revisão é <strong>baixa</strong>, porém aconselhamos a conversar <strong>gratuitamente</strong> com um de nossos especialistas.</p> }
                        { simulation_result.odds == 25 && <p>Seu contrato está um pouco acima da média de juros praticadas pelo mercado. A possibilidade de revisão é <strong>baixa</strong>, porém aconselhamos a conversar <strong>gratuitamente</strong> com um de nossos especialistas.</p> }
                        { simulation_result.odds == 50 && <p>Seu contrato está acima da média de juros praticadas pelo mercado. A possibilidade de revisão é <strong>média</strong>, por favor, solicite o contato <strong>gratuito</strong> de um de nossos especialistas.</p> }
                        { simulation_result.odds == 87 && <p>Seu contrato está acima da média de juros praticadas pelo mercado. A possibilidade de revisão é <strong>alta</strong>, por favor, solicite o contato <strong>gratuito</strong> de um de nossos especialistas.</p> }
                        { simulation_result.odds == 93 && <p>Seu contrato está muito acima da média de juros praticadas pelo mercado. A possibilidade de revisão é <strong>alta</strong>, por favor, solicite o contato <strong>gratuito</strong> de um de nossos especialistas.</p> }
                        


					    <h4>{is_simulation_loading ? `carregando..` : `${simulation_result.odds}%`}</h4>
                        { simulation_result.odds == 7 && <img src={toAbsoluteUrl("/media/svg/icons/R1.svg")} /> }
                        { simulation_result.odds == 25 && <img src={toAbsoluteUrl("/media/svg/icons/R2.svg")} /> }
                        { simulation_result.odds == 50 && <img src={toAbsoluteUrl("/media/svg/icons/R4.svg")} /> }
                        { simulation_result.odds == 87 && <img src={toAbsoluteUrl("/media/svg/icons/R5.svg")} /> }
                        { simulation_result.odds == 93 && <img src={toAbsoluteUrl("/media/svg/icons/R6.svg")} /> }

					    <small>Tx. juros contratada: <strong>{simulation_result.original_interest_rate}%</strong>, Tx. juros média: <strong>{simulation_result.avg_interest_rate}%</strong> - Probabilidade de êxito da ação: {simulation_result.odds}%.</small>

					    <button type="button" onClick={lookupLawyer}>Solicitar advogado <img src={toAbsoluteUrl("/media/svg/icons/Navigation/ArrowRight.svg")} /></button>
                    </Modal.Body>
                </Modal>

                
                <Modal id="modalSimulationLookup" modalOptions={{dismissible: false}} show={isModalLookupOpen} centered>
                    <Modal.Body>
                        <BlockUi tag="div" isBlocking={formik.isSubmitting}>
                            <ButtonClose onClick={() => setIsModalLookupOpen(false)}>X</ButtonClose>

                            <span className="modal-title" style={{fontWeight: 'bold'}}>Falta pouco...</span>
                            <p>Por favor, preencha os dados abaixo, para solicitar o contato <strong>gratuito</strong> de um advogado. Em breve, alguém entrará em contato.</p>

                            <div className="row mb-5">
                                <div className="col-xl-12">
                                    <input
                                        name="name"
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.name}
                                        className={"form-control " + (formik.errors.name && formik.touched.name ? 'is-invalid' : '')}
                                        placeholder="Digite seu nome"
                                    />
                                    {formik.errors.name && formik.touched.name && <label className="invalid-feedback">{formik.errors.name}</label>}
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-xl-12">
                                    <input
                                        name="email"
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.email}
                                        className={"form-control " + (formik.errors.email && formik.touched.email ? 'is-invalid' : '')}
                                        placeholder="Digite seu melhor e-mail"
                                    />
                                    {formik.errors.email && formik.touched.email && <label className="invalid-feedback">{formik.errors.email}</label>}
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-xl-12">
                                    <input
                                        name="phone"
                                        type="text"
                                        value={formik.values.phone}
                                        className={"form-control " + (formik.errors.phone && formik.touched.phone ? 'is-invalid' : '')}
                                        placeholder="Digite seu telefone"
                                        onChange={(evt) => formik.setFieldValue('phone', phoneMask(evt.target.value))}
                                    />
                                    {formik.errors.phone && formik.touched.phone && <label className="invalid-feedback">{formik.errors.phone}</label>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6 mb-5">
                                    <Select 
                                        name="state"
                                        isSearchable={true}
                                        isClearable={true}
                                        options={states}
                                        className={formik.errors.state && formik.touched.state ? 'is-invalid' : ''}
                                        onChange={(value) => {
                                            formik.setFieldValue('state', value);
                                            
                                            if (value) {
                                                loadCidades(value.state);
                                            } else {
                                                formik.setFieldValue('city', null);
                                                loadCidades('');
                                            }
                                            
                                        }}
                                        value={formik.values.state}
                                        placeholder="Selecione o estado.."
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.state}
                                        noOptionsMessage={() => <span>Sem resultados.</span>}
                                    />
                                    {formik.errors.state && formik.touched.state && <label className="invalid-feedback">{formik.errors.state}</label>}
                                </div>
                                <div className="col-xl-6 mb-5">
                                    <Select 
                                        name="city"
                                        isSearchable={true}
                                        isClearable={true}
                                        options={cities}
                                        className={formik.errors.city && formik.touched.city ? 'is-invalid' : ''}
                                        onChange={(value) => formik.setFieldValue('city', value)}
                                        value={formik.values.city}
                                        placeholder="Selecione a cidade.."
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        noOptionsMessage={() => <span>Sem resultados.</span>}
                                    />
                                    {formik.errors.city && formik.touched.city && <label className="invalid-feedback">{formik.errors.city}</label>}
                                </div>
                            </div>

                            <p className="small">
                                <Checkbox
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    value="checkedA"
                                    color="primary"
                                    style={{padding: '0px 5px 0px 0px'}}
                                    inputProps={{
                                        "aria-label": "primary checkbox"
                                    }}
                                />
                                <a href="#" onClick={() => setIsModalTermsConditionsOpen(true)}> Aceito os <strong>termos e condições</strong></a>
                            </p>

                            <button type="button" onClick={formik.handleSubmit}>Solicitar advogado <img src={toAbsoluteUrl("/media/svg/icons/Navigation/ArrowRight.svg")} /></button>
                        </BlockUi>
                    </Modal.Body>
                </Modal>


                <ModalTermsConditions modalOptions={{dismissible: false}} show={isModalTermsConditionsOpen} centered>
                    <Modal.Body>
                        <ButtonClose onClick={() => setIsModalTermsConditionsOpen(false)}>X</ButtonClose>

                        <span className="modal-title" style={{fontWeight: 'bold'}}>Termos e condições</span>
                        <p>Eu declaro que, em conformidade com o artigo 7° da Lei Geral de Proteção de Dados (Lei 13.709/2018), a partir da presente data, autorizo a JUSFY SERVIÇOS DE INTERNET LTDA. a compartilhar os dados pessoais por mim fornecidos no presente portal eletrônico, com advogados e escritórios de advocacia devidamente cadastrados, desde que garantido o devido sigilo, com a finalidade exclusiva de realização de procedimentos preliminares indispensáveis a possível pactuação de contrato de serviços advocatícios, pelo prazo de 60 dias.</p>
                        <p>Portanto, declaro meu consentimento ao tratamento dos meus dados pessoais nos termos expostos, bem como a minha ciência acerca dos meus direitos contidos no artigo 18 da Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
                        <p>Ainda, conforme o artigo 9° da Lei Geral de Proteção de Dados (Lei 13.709/2018), declaro ciência de todos os meus direitos como titular dos dados pessoais que serão tratados pelo JUSFY SERVIÇOS DE INTERNET LTDA. e demais cadastrados, explícitos no artigo 18 da respectiva Lei, quais sejam,</p>
                        <ul>
                            <li>Poder confirmar a existência de tratamento sobre os meus dados;</li>
                            <li>acesso aos meus dados;</li>
                            <li>correção de possíveis dados incompletos, inexatos ou desatualizados;</li>
                            <li>anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a finalidade informada;</li>
                            <li>portabilidade dos meus dados a outro fornecedor de serviço ou produto, mediante minha requisição expressa, de acordo com a regulamentação da autoridade nacional;</li>
                            <li>eliminação dos dados pessoais tratados com o meu consentimento,</li>
                            <li>informação das entidades públicas e privadas com as quais a JUSFY realizou o compartilhamento dos meus </li>
                            <li>dados;</li>
                            <li>informação sobre a possibilidade de não fornecer consentimento e quais as consequências da negativa;</li>
                            <li>revogação do meu consentimento</li>
                        </ul>
                        <p>Portanto, declaro meu consentimento ao tratamento dos meus dados pessoais nos termos expostos, bem como a minha ciência acerca dos meus direitos contidos no artigo 18 da Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
                    </Modal.Body>
                </ModalTermsConditions>

                <Modal id="modalSuccess" show={isModalSuccessOpen} onHide={closeModalSuccess} centered>
                    <button type="button" className="close" onClick={closeModalSuccess}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <Modal.Body>
                        <img src={toAbsoluteUrl("/media/svg/icon-success.svg")} />

                        <span className="modal-title">Sucesso!</span>
					    <p>Obrigado! Sua solicitação foi recebida e em breve um advogado entrará em contato com você.</p>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}