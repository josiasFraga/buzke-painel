import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewTable } from "../Forms/FormNewTable";
import * as yup from 'yup';
import {useFormik} from 'formik';

export default function DialogNewTable(props) {

    const dispatch = useDispatch();

    const open = props.open;
    const handleClose = props.handleClose;
    const dataToEdit = props.dataTableToEdit;

    const initialState = {
        descricao: "",
    };

    const [initialValues, setInitialValues] = useState(initialState);

    useEffect(() => {
        if ( dataToEdit !== false ) {
            setInitialValues({
                id: dataToEdit.Mesa.id,
                descricao: dataToEdit.Mesa.descricao,
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
                dispatch({type: 'SAVE_TABLE', payload: {
                    submitValues: {
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                        resetForm({
                            values: initialValues,
                        });

                        dispatch({type: 'LOAD_TABLES', payload: {}});

                        handleClose();
                    }
                }});
                
            } catch(e) {
                console.log(e);
            }
        },

        validationSchema: yup.object().shape({
			descricao: yup
			.string()
			.required("O campo nome é obrigatório"),
        })
    });

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Nova Mesa</DialogTitle>
        <DialogContent>
            <FormNewTable formik={formik} />
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