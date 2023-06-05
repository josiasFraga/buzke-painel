import React, {useState, useEffect} from 'react';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import {useFormik} from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "react-bootstrap";
import pagarme from 'pagarme/browser'
import { toast } from 'react-toastify';
import Step1 from './Steps/Step1';

export default function AdminClientes(props) {
    const history = useHistory();
    const [step, setStep] = useState(0);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

    const dispatch = useDispatch();

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
    });

    useEffect(() => {
        dispatch({type: 'LOAD_STATES'});
        dispatch({type: 'LOAD_PROFESSIONS'});
    }, []);

    const step1Validation = yup.object().shape({
        name: yup.string().required('O campo nome é obrigatório!'),
        oab: yup.string().when('profession', {
            is: (value) => JSON.stringify(value) === JSON.stringify({id: 1, name: 'Advogado'}),
            then: yup.string().required('O campo Nº da OAB é obrigatório!')
        }),
        email: yup.string().required('O campo e-mail é obrigatório!'),
        address: yup.string().required('O campo endereço é obrigatório!'),
        phone: yup.string().required('O campo telefone é obrigatório!'),
        city: yup.object().nullable().required('O campo cidade é obrigatório!'),
        state: yup.object().nullable().required('O campo estado é obrigatório!'),
        oab_state: yup.object().nullable().when('profession', {
            is: (value) => JSON.stringify(value) === JSON.stringify({id: 1, name: 'Advogado'}),
            then: yup.object().nullable().required('O campo estado é obrigatório!')
        }),
        profession: yup.object().nullable().required('O campo profissão é obrigatório!'),
        document_number: yup.string().required('O campo CPF é obrigatório!'),
        postal_code: yup.string().required('O campo CEP é obrigatório!'),
        district: yup.string().required('O campo bairro é obrigatório!'),
        password: yup.string().required('O campo senha é obrigatório!'),
        confirmation_password: yup.string().oneOf([yup.ref('password'), null], 'As senhas não coincidem!').required('O campo confirmação é obrigatório!')
    });


    const schemaArray = [step1Validation];
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting,resetForm}) => {

            dispatch({
                type: 'ADMIN_SAVE_USER',
                payload: {
                    submitValues: values,
                    setSubmitting,
                    callback: () => {
                        toast.success('Cliente salvo com sucesso!');
                        resetForm();
                    }
                }
            });
        },
        validationSchema: schemaArray[step]
    });

    return (
        <Step1 step={step} setStep={setStep} formik={formik} />
    );
}
