import React, { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { GlobalStyle, Container, Header, Logo, Content, SearchBar, Footer } from './styles';
import ResponsiveMenu from './components/Navbar/ResponsiveMenu';
import ModalDeslogado from './components/ModalDeslogado';
import ModalLogin from './components/ModalLogin';
import ModalProdutos from './components/ModalProdutos';
import ModalProduto from './components/ModalProduto';
import ModalCheckout from './components/ModalCheckout';
import ModalCheckoutRetorno from './components/ModalCheckoutRetorno';
import BlockUi from 'react-block-ui';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';

export default function Jusfinder() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const { isAuthorized } = useSelector(
        ({ auth }) => ({
          isAuthorized: auth.user != null,
        }),
        shallowEqual
    );

    const [modalOpen, setModalOpen] = useState('');
    const is_query_validating_document = useSelector(state => state.app.is_query_validating_document);

    const formik = useFormik({
        initialValues: {
            document: '',
            product_selected: null,

            cardholder_name: '',
            card_number: '',
            card_payment_method: null,
            card_installments: null,
            card_cvv: '',
            card_expiration: '',
        },
        onSubmit: (values, {setSubmitting}) => {
//            alert(JSON.stringify(values, null, 2));

            console.log('Criando token..')
            
            window.Mercadopago.createToken({
                docType: "CPF",
                docNumber: user.document_number.replace(/\D/g, ''),
                cardholderName: values.cardholder_name,
                cardExpirationMonth: parseInt(values.card_expiration.split('/')[0].trim()),
                cardExpirationYear: parseInt(values.card_expiration.split('/')[1].trim()),
                securityCode: parseInt(values.card_cvv),
                cardNumber: values.card_number,
            }, (status, response) => {
                window.Mercadopago.clearSession();

                console.log('retorno do token');
                console.log(status)
                console.log(response)
                if (status == 200) {
                    dispatch({type: "QUERY_CHECKOUT", payload: {
                        values: {
                            product_selected: values.product_selected,
                            document: values.document,
                            token_id: response.id,
                            card_payment_method_id: values.card_payment_method.id
                        },
                        onResponse: () => {
                            setModalOpen('checkout_retorno');
                        },
                        setSubmitting
                    }});
                } else {
                    setSubmitting(false);
                    toast.error('Ocorreu um erro ao validar o seu cartão, verifique e tente novamente.');
                    return false;
                }
            });
        },
        validationSchema: yup.object().shape({
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
        })
    });

    const openModal = (modal) => {
        setModalOpen('modal');
    }

    const search = () => {
        if (formik.values.document.trim() == '') {
            toast.warn("Por favor, digite o número do documento.");
            return;
        }
        formik.setFieldValue('product_selected', null);

        dispatch({
            type: "QUERY_VALIDATE_DOCUMENT",
            payload: {
                document: formik.values.document,
                callback: () => {
                    setModalOpen('produtos');
                }
            }
        });
    }

    const chooseProduct = (product) => {
        formik.setFieldValue('product_selected', product);
        setModalOpen('produto');
    }

    const checkout = (free = '') => {
        if (isAuthorized) {
            if (free == 'free') {
                if (window.confirm("Deseja realmente utilizar seus créditos?")) {
                    formik.setSubmitting(true);
                    dispatch({type: "QUERY_CHECKOUT", payload: {
                        values: {
                            product_selected: formik.values.product_selected,
                            document: formik.values.document,
                        },
                        onResponse: () => {
                            setModalOpen('checkout_retorno');
                        },
                        setSubmitting: (val) => formik.setSubmitting(val)
                    }});
                }
            } else {
                setModalOpen('checkout');
            }
        } else {
            setModalOpen('deslogado');
        }
    }

    const setIdentificationTypes = (identification_types) => {
        formik.setFieldValue('identification_types', identification_types);
    }

    useEffect(() => {

        window.Mercadopago.getPaymentMethods((status, result) => console.log(result));
            window.Mercadopago.getIdentificationTypes((status, result) => {
                setIdentificationTypes(result);
                //alert(JSON.stringify(result))
            });
    }, []);

    const login = () => {
        setModalOpen('login');
    }

    return (
        <>
            <GlobalStyle />
            <ModalDeslogado
                isOpen={(modalOpen == 'deslogado')}
                openModalLogin={() => setModalOpen('login')}
                close={() => setModalOpen('')}
            />
            <ModalLogin
                isOpen={(modalOpen == 'login')}
                setIsOpen={() => setModalOpen('login')}
                formik={formik}
                close={() => setModalOpen('')}
                checkout={() => setModalOpen('checkout')}
            />
            <ModalProdutos
                chooseProduct={chooseProduct}
                formik={formik}
                isOpen={(modalOpen == 'produtos')}
                close={() => setModalOpen('')}
            />
            <ModalProduto
                checkout={checkout}
                back={() => setModalOpen('produtos')}
                formik={formik}
                isOpen={(modalOpen == 'produto')}
                close={() => setModalOpen('')}
            />
            <ModalCheckout
                close={() => setModalOpen('')}
                back={() => setModalOpen('produto')}
                formik={formik}
                isOpen={(modalOpen == 'checkout')}
            />
            <ModalCheckoutRetorno
                close={() => setModalOpen('')}
                formik={formik}
                isOpen={(modalOpen == 'checkout_retorno')}
            />
            
            <Container className="container">
                <Header className="row">
                    <Logo>
                        <a href="https://jusfy.com.br" target="_BLANK"><img src={toAbsoluteUrl("/media/logo-jusfinder.svg")} /></a>
                    </Logo>
                    <ResponsiveMenu login={login} />
                </Header>
            </Container>

            <Container className="container">

                <Content className="row">
                    <h2>Revolucionamos a forma como <b>advogados</b> fazem buscas na internet</h2>
                    <p>Digite um CPF, CNPJ ou placa de veículo, e a ferramenta vai buscar correspondências em todos os bancos de dados jurídicos do território nacional</p>
                    <BlockUi tag="div" blocking={is_query_validating_document}>
                        <SearchBar>
                            <InputMask
                                name="document"
                                type="text"
                                mask="***************"
                                maxlength
                                maskChar={null}
                                className="form-control"
                                placeholder="Digite por CPF, CNPJ ou placa do veículo"
                                onChange={formik.handleChange}
                                value={formik.values.document}
                            />
                            <button type="button" onClick={search}>Buscar</button>
                        </SearchBar>
                    </BlockUi>          
                </Content>
            </Container>

            <Container className="container">
                <Footer>
                    <p>Powered by</p>
                    <img src={toAbsoluteUrl("/media/logo-jusfy.svg")} />
                </Footer>
            </Container>
        </>
    ); 
}