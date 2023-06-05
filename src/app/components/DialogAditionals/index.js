import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewProductAditional } from "../Forms/FormNewProductAditional";
import Lista from "./components/Lista";

import * as yup from 'yup';
import {useFormik} from 'formik';

export default function DialogAditionals(props) {

    const dispatch = useDispatch();

    const open = props.open;
    const handleClose = props.handleClose;
    const product_id = props.product_id;

    const initialState = {
        descricao: "",
        valor: "",
        ativo: "1"
    };

    const [initialValues, setInitialValues] = useState(initialState);

    const handleClickEdit = (aditional) => {
        setInitialValues({
            id: aditional.ProdutoAdicional.id,
            descricao: aditional.ProdutoAdicional.descricao,
            valor: aditional.ProdutoAdicional.valor,
            ativo: aditional.ProdutoAdicional.ativo,
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting, resetForm}) => {

            try {
                dispatch({type: 'SAVE_PRODUCT_ADITIONAL', payload: {
                    submitValues: {
                        produto_id: product_id,
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                        resetForm({
                            values: initialValues,
                        });

                        dispatch({type: 'LOAD_PRODUCT_ADITIONALS', payload: {params: {produto_id: product_id}}});

                        setInitialValues(initialState);
                    }
                }});
                
            } catch(e) {
                console.log(e);
            }
        },

        validationSchema: yup.object().shape({
			descricao: yup
			.string()
			.required("O campo descrição é obrigatório"),
			valor: yup
			.string()
			.required("O valor descrição é obrigatório"),
        })
    });

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Adicionais do Produto</DialogTitle>
        <DialogContent>
            <FormNewProductAditional formik={formik} />
            <hr />
            <Lista product_id={product_id} handleClickEdit={handleClickEdit} />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Fechar
        </Button>
        </DialogActions>
    </Dialog>)
}