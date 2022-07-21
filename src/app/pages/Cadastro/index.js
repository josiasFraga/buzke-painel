import React, {useState, useEffect} from 'react';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { Link, useHistory, useLocation } from 'react-router-dom';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import * as yup from 'yup';
import {useFormik} from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "react-bootstrap";
import pagarme from 'pagarme/browser'
import { toast } from 'react-toastify';
import queryString from 'query-string';

export default function Register(props) {
    const history = useHistory();
    const [step, setStep] = useState(0);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

    const dispatch = useDispatch();
    const plans = [
        { id: 'starter', internal_id: 'starter', name: 'STARTER', amount: '59,90', type: 'monthly' },
        { id: 'master', internal_id: 'master', name: 'MASTER', amount: '79,90', type: 'monthly' },
        { id: 'ultimate', internal_id: 'ultimate', name: 'ULTIMATE', amount: '97,00', type: 'monthly' },
        { id: 'starter-anual', internal_id: 'starter', name: 'STARTER', amount: '575,04', type: 'annually' },
        { id: 'master-anual', internal_id: 'master', name: 'MASTER', amount: '767,04', type: 'annually' },
        { id: 'ultimate-anual', internal_id: 'ultimate', name: 'ULTIMATE', amount: '931,20', type: 'annually' },
    ];
    const location = useLocation();
    const [periodicity, setPeriodicity] = useState('monthly');

    const [initialValues, setInitialValues] = useState({
        oab: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        city: null,
        state: null,
        oab_state: null,
        profession: null,
        document_number: '',
        postal_code: '',
        district: '',
        password: '',
        confirmation_password: '',
        coupom: '',
        plan: plans.find(plan => plan.id == 'starter'),
        cardholder_name: '',
        card_number: '',
        card_payment_method: null,
        card_cvv: '',
        card_expiration: '',
    });

     
    const step1Validation = yup.object().shape({
        name: yup.string().required('O campo nome é obrigatório!'),
        oab: yup.string().when('profession', {
            is: (value) => JSON.stringify(value) === JSON.stringify({id: 1, name: 'Advogado'}),
            then: yup.string().required('O campo Nº da OAB é obrigatório!')
        }),
        email: yup.string().required('O campo e-mail é obrigatório!'),
        address: yup.string().required('O campo endereço é obrigatório!'),
        phone: yup.string()
            .required('O campo telefone é obrigatório!')
            .matches(
                /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
                'Telefone inválido.'
            ),
        city: yup.object().nullable().required('O campo cidade é obrigatório!'),
        state: yup.object().nullable().required('O campo estado é obrigatório!'),
        oab_state: yup.object().nullable().when('profession', {
            is: (value) => JSON.stringify(value) === JSON.stringify({id: 1, name: 'Advogado'}),
            then: yup.object().nullable().required('O campo estado é obrigatório!')
        }),
        profession: yup.object().nullable().required('O campo profissão é obrigatório!'),
        document_number: yup.string().required('O campo CPF é obrigatório!'),
        postal_code: yup.string()
            .required('O campo CEP é obrigatório!')
            .matches(
                /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/,
                'CEP inválido.'
            ),

        district: yup.string().required('O campo bairro é obrigatório!'),
        password: yup.string().required('O campo senha é obrigatório!'),
        confirmation_password: yup.string().oneOf([yup.ref('password'), null], 'As senhas não coincidem!').required('O campo confirmação é obrigatório!')
    });
    const step2Validation = yup.object().shape({
        plan: yup.object().nullable().required('Escolha o plano!'),
        cardholder_name: yup.string().required('O nome do titular do cartão é obrigatório.'),
        card_number: yup.string()
            .required('O número do cartão é obrigatório.')
            .test("isValidCardNumber", "Número do cartão inválido.", function(value) {
                const { card_payment_method } = this.parent;
                return (value && value.length === 19 && card_payment_method !== null);
            }),
        card_expiration: yup.string()
            .required('O mês/ano de expiração do cartão é obrigatório.')
            .test("isValidExpiration", "O vencimento é inválido.", function(value) {
                return (value && /^(0[1-9]|1[012]) [/] 20\d{2}/.test(value));  
            }),
        card_cvv: yup.string()
            .required('O código de segurança (CVV) do cartão é obrigatório.')
            .test("isValidCVV", "Número do CVV inválido.", function(value) {
                return (value && /^[0-9]{3,4}$/.test(value));  
            }),
    });

    const schemaArray = [step1Validation, step2Validation];
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            var card = {}
            card.card_holder_name = values.cardholder_name
            card.card_expiration_date = values.card_expiration.substr(0,2)+'/'+values.card_expiration.substr(values.card_expiration.length - 2)
            card.card_number = values.card_number
            card.card_cvv = values.card_cvv
            var cardValidations = pagarme.validate({card: card})

            if (!cardValidations.card.card_holder_name) {
                setSubmitting(false);
                toast.error('Verifique o nome impresso no cartão.');
                return false;
            }
            if (!cardValidations.card.card_number) {
                setSubmitting(false);
                toast.error('Verifique o número do cartão.');
                return false;
            }
            if (!cardValidations.card.card_expiration_date) {
                setSubmitting(false);
                toast.error('Verifique a data de expiração do cartão.');
                return false;
            }
            if (!cardValidations.card.card_cvv) {
                setSubmitting(false);
                toast.error('Verifique o código de segurança (CVV) do cartão.');
                return false;
            }
            
            //Mas caso esteja tudo certo, você pode seguir o fluxo
            pagarme.client.connect({ encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY })
            .then(client => client.security.encrypt(card))
            .then(card_hash => {
                let submitValues = {
                    ...values,
                    card_hash: card_hash
                };

                let urlParams = queryString.parse(props.location.search);
                submitValues.urlParams = urlParams;

                dispatch({
                    type: 'SAVE_USER',
                    payload: {
                        submitValues,
                        setSubmitting,
                        callback: () => {
                            setIsModalSuccessOpen(true);
                        }
                    }
                });
            });
        },
        validationSchema: schemaArray[step]
    });

    const closeModalSuccess = () => {
        setIsModalSuccessOpen(false);

        if (props.match.params.redirect && props.match.params.redirect == 'jusfinder') {
            window.location = 'https://jusfinder.com.br';
        } else {
            history.push('/');
        }
    }

    useEffect(() => {
        dispatch({type: 'LOAD_STATES'});
        dispatch({type: 'LOAD_PROFESSIONS'});

        const plan = new URLSearchParams(location.search).get("plan");

        if (plan) {
            const plan_choosed = plans.find(planRow => planRow.id == plan);
            if (plan_choosed) {
                formik.setFieldValue('plan', plan_choosed);
                setPeriodicity(plan_choosed.type);
            }
        }

        if (props.match.params.redirect) {
            formik.setFieldValue('coupom', props.match.params.redirect);
            dispatch({type: 'LOAD_COUPOM', payload: { coupom: props.match.params.redirect }})
        }
    }, []);

    const getCoupom = () => {
        dispatch({type: 'LOAD_COUPOM', payload: { coupom: formik.values.coupom }})
    }

    const switchMonthly = () => {
        formik.setFieldValue('plan', plans.find(plan => plan.internal_id == formik.values.plan.internal_id && plan.type == 'monthly'));
    }

    const switchAnnual = () => {
        formik.setFieldValue('plan', plans.find(plan => plan.internal_id == formik.values.plan.internal_id && plan.type == 'annually'));
    }

    return (<>
        <div className="register pt-15">
            <div className="container">
                <div className="row mb-10">
                    <div className="col-xl-12 d-flex align-items-center">
                        <div className="logo flex-grow-1">
                            <img src={toAbsoluteUrl("/media/svg/logos/logo-jusfy.svg")} />
                        </div>

                        <div className="menu">
                            <a href="https://jusfy.com.br"><span className="mr-10 font-size-h6">SOBRE</span></a>
                            <Link to="/"><button className="btn btn-primary">ENTRAR</button></Link>
                        </div>
                    </div>
                </div>
                {step == 0 && <Step1
                    step={step}
                    setStep={setStep}
                    formik={formik}
                    getCoupom={getCoupom}
                />}
                {step == 1 && <Step2 plans={plans} switchMonthly={switchMonthly} switchAnnual={switchAnnual} periodicity={periodicity} setPeriodicity={setPeriodicity} step={step} setStep={setStep} formik={formik} />}
            </div>
        </div>
        <Modal id="modalRegisterSuccess" show={isModalSuccessOpen} modalOptions={{dismissible: false}} centered>
            <Modal.Body>
                <img src={toAbsoluteUrl("/media/svg/icon-success.svg")} />

                <span className="modal-title">Verifique seu e-mail!</span>
                <p>Seu cadastro foi realizado com sucesso, agora só falta você confirmar o nosso e-mail.</p>
                <p style={{marginTop: '5px'}}>Seu e-mail é: <strong>{formik.values.email}</strong>.</p>
                <p style={{marginTop: '5px'}}>Caso você não localize, verifique na caixa de spam.</p>
                <button type="button" onClick={closeModalSuccess}>Entrar na plataforma <img src={toAbsoluteUrl("/media/svg/icons/Navigation/ArrowRight.svg")} /></button>
            </Modal.Body>
        </Modal> 
    </>);
}