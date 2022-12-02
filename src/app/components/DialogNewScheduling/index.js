import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewScheduling } from "../Forms/FormNewScheduling";
import * as yup from 'yup';
import {useFormik} from 'formik';

export default function DialogNewScheduling(props) {

    const dispatch = useDispatch();

    const open = props.open;
    const handleClose = props.handleClose;
    const dataToEdit = props.dataClientToEdit;

    const initialState = {
        client_client_id: "",
        day: {
            dateString: ""
        },
        horaSelecionada: {
            horario: ""
        },
        servico: ""
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

                        handleClose();
                    }
                }});
                
            } catch(e) {
                console.log(e);
            }
        },

        validationSchema: yup.object().shape({
			client_client_id: yup
			.number()
			.required("O campo cliente é obrigatório"),
            day: yup.object().shape({
                dateString: yup.string().required("Selecione a data do agendamento antes de continuar"),
            }),
            horaSelecionada: yup.object().shape({
                horario: yup.string().required("Selecione o horário do agendamento antes de continuar"),
            }),
            servico: yup.number().required("Selecione um cliente antes de continuar"),
            lado: yup
            .string()
            .when("dados_padelista", {
                is: true,
                then: yup.string().required("Selecione o lado que o padelista prefere jogar")
            }),
        }, ['dados_padelista'])
    });

    useEffect(() => {
        dispatch({type: 'LOAD_AVAILABLE_SCHEDULES', payload: {params: { data: formik.values.day.dateString}}});
    }, [formik.values.day]);

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Novo Agendamento</DialogTitle>
        <DialogContent>
            <FormNewScheduling formik={formik} />
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