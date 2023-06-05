import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormNewProduct } from "../Forms/FormNewProduct";
import * as yup from 'yup';
import {useFormik} from 'formik';

export default function DialogNewProduct(props) {

    const dispatch = useDispatch();

    const open = props.open;
    const handleClose = props.handleClose;
    const dataToEdit = props.dataProductToEdit;

    const initialState = {
        unidade_entrada_id: '',
        unidade_saida_id: '',
        categoria_id: '',
        codigo: '',
        descricao: '',
        estoque_minimo: '',
        estoque_inicial: '',
        data_estoque: '',
        valor_custo: '',
        valor_venda: '',
        alcoolico: '0',
        cozinha: '',
        ativo: '1',
        peso: '0.800',
        classe_imposto: '',
        ncm: '',
        cest: '',
        vendido_separadamente: '1',
        destino_impressao: 'cozinha',
        parte_do_cupom: '1'
    };

    const [initialValues, setInitialValues] = useState(initialState);

    useEffect(() => {
        if ( dataToEdit !== false ) {
            setInitialValues({
                id: dataToEdit.Produto.id,
                unidade_entrada_id: dataToEdit.Produto.unidade_entrada_id,
                unidade_saida_id: dataToEdit.Produto.unidade_saida_id,
                categoria_id: dataToEdit.Produto.categoria_id,
                codigo: dataToEdit.Produto.codigo,
                descricao: dataToEdit.Produto.descricao,
                estoque_minimo: dataToEdit.Produto.estoque_minimo,
                estoque_inicial: dataToEdit.Produto.estoque_inicial,
                data_estoque: dataToEdit.Produto.data_estoque,
                valor_custo: dataToEdit.Produto.valor_custo,
                valor_venda: dataToEdit.Produto.valor_venda,
                alcoolico: dataToEdit.Produto.alcoolico,
                cozinha: dataToEdit.Produto.cozinha,
                ativo: dataToEdit.Produto.ativo,
                peso: dataToEdit.Produto.peso,
                classe_imposto: dataToEdit.Produto.classe_imposto,
                ncm: dataToEdit.Produto.ncm,
                cest: dataToEdit.Produto.cest,
                vendido_separadamente: dataToEdit.Produto.vendido_separadamente,
                destino_impressao: dataToEdit.Produto.destino_impressao,
                parte_do_cupom: dataToEdit.Produto.parte_do_cupom
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
                dispatch({type: 'SAVE_PRODUCT', payload: {
                    submitValues: {
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                        resetForm({
                            values: initialValues,
                        });

                        dispatch({type: 'LOAD_PRODUCTS', payload: {}});

                        handleClose();
                    }
                }});
                
            } catch(e) {
                console.log(e);
            }
        },

        validationSchema: yup.object().shape({
			categoria_id: yup.string().required("O campo categoria é obrigatório"),
			codigo: yup.string().required("O campo codigo é obrigatório"),
			descricao: yup.string().required("O campo descrição é obrigatório"),
			estoque_minimo: yup.string().required("O campo estoque mínimo é obrigatório"),
			estoque_inicial: yup.string().required("O campo estoque inicial é obrigatório"),
			data_estoque: yup.string().required("O campo data do estoque é obrigatório"),
			valor_custo: yup.string().required("O campo valor de custo é obrigatório"),
			valor_venda: yup.string().required("O campo valor de venda é obrigatório"),
			alcoolico: yup.string().required("O campo alcoólico é obrigatório"),
			ativo: yup.string().required("O campo ativo é obrigatório"),
			//peso: yup.string().required("O campo peso é obrigatório"),
			classe_imposto: yup.string().required("O campo classe de imposto é obrigatório"),
			ncm: yup.string().required("O campo NCM é obrigatório"),
			cest: yup.string().required("O campo CEST é obrigatório"),
			vendido_separadamente: yup.string().required("O campo vendido separadamente é obrigatório"),
			destino_impressao: yup.string().required("O campo destino de impressão é obrigatório"),
			parte_do_cupom: yup.string().required("O campo parte do cupom é obrigatório"),
        })


    });

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Novo Produto</DialogTitle>
        <DialogContent>
            <FormNewProduct formik={formik} />
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