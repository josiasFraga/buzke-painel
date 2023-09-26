import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';

import { FormNewOrderStep1 } from "../../components/Forms/FormNewOrderStep1";
import { FormNewOrderStep2 } from "../../components/Forms/FormNewOrderStep2"

const initialState = {
    client_client_id: "",
    comanda: "",
    mesa: "",
    endereco: "",
    pdv_id: "",
    delivery: "N",
    produto_id: "",
    quantidade: 1,
    adicionais: []
};

export function Consumo() {

    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState(initialState);
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);
    //const products = useSelector(state => state.app.products);

    useEffect(() => {
        //dispatch({type: 'LOAD_PRODUCTS', payload: {}});
    }, []);
    
    let validation = [
        {
            pdv_id: yup.string().required('O pdv_id é obrigatório'),
            comanda: yup.string().required('A comanda é obrigatória'),
            delivery: yup.string().required('O campo delivery é obrigatório'),
            endereco: yup.string().when('delivery', {
                is: 'Y',
                then: yup.string().required('O endereço é obrigatório'),
                otherwise: yup.string()
            }),
            client_client_id: yup.string().when('delivery', {
                is: 'Y',
                then: yup.string().required('O client_client_id é obrigatório'),
                otherwise: yup.string()
            }),
            mesa: yup.string().when('delivery', {
                is: 'N',
                then: yup.string().required('A mesa é obrigatória'),
                otherwise: yup.string()
            })
        },
        {
            produto_id: yup
                .string()
                .required("O campo produto é obrigatório"),
            quantidade: yup
                .number("O campo quantidade deve ser numérico")
                .required("O campo quantidade é obrigatório")
        }
    ];

    const buttonTexts = ['Iniciar Pedido', 'Conferir Pedido'];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting, resetForm}) => {

            try {
                if ( step == 0 ){

                    dispatch({type: 'START_ORDER', payload: {
                        submitValues: {
                            ...values,
                            //id: clienteId
                        },
                        setSubmitting,
                        callback: () => {
                            setStep((step+1))
                            /*resetForm({
                                values: initialValues,
                            });*/
                        }
                    }});
                }
                else if ( step == 1 ){

                    dispatch({type: 'ADD_PRODUCT_DO_ORDER', payload: {
                        submitValues: {
                            ...values,
                            //id: clienteId
                        },
                        setSubmitting,
                        callback: () => {
                            resetForm({
                                values: initialValues,
                            });

                            setOpen(false);
                        }
                    }});
                }
            } catch(e) {
                console.log(e);
            }
        },

        validationSchema: yup.object().shape(validation[step])
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
    
            {step == 0 && <FormNewOrderStep1 formik={formik} />}
            {step == 1 && <FormNewOrderStep2 formik={formik} open={open} setOpen={setOpen} />}

            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-primary btn-block mb-10 rightBtn mt-10" onClick={() => { formik.handleSubmit() }}>
                        {buttonTexts[step]}
                    </button>
                </div>
            </div>
        </div>

      </div>
    </>
    );
}