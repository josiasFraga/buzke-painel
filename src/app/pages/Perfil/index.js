import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import * as auth from "../../modules/Auth/_redux/authRedux";
import BlockUi from 'react-block-ui';
import MeusDados from './components/MeusDados';
import Tabs from './components/Tabs';
import AlterarSenha from './components/AlterarSenha';
import Financeiro from './components/Financeiro';
import CartoesCredito from './components/CartoesCredito';

export function Perfil() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const [tab, setTab] = useState('profile_info');

    const subheader = useSubheader();
    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Meu Perfil',
                title: 'Meu Perfil',
                href: ''
            }
        ])
    }, []);

    useEffect(() => {
        dispatch({type: 'LOAD_STATES'});
        dispatch({type: 'LOAD_PROFESSIONS'});
        //dispatch({type: 'LOAD_CARDS'});
    }, []);

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
        manage_url: '',
        password: '',
        confirmation_password: ''
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            dispatch({
                type: 'SAVE_PROFILE',
                payload: {
                    values: values,
                    callback: () => {
                        setSubmitting(false);
                        dispatch(auth.actions.requestUser());
                        formik.setFieldValue('password', '');
                        formik.setFieldValue('confirmation_password', '');
                   },
                }
            }); 
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('O campo nome é obrigatório!'),
            oab: yup.string().when('profession', {
                is: (value) => JSON.stringify(value) === JSON.stringify({id: 1, name: 'Advogado'}),
                then: yup.string().required('O campo Nº da OAB é obrigatório!')
            }),
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
            confirmation_password: yup.string().oneOf([yup.ref('password'), null], 'As senhas não coincidem!').when('password', {
                is: (value) => (typeof value === 'string' && value !== ''),
                then: yup.string().required('Digite a confirmação da senha!')
            })
        })
    });

    useEffect(() => {
        if (Object.keys(user).length == 0) {
            return true;
        }
        setInitialValues({
            name: user.nome,
            email: user.email,
            document_number: user.document_number,
            phone: user.phone,
            profession: user._profession_data,
            oab: user.oab,
            address: user.address,
            state: user._state_data,
            city: user._city_data,
            postal_code: user.postal_code,
            district: user.district,
            oab_state: user._oab_state_data,
            manage_url: user.manage_url,
            password: '',
            confirmation_password: ''
        });
    }, [user]);

    useEffect(() => {
        dispatch(auth.actions.requestUser());
    }, []);

    return (
        <BlockUi tag="div" blocking={formik.isSubmitting}>
            <h1 className="azul-cabecalho">Perfil</h1>
            <p className="mb-10" style={{ fontSize: '15px', opacity: '0.6' }}>Atualize seus dados</p>
            <div className="card card-custom">
                <div className="card-header card-header-tabs-line nav-tabs-line-3x">
                    <div className="card-toolbar">
                        <Tabs tab={tab} setTab={setTab} />
                    </div>
                </div>
            
                <div className="card-body">
                { tab === 'profile_info' &&
                    <MeusDados formik={formik} />
                }
                { tab === 'financial' &&
                    <Financeiro formik={formik} />
                }
                { tab === 'change_password' &&
                    <AlterarSenha formik={formik} />
                }
                { tab === 'credit_cards' &&
                    <CartoesCredito />
                }
                </div>
            </div>
        </BlockUi>
    );
}
