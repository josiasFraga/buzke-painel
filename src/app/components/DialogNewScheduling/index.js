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
    const dataToView = props.dataToView;
    const loadSchedules = props.loadSchedules;
    const data = useSelector(state => state.app.scheduling_data);

    const initialState = {
        client_client_id: "",
        day: {
            dateString: ""
        },
        horaSelecionada: {
            horario: "",
            duracao: ""
        },
        servico: "",
        fixo: "false",
    };

    const [initialValues, setInitialValues] = useState(initialState);

    useEffect(() => {

        if ( dataToView != null ) {
            dispatch({type: 'LOAD_SCHEDULING_DATA', payload: {params: {
                agendamento_id: dataToView.id,
                horario: dataToView.horario
            }}});

        }

    }, [dataToView]);

    useEffect(() => {

        if ( data && data.Agendamento ) {
            const newInitialValues = {
                id: data.Agendamento.id,
                client_client_id: data.Agendamento.cliente_cliente_id,
                day: {
                    dateString: data.Agendamento.horario.split(" ")[0]
                },
                horaSelecionada: {
                    horario: data.Agendamento.horario.split(" ")[1],
                    duracao: data.Agendamento.duracao
                },
                servico: data.Agendamento.servico_id,
                fixo: data.Agendamento.tipo == "fixo" ? "true" : "false",
            };

            setInitialValues(newInitialValues);
        } else {
            setInitialValues(initialState);

        }

    }, [data]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting, resetForm}) => {

            try {
                dispatch({type: 'SAVE_SCHEDULING', payload: {
                    submitValues: {
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                        resetForm({
                            values: initialValues,
                        });

                        loadSchedules();

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
        })
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
            Fechar
        </Button>
        <Button onClick={formik.handleSubmit} disabled={formik.values.id} color="primary">
            Cadastrar
        </Button>
        </DialogActions>
    </Dialog>)
}