import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewScheduling } from "../Forms/FormNewScheduling";
import DialogCancelConfirm from "../DialogConfirm";
import DialogCancelFixedConfirm from "../DialogConfirm/cancel_scheduling";
import * as yup from 'yup';
import {useFormik} from 'formik';
import { useHistory } from "react-router-dom";

export default function DialogNewScheduling(props) {

    const dispatch = useDispatch();
    const history = useHistory()

    const [openCancelConfirm, setOpenCancelConfirm] = React.useState(false);
    const [openCancelFixedConfirm, setOpenCancelFixedConfirm] = React.useState(false);

    const open = props.open;
    const handleClose = props.handleClose;
    const dataToView = props.dataToView;
    const loadSchedules = props.loadSchedules;
    const data = useSelector(state => state.app.scheduling_data);

    const initialState = {
        selected_time: {},
        fixo: false,
        domicilio: false,
        endereco: '',
        profissional_id: '',
        cliente_cliente_id: '',
        servico_id: '',
        day: ''
    };

    const [initialValues, setInitialValues] = useState(initialState);

    useEffect(() => {
        if (dataToView != null) {
            dispatch({
                type: 'LOAD_SCHEDULING_DATA',
                payload: {
                    params: {
                        agendamento_id: dataToView.id,
                        horario: dataToView.horario
                    }
                }
            });
        }
    }, [dataToView, dispatch]);

    useEffect(() => {
        if (data && data.Agendamento) {
            const newInitialValues = {
                id: data.Agendamento.id,
                selected_time: {
                    time: data.Agendamento.horario.split(" ")[1],
                    at_home: data.Agendamento.domicilio === 'Y',
                    only_at_home: false,
                },
                fixo: data.Agendamento.tipo === 'fixo',
                domicilio: data.Agendamento.domicilio === 'Y',
                endereco: data.Agendamento.endereco,
                profissional_id: data.Agendamento.profissional_id,
                cliente_cliente_id: data.Agendamento.cliente_cliente_id,
                servico_id: data.Agendamento.servico_id,
                day: data.Agendamento.horario.split(" ")[0]
            };

            if (JSON.stringify(initialValues) !== JSON.stringify(newInitialValues)) {
                setInitialValues(newInitialValues);
            }
        } else if (JSON.stringify(initialValues) !== JSON.stringify(initialState)) {
            setInitialValues(initialState);
        }
    }, [data, initialValues, initialState]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                dispatch({
                    type: 'SAVE_SCHEDULING',
                    payload: {
                        submitValues: {
                            ...values,
                            time: values.selected_time.time
                        },
                        setSubmitting,
                        callback: () => {
                            resetForm({
                                values: initialValues,
                            });

                            loadSchedules();
                            handleClose();
                        }
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        validationSchema: yup.object().shape({
            selected_time: yup.object({
                time: yup.string().required('O horário é obrigatório')
            }).required('Selecione um horário'),
            endereco: yup.string().when("domicilio", {
                is: true,
                then: yup.string().required("Informar o endereço de atendimento é obrigatório")
            }),
            cliente_cliente_id: yup.number().required("O campo cliente é obrigatório"),
            day: yup.string().required("Selecione a data do agendamento antes de continuar"),
            servico_id: yup.number().required("Selecione um cliente antes de continuar"),
        })
    });

    useEffect(() => {
        dispatch({
            type: 'GET_SERVICE_DATA_TO_SCHEDULING',
            payload: {
                params: {
                    servico_id: formik.values.servico_id,
                    day: formik.values.day
                }
            }
        });
    }, [formik.values.servico_id, formik.values.day, dispatch]);

    const cancelSheduling = () => {
        if (data.Agendamento.cancelado === "Y") {
            alert("Esse agendamento já foi cancelado!");
            return;
        }

        if (data.Agendamento.torneio_id != null) {
            alert("Você não pode cancelar um agendamento de torneio!");
            return;
        }

        if (data.Agendamento.tipo === "fixo") {
            setOpenCancelFixedConfirm(true);
            return;
        }

        setOpenCancelConfirm(true);
    };

    const cancelShedulingTrigger = (tipo) => {
        let params = {
            agendamento_id: data.Agendamento.id,
            horario: data.Agendamento.horario,
        };

        if (tipo === 1) {
            params.tipo = 1;
        }

        try {
            dispatch({
                type: 'CANCEL_SCHEDULING',
                payload: {
                    submitValues: {
                        ...params,
                    },
                    callback: () => {
                        history.go(0);
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Novo Agendamento</DialogTitle>
            <DialogContent>
                <DialogCancelConfirm
                    open={openCancelConfirm}
                    setDialogOpen={setOpenCancelConfirm}
                    id={""}
                    message={"Tem certeza que deseja cancelar este agendamento? Esta ação é irreversível."}
                    actionConfirm={cancelShedulingTrigger}
                />
                <DialogCancelFixedConfirm
                    open={openCancelFixedConfirm}
                    setDialogOpen={setOpenCancelFixedConfirm}
                    message={"Tem certeza que deseja cancelar este agendamento? Esta ação é irreversível."}
                    actionConfirm={cancelShedulingTrigger}
                />
                <FormNewScheduling formik={formik} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
                {formik.values.id && (
                    <Button onClick={cancelSheduling} color="primary">
                        Cancelar Agendamento
                    </Button>
                )}
                {!formik.values.id && (
                    <Button onClick={formik.handleSubmit} color="primary">
                        Cadastrar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
