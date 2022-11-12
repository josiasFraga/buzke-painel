import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import ChoosePlan from './components/ChoosePlan';
import Checkout from './components/Checkout';
import Success from './components/Success';
import * as yup from 'yup';
import { useFormik } from 'formik';
import pagarme from 'pagarme/browser'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    FormHelperText,
    Switch
  } from "@material-ui/core";
const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;
    z-index: 9999;
    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-content {
        border-radius: 10px !important;
        max-height: 90vh;
    }

    .modal-dialog {
        max-width: 700px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }
`;

export default function ModalSubscriptionReached(props) {
    const [screen, setScreen] = useState('choose_plan');
    const modalInfo = useSelector(state => state.app.modal_subscription);

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            product_selected: null,
            cardholder_name: '',
            card_number: '',
            card_payment_method: null,
            card_cvv: '',
            card_expiration: '',
            card_selected: null
        },
        onSubmit: (values, {setSubmitting}) => {
            if (values.card_selected === null) {
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
                    console.log(card_hash)
                    dispatch({type: "CREATE_SUBSCRIPTION", payload: {
                        values: {
                            ...values,
                            card_hash: card_hash
                        },
                        callback: () => {
                            setScreen('success');
                        },
                        setSubmitting
                    }});
                });
            } else {
                dispatch({type: "CREATE_SUBSCRIPTION", payload: {
                    values: {
                        ...values
                    },
                    callback: () => {
                        setScreen('success');
                    },
                    setSubmitting
                }});

            }
        },
        validationSchema: yup.object().shape({
            cardholder_name: yup.string().when("card_selected", {
                is: null,
                then: yup.string()
                    .required('O nome do titular do cartão é obrigatório.')
            }),
            card_number: yup.string().when("card_selected", {
                is: null,
                then: yup.string()
                    .required('O número do cartão é obrigatório.')
                    .test("isValidCardNumber", "Número do cartão inválido.", function(value) {
                        const { card_payment_method } = this.parent;
                        return (value && value.length === 19 && card_payment_method !== null);
                    }),
            }),
            card_expiration: yup.string().when("card_selected", {
                is: null,
                then: yup.string()
                    .required('O mês/ano de expiração do cartão é obrigatório.')
                    .test("isValidExpiration", "O vencimento é inválido.", function(value) {
                        return (value && /^(0[1-9]|1[012]) [/] 20\d{2}/.test(value));  
                    }),
            }),
            card_cvv: yup.string().when("card_selected", {
                is: null,
                then: yup.string()
                    .required('O código de segurança (CVV) do cartão é obrigatório.')
                    .test("isValidCVV", "Número do CVV inválido.", function(value) {
                        return (value && /^[0-9]{3,4}$/.test(value));  
                    }),
            }),
        })
    });

    useEffect(() => {
        if (formik.values.product_selected !== null) {
            setScreen('checkout');
        }
    }, [formik.values.product_selected]);

    useEffect(() => {
        //dispatch({type: 'LOAD_CARDS'});
    }, []);
    const closeModal = () => {
        setScreen('choose_plan');
        //dispatch({type: 'LOAD_SUBSCRIPTION_STATUS'});
        dispatch({type: 'CLOSE_MODAL_SUBSCRIPTION'});
    }

    return (
        <ResponsiveModal
            show={modalInfo.visible}
            onHide={closeModal}
            centered
            backdrop="static"
            keyboard={false}
        >
            <ButtonClose onClick={closeModal}>X</ButtonClose>

            <Modal.Body>

            {screen == 'choose_plan' &&
                <ChoosePlan
                    screen={screen}
                    setScreen={setScreen}
                    formik={formik}
                    title={modalInfo.title}
                    subtitle={modalInfo.subtitle}
                />
            }
            {screen == 'checkout' &&
                <Checkout
                    screen={screen}
                    setScreen={setScreen}
                    formik={formik}
                    back={() => setScreen('choose_plan')}
                />
            }
            { screen == 'success' &&
                <Success
                    screen={screen}
                    setScreen={setScreen}

                />
            }
            </Modal.Body>
        </ResponsiveModal>
    ); 
}