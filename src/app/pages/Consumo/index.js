import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';

import { FormNewOrder } from "../../components/Forms/FormNewOrder";


const initialState = {
    client_client_id: "",
    comanda: "",
    mesa: "",
};

export function Consumo() {

    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState(initialState);
    //const products = useSelector(state => state.app.products);


    useEffect(() => {
        //dispatch({type: 'LOAD_PRODUCTS', payload: {}});
    }, []);

    const handleClickNew = () => {
    }

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
            comanda: yup.string().required('A comanda é obrigatória'),
            client_client_id: yup.string().test({
                name: 'validate-client-id',
                test: function(value) {
                  const mesa = this.parent.mesa;
                  return mesa !== '' || value !== '';
                },
                message: 'O cliente é obrigatório quando a mesa não está selecionada',
              }),
              mesa: yup.string().test({
                name: 'validate-mesa',
                test: function(value) {
                  const clientClientId = this.parent.client_client_id;
                  return clientClientId !== '' || value !== '';
                },
                message: 'A mesa é obrigatória quando o cliente não está selecionado',
              }),
        })
    });



    return (
    <>
    
      <div className="card card-custom card-stretch gutter-b">

        <div className="card-header border-0 py-5">
            <h3 className="card-title align-items-start flex-column">
                <span className="card-label font-weight-bolder text-dark">Consumo</span>
            </h3>
            <div className="card-toolbar">
                {/*<a href="#" className="btn btn-info font-weight-bolder font-size-sm mr-3">New Report</a>
                <a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
            </div>
        </div>

        <div className="card-body pt-0 pb-3">
            <FormNewOrder formik={formik} />

            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-primary btn-block mb-10 rightBtn mt-10" onClick={() => { formik.handleSubmit() }}>
                        INICIAR PEDIDO
                    </button>
                </div>
            </div>
        </div>

      </div>
    </>
    );
}