import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewProductCategory } from "../Forms/FormNewProductCategory";
import * as yup from 'yup';
import {useFormik} from 'formik';

export default function DialogNewCustomer(props) {

    const dispatch = useDispatch();

    const open = props.open;
    const handleClose = props.handleClose;
    const dataToEdit = props.dataCategoryToEdit;

    const initialState = {
        nome: "",
    };

    const [initialValues, setInitialValues] = useState(initialState);

    useEffect(() => {
        if ( dataToEdit !== false ) {
            setInitialValues({
                id: dataToEdit.ProdutoCategoria.id,
                nome: dataToEdit.ProdutoCategoria.nome,
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
                dispatch({type: 'SAVE_PRODUCT_CATEGORY', payload: {
                    submitValues: {
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                        resetForm({
                            values: initialValues,
                        });

                        dispatch({type: 'LOAD_PRODUCTS_CATEGORIES', payload: {}});

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
        <DialogTitle id="form-dialog-title">Nova Categoria</DialogTitle>
        <DialogContent>
            <FormNewProductCategory formik={formik} />
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