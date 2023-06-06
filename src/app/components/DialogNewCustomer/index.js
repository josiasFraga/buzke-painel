import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewCustomer } from "../Forms/FormNewCustomer";
import * as yup from 'yup';
import {useFormik} from 'formik';

export default function DialogNewCustomer(props) {

    const dispatch = useDispatch();

    const open = props.open;
    const handleClose = props.handleClose;
    const dataToEdit = props.dataClientToEdit;

    const initialState = {
        nacionalidade: "Brasil",
        pais: "Brasil",
        telefone_ddi: "55",
        telefone: "",
        uf: "",
        localidade: "",
        bairro: "",
        nome: '',
        email_cliente: '',
        dados_padelista: false,
        sexo: "",
        endereco: "",
        n: "",
        cpf: "",
        cep: ""
    };

    const [initialValues, setInitialValues] = useState(initialState);

    useEffect(() => {
        if ( dataToEdit !== false ) {
            setInitialValues({
                id: dataToEdit.ClienteCliente.id,
                nacionalidade: dataToEdit.ClienteCliente.nacionalidade,
                pais: dataToEdit.ClienteCliente.pais,
                telefone_ddi: dataToEdit.ClienteCliente.telefone_ddi,
                telefone: dataToEdit.ClienteCliente.telefone,
                uf: dataToEdit.Uf.ufe_sg,
                localidade: dataToEdit.Localidade.loc_no,
                bairro: dataToEdit.ClienteCliente.bairro,
                nome: dataToEdit.ClienteCliente.nome,
                email_cliente: dataToEdit.ClienteCliente.email_cliente,
                dados_padelista: false,
                sexo: dataToEdit.ClienteCliente.sexo,
                endereco: dataToEdit.ClienteCliente.endereco,
                n: dataToEdit.ClienteCliente.n,
                cpf: dataToEdit.ClienteCliente.cpf,
                cep: dataToEdit.ClienteCliente.cep
            });
        } else {
            setInitialValues(initialState);
        }
    }, [dataToEdit]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting, resetForm}) => {

            try {
                dispatch({type: 'SAVE_CUSTOMER', payload: {
                    submitValues: {
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                        resetForm({
                            values: initialValues,
                        });

                        dispatch({
                            type: 'LOAD_ADDRESS_BY_POSTAL_CODE',
                            payload: null
                        });

                        dispatch({type: 'LOAD_CUSTOMERS', payload: {}});
                        dispatch({type: 'LOAD_CUSTOMERS_LIST'});

                        handleClose();
                    }
                }});
                
            } catch(e) {
                console.log(e);
            }
        },

        validationSchema: yup.object().shape({
			nome: yup
			.string()
			.required("O campo nome é obrigatório"),
            sexo: yup
            .string()
            .when("dados_padelista", {
                is: true,
                then: yup.string().required("Selecione o sexo do padelista")
            }),
            lado: yup
            .string()
            .when("dados_padelista", {
                is: true,
                then: yup.string().required("Selecione o lado que o padelista prefere jogar")
            }),
        }, ['dados_padelista'])
    });

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Novo Cliente</DialogTitle>
        <DialogContent>
            <FormNewCustomer formik={formik} />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancelar
        </Button>
        <Button onClick={formik.handleSubmit} color="primary">
            Cadastrar
        </Button>
        </DialogActions>
    </Dialog>)
}