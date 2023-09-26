import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormAddProductToOrder } from "../Forms/FormAddProductToOrder";


export default function DialogAddProductToOrder(props) {

    const open = props.open;
    const handleClose = props.handleClose;
    const product = props.product;
    const produto_nome = product.descricao;
    const produto_id = product.id;
    const formik = props.formik;

    return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">ADICIONANDO: {produto_nome}</DialogTitle>
            <DialogContent>
                <FormAddProductToOrder 
                    formik={formik}
                    produto_id={produto_id}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={formik.handleSubmit} color="primary">
                Adicionar
            </Button>
        </DialogActions>
    </Dialog>)
}