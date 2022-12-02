import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { cpfMask, phoneUyMask, phoneMask, cepMask2 } from '../../../_metronic/_helpers/MasksHelper';

import PickerClientes from '../Forms/Components/Pickers/Clientes';

import Form from 'react-bootstrap/Form';

import { toast } from 'react-toastify';
import BlockUi from 'react-block-ui';

export function FormNewScheduling(props) {

    const dispatch = useDispatch();
    const formik = props.formik;
    const available_schedules = useSelector(state => state.app.available_schedules);

    const my_courts_services = useSelector(state => state.app.courts_services);

    useEffect(() => {
        dispatch({type: 'LOAD_COURTS_SERVICES', payload: {params: {tipo: "meus"}}});
    }, []);
    
    return (
        <BlockUi tag="div" blocking={formik.isSubmitting}>
            <div className="row">

                <div className="col-md-12 mb-8">
                    <label className="form-label">Data <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        name="day.dateString"
                        min={new Date().toISOString().split('T')[0]}
                        autoFocus
                        className={"form-control " + (formik.errors.day && formik.errors.day.dateString && formik.touched.day && formik.touched.day.dateString ? 'is-invalid' : '')}
                        value={formik.values.day.dateString}
                        onChange={(evt) => {
                            const value = evt.target.value;
                            if (value == null || value == "") {
                                formik.setFieldValue('day', {"dateString" : ""});
                            } else
                                formik.setFieldValue('day', {"dateString" : value});
                        }}
                    />
                    {formik.errors.day && formik.errors.day.dateString && formik.touched.day && formik.touched.day.dateString && <label className="invalid-feedback">{formik.errors.day.dateString}</label>}
                </div>

                <div className="col-xl-12 col-md-12 mb-8">
                    <PickerClientes formik={props.formik} />
                </div>

                <div className="col-xl-12 col-md-12 mb-8">
                    <div className="row">
                    {available_schedules.map((aval, index)=>{
                        return (
                        <div className="col-md-2 col-sm-3" 
                        key={index}>
                        <div className="mb-4" style={{
                                backgroundColor: "#f7f7f7", 
                                width: "100%", 
                                textAlign: "center",
                                borderRadius: "10px"
                            }}>
                            <Form.Check
                                type="radio"
                                label={aval.horario}
                                name="horaSelecionada.horario"
                                id={"radio_horario_" + index}
                                custom
                                checked={formik.values.horaSelecionada && formik.values.horaSelecionada.horario == aval.horario}
                                style={{
                                    paddingLeft: "10px", 
                                    paddingRight: "10px", 
                                    paddingTop: "10px", 
                                    paddingBottom: "10px",
                                }}
                                onChange={(evt)=>{
                                    if ( evt.target.checked ) {
                                        formik.setFieldValue("horaSelecionada.horario", 
                                            aval.horario
                                        );
                                    }
                                }}
                            />
                        </div>
                        </div>
                        );
                    })}
                        <div className="col-md-12">
                            {formik.errors.horaSelecionada && formik.errors.horaSelecionada.horario && <label className="invalid-feedback d-block">{formik.errors.horaSelecionada.horario}</label>}
                        </div>
                    </div>

                    <div className="col-md-12 mb-4">
                        <label className="form-label">Quadra/Serviço</label>
                        {
                            my_courts_services.map((court_service, index)=>{
                                return (
                                    <Form.Check
                                    key={index}
                                    id={court_service.ClienteServico.id}
                                    bsCustomPrefix
                                    //custom
                                    className="mb-2"
                                    type="switch"
                                    >
                                        <Form.Check.Input 
                                            value={court_service}
                                            name="court_service[]"
                                            checked={false}
                                            onChange={(e)=>{
                                                
                                            }}
                                        />
                                        <Form.Check.Label>
                                            <div className="check-filter-service-color" style={{ backgroundColor: court_service.ClienteServico.cor }}></div>
                                            {court_service.ClienteServico.nome}
                                        </Form.Check.Label>
                                    </Form.Check>
                                )
                            })
                        }
                    </div>

                    
                </div>
            </div>
        </BlockUi>
    );
}