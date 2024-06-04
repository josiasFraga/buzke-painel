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
    const my_courts_services = useSelector(state => state.app.courts_services);
    const business_configs = useSelector((state) => state.app.business_configs);

    const loading = useSelector(state => state.app.is_service_data_to_scheduling_loading);
    const data_to_scheduling = useSelector(state => state.app.service_data_to_scheduling);

	let fixedShedulingDisabled = Object.keys(formik.values.selected_time) === 0;
	let showDomociliarSheduling = true;
	let domociliarShedulingDisabled = Object.keys(formik.values.selected_time) === 0;
	let showChooseProfessional = false;

	if ( data_to_scheduling.enable_fixed_shedulling !== true ) {
		fixedShedulingDisabled = true;
	}

	if ( data_to_scheduling.tipo === 'Quadra' ) {
		showDomociliarSheduling = false;
	}

	if ( data_to_scheduling.tipo === 'Serviço' ) {
		showChooseProfessional = true;
	}

	if ( Object.keys(formik.values.selected_time).length > 0 ) {

		if ( !formik.values.selected_time.enable_fixed_scheduling ) {
			fixedShedulingDisabled = true;
		}

		if ( !formik.values.selected_time.at_home || formik.values.selected_time.only_at_home ) {
			domociliarShedulingDisabled = true;
		}
	}

	useEffect(()=>{
		if ( formik.values.selected_time && formik.values.selected_time.only_at_home ) {
			formik.setFieldValue('domicilio', true)
		}
	}, [formik.values.selected_time])

    return (
        <BlockUi tag="div" blocking={formik.isSubmitting || loading}>
            <div className="row">

                <div className="col-xl-12 col-md-12 mb-8">
                    <PickerClientes formik={props.formik} fieldName={'cliente_cliente_id'} />
                </div>

                <div className="col-md-12 mb-8">
                    <label className="form-label">Data <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        name="day"
                        min={new Date().toISOString().split('T')[0]}
                        className={"form-control " + (formik.errors.day && formik.errors.day && formik.touched.day && formik.touched.day ? 'is-invalid' : '')}
                        value={formik.values.day}
                        onChange={(evt) => {
                            const value = evt.target.value;
                            if (value == null || value == "") {
                                formik.setFieldValue('day', "");
                            } else
                                formik.setFieldValue('day', value);
                        }}
                    />
                    {formik.errors.day && formik.errors.day && formik.touched.day && formik.touched.day && <label className="invalid-feedback">{formik.errors.day}</label>}
                </div>

                <div className="col-xl-12 col-md-12 mb-8">
                    <label className="form-label">Quadra/Serviço</label>
                    {
                        my_courts_services.map((court_service, index)=>{
                            return (
                                <Form.Check
                                    key={index}
                                    id={"radio_servico_" + index}
                                    bsCustomPrefix
                                    //custom
                                    //disabled={court_service.ClienteServico.disabled}
                                    className="mb-2"
                                    type="radio"
                                >
                                    <Form.Check.Input 
                                        value={court_service.ClienteServico.id}
                                        name="servico_id"
                                        type="radio"
                                        disabled={court_service.ClienteServico.disabled}
                                        checked={formik.values.servico_id == court_service.ClienteServico.id}
                                        onChange={(evt)=>{
                                            
                                            if ( evt.target.checked ) {
                                                formik.setFieldValue("servico_id", 
                                                court_service.ClienteServico.id
                                                );
                                            }
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
                    <div className="col-md-12">
                        {formik.errors.servico_id && formik.touched.servico_id && <label className="invalid-feedback d-block">{formik.errors.servico_id}</label>}
                    </div>
                </div>

                <div className="col-xl-12 col-md-12 mb-8">
                    <label className="form-label">Horario</label>
                    <div className="row">
                        {
                            formik.values.servico_id === "" && <div className="col-md-12"><label className="invalid-feedback d-block">Selecione o SERVIÇO acima</label></div>
                        }
                        {
                            formik.values.day === "" && <div className="col-md-12"><label className="invalid-feedback d-block">Selecione a DATA acima</label></div>
                        }
                        {Object.keys(data_to_scheduling).length > 0 && data_to_scheduling.horarios.map((aval, index)=>{
                            return (
                            <div className="col-md-2 col-sm-3" 
                            key={"available_" + index}>
                                <div className="mb-4" style={{
                                    backgroundColor: "#f7f7f7", 
                                    width: "100%", 
                                    textAlign: "center",
                                    borderRadius: "10px",
                                    opacity: !aval.active ? 0.3 : 1,
                                }}>
                                <Form.Check
                                    type="radio"
                                    label={aval.label}
                                    name="selected_time.time"
                                    id={"radio_horario_" + index}
                                    custom
                                    checked={formik.values.selected_time.time && formik.values.selected_time.time == aval.time}
                                    disabled={!aval.active}
                                    style={{
                                        paddingLeft: "10px", 
                                        paddingRight: "10px", 
                                        paddingTop: "10px", 
                                        paddingBottom: "10px",
                                    }}
                                    onChange={(evt)=>{
                                        if ( evt.target.checked ) {
                                            formik.setFieldValue("selected_time.time", 
                                                aval.time
                                            );
                                        }
                                    }}
                                />
                            </div>
                            </div>
                            );
                        })}
                        <div className="col-md-12">
                            {formik.errors.selected_time && formik.errors.selected_time.time && <label className="invalid-feedback d-block">{formik.errors.selected_time.time}</label>}
                        </div>
                    </div>
                </div>

                {
                    showDomociliarSheduling && 
                    <>
                    <div className="col-xl-12 col-md-12 mb-8">
                        <label className="form-label">A domicilio?</label>
                        <Form.Check 
                            type={"checkbox"}
                            id={`domicilio`}
                            label={`Sim`}
                            disabled={domociliarShedulingDisabled}
                            onChange={(evt)=>{
                                if ( evt.target.checked ) {
                                    formik.setFieldValue("fixo", 
                                        true
                                    );
                                } else {

                                    formik.setFieldValue("fixo", 
                                        false
                                    );
                                }
                            }}
                        />
                    </div>
                    </>
                }

                {
                    business_configs.horario_fixo == "Y" &&
                    <div className="col-xl-12 col-md-12 mb-8">
                        <label className="form-label">Horário Fixo?</label>
                        <Form.Check 
                            type={"checkbox"}
                            id={`fixo`}
                            label={`Sim`}
                            disabled={fixedShedulingDisabled}
                            onChange={(evt)=>{
                                if ( evt.target.checked ) {
                                    formik.setFieldValue("fixo", 
                                        "true"
                                    );
                                } else {

                                    formik.setFieldValue("fixo", 
                                        "false"
                                    );
                                }
                            }}
                        />
                    </div>
                }
            </div>
        </BlockUi>
    );
}