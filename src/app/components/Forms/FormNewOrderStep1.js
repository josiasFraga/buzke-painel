import React from "react";
import { useDispatch } from 'react-redux';

import PickerClientes from '../Forms/Components/Pickers/Clientes';
import PickerPdvs from '../Forms/Components/Pickers/Pdvs';
import DialogNewCustomer from "../DialogNewCustomer";
import Button from '@material-ui/core/Button';

import BlockUi from 'react-block-ui';

export function FormNewOrderStep1(props) {

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

    const checkOpenBill = () => {
        const bill_name = formik.values.comanda;
        if ( bill_name != '' && bill_name != null ) {
            formik.setSubmitting(true);
            dispatch({
                type: 'CHECK_OPEN_BILL',
                payload: {
                    submitValues: {
                        params: {
                            descricao: bill_name
                        }
                    },
                    callbackIsClosed: () => {
                        formik.setSubmitting(false);
                    },
                    callbackIsOpened: (cliente) => {
                        formik.setSubmitting(false);
                        if ( cliente != null && cliente != '' ) {
                            formik.setFieldValue('client_client_id', cliente);
                        }               
                    },
                    callbackError: () => {
                        formik.setFieldValue('comanda', '');
                        formik.setSubmitting(false);                        
                    }
                }
            });
        }
    }

    const checkOpenBillClient = (client_client_id) => {
        if ( client_client_id != '' && client_client_id != null ) {
            formik.setSubmitting(true);
            dispatch({
                type: 'CHECK_OPEN_BILL',
                payload: {
                    submitValues: {
                        params: {
                            client_client_id: client_client_id
                        }
                    },
                    callbackIsClosed: () => {
                        formik.setSubmitting(false);
                    },
                    callbackIsOpened: (cliente, comanda, endereco) => {
                        formik.setSubmitting(false);
                        formik.setFieldValue('comanda', comanda);
                        formik.setFieldValue('endereco', endereco);
                    },
                    callbackError: () => {
                        formik.setFieldValue('client_client_id', '');
                        formik.setSubmitting(false);                        
                    }
                }
            });
        }
    }

    const setClientAddress = (address) => {
        formik.setFieldValue('endereco', address);
    }

    const setIsDelivery = (delivery) => {
        console.log(delivery);
        formik.setFieldValue('delivery', delivery);
    }

    /*React.useEffect(()=>{

        if ( formik.values.client_client_id != '' && formik.values.client_client_id != null ) {
            checkOpenBillClient();
        }

    },[formik.values.client_client_id]);*/

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
                <div className="col-12 mb-8">
                    <PickerPdvs 
                        formik={props.formik} 
                        setIsDelivery={setIsDelivery}
                    />
                </div>

                <div className="col-10 mb-8">
                    <PickerClientes 
                        formik={props.formik} 
                        captureAddress={setClientAddress} 
                        callbackOnChange={checkOpenBillClient}
                    />
                </div>

                <div className="col-2 mb-8">
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{marginTop: 27}} className="btn-block">
                        Novo Cliente
                    </Button>
                </div>

            {formik.values.delivery == 'Y' &&
                <div className="col-md-12 mb-8">
                    <label className="form-label">Endereço <span className="text-danger">&nbsp;*</span></label>
                    <textarea
                        type="text"
                        name="endereco"
                        placeholder="Digite o endereço"
                        className={"form-control " + (formik.errors.endereco && formik.touched.endereco ? 'is-invalid' : '')}
                        value={formik.values.endereco}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.endereco && formik.touched.endereco && <label className="invalid-feedback">{formik.errors.endereco}</label>}
                </div>
            }
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
                        onBlur={() => {
                            formik.handleBlur('comanda');
                            checkOpenBill();
                        }}
                    />
                    {formik.errors.comanda && formik.touched.comanda && <label className="invalid-feedback">{formik.errors.comanda}</label>}
                </div>

            {formik.values.delivery == 'N' &&

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
            }
          </div>
      </BlockUi>
    </>
    );
}