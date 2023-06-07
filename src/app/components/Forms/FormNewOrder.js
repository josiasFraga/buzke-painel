import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import PickerClientes from '../Forms/Components/Pickers/Clientes';
import DialogNewCustomer from "../DialogNewCustomer";
import Button from '@material-ui/core/Button';

import Form from 'react-bootstrap/Form';

import { toast } from 'react-toastify';
import BlockUi from 'react-block-ui';

export function FormNewOrder(props) {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const formik = props.formik;
  
    const handleClose = () => {
      setOpen(false);
    }

    const checkTableExits = () => {
        const table_name = formik.values.mesa;
        if ( table_name != '' && table_name != null ) {
            formik.setSubmitting(true);
            dispatch({
                type: 'LOAD_TABLE',
                payload: {
                    submitValues: {
                        params: {
                            descricao: table_name
                        }
                    },
                    callbackSuccess: () => {
                        formik.setSubmitting(false);
                    },
                    callbackNotFound: () => {
                        formik.setFieldValue('mesa', '');
                        formik.setSubmitting(false);                        
                    }
                }
            });
        }
    }

    return (
    <>
      <DialogNewCustomer 
        open={open}
        handleClose={handleClose}
        dataClientToEdit={false}
        setDataClientToEdit={()=>{}}
      />
      <BlockUi tag="div" blocking={formik.isSubmitting}>
          <div className="row">
                <div className="col-10 mb-8">
                    <PickerClientes formik={props.formik} />
                </div>
                <div className="col-2 mb-8">
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{marginTop: 27}} className="btn-block">
                        Novo Cliente
                    </Button>
                </div>

                <div className="col-md-12 mb-8">
                    <label className="form-label">Comanda <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="text"
                        name="comanda"
                        placeholder="Digite o número da comanda"
                        autoFocus
                        className={"form-control " + (formik.errors.comanda && formik.touched.comanda ? 'is-invalid' : '')}
                        value={formik.values.comanda}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.comanda && formik.touched.comanda && <label className="invalid-feedback">{formik.errors.comanda}</label>}
                </div>

                <div className="col-md-12 mb-8">
                    <label className="form-label">Mesa <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="text"
                        name="mesa"
                        placeholder="Digite o número da mesa"
                        className={"form-control " + (formik.errors.mesa && formik.touched.mesa ? 'is-invalid' : '')}
                        value={formik.values.mesa}
                        onChange={formik.handleChange}
                        onBlur={() => {
                            formik.handleBlur('mesa');
                            checkTableExits();
                        }}
                    />
                    {formik.errors.mesa && formik.touched.mesa && <label className="invalid-feedback">{formik.errors.mesa}</label>}
                </div>
          </div>
      </BlockUi>
    </>
    );
}