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
    const business_configs = useSelector((state) => state.app.business_configs);
    const [radiosCourtsServices, setRadiosCourtsServices] = useState([]);

    useEffect(() => {
        if ( my_courts_services.length > 0 ) {
            setRadiosCourtsServices(my_courts_services.map((mcs) => {
                mcs.ClienteServico.disabled = false;
                return mcs;
            }));
        }
    }, [my_courts_services]);

    useEffect(() => {

        if (formik.values.horaSelecionada.horario != "" && !formik.values.id) {

            let hora_selecionada = available_schedules.filter((aval) => {
                return aval.horario == formik.values.horaSelecionada.horario;
            });

            formik.setFieldValue("horaSelecionada.duracao", hora_selecionada[0].duracao);

            const servicos_desativar = hora_selecionada[0].servicos_desativar;

            if ( servicos_desativar.length > 0 ) {
                const my_cs = my_courts_services.map((court_service)=>{
                    court_service.ClienteServico.disabled = servicos_desativar.indexOf(court_service.ClienteServico.id) > -1;
                    return court_service;
                });

                setRadiosCourtsServices(my_cs);
            } else {

                setRadiosCourtsServices(my_courts_services.map((mcs) => {
                    mcs.ClienteServico.disabled = false;
                    return mcs;
                }));
            }
        
            formik.setFieldValue("servico","");
        }
    }, [formik.values.horaSelecionada]);

    
    return (
        <BlockUi tag="div" blocking={formik.isSubmitting}>
            <div className="row">

                <div className="col-md-12 mb-8">
                    <label className="form-label">Data <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        name="day.dateString"
                        min={new Date().toISOString().split('T')[0]}
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
                    <label className="form-label">Horario</label>
                    <div className="row">
                    {available_schedules.map((aval, index)=>{
                        return (
                        <div className="col-md-2 col-sm-3" 
                        key={"available_" + index}>
                        <div className="mb-4" style={{
                                backgroundColor: "#f7f7f7", 
                                width: "100%", 
                                textAlign: "center",
                                borderRadius: "10px",
                                opacity: !aval.enabled ? 0.3 : 1,
                            }}>
                            <Form.Check
                                type="radio"
                                label={aval.horario}
                                name="horaSelecionada.horario"
                                id={"radio_horario_" + index}
                                custom
                                checked={formik.values.horaSelecionada && formik.values.horaSelecionada.horario == aval.horario}
                                disabled={!aval.enabled}
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
                </div>

                <div className="col-xl-12 col-md-12 mb-8">
                    <label className="form-label">Quadra/Serviço</label>
                    {
                        radiosCourtsServices.map((court_service, index)=>{
                            return (
                                <Form.Check
                                    key={index}
                                    id={"radio_servico_" + index}
                                    bsCustomPrefix
                                    //custom
                                    disabled={court_service.ClienteServico.disabled}
                                    className="mb-2"
                                    type="radio"
                                >
                                    <Form.Check.Input 
                                        value={court_service.ClienteServico.id}
                                        name="servico"
                                        type="radio"
                                        disabled={court_service.ClienteServico.disabled}
                                        checked={formik.values.servico == court_service.ClienteServico.id}
                                        onChange={(evt)=>{
                                            
                                            if ( evt.target.checked ) {
                                                formik.setFieldValue("servico", 
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
                        {formik.errors.servico && formik.touched.servico && <label className="invalid-feedback d-block">{formik.errors.servico}</label>}
                    </div>
                </div>

                {
                    business_configs.horario_fixo == "Y" &&
                    <div className="col-xl-12 col-md-12 mb-8">
                        <label className="form-label">Horário Fixo?</label>
                        <Form.Check 
                            type={"checkbox"}
                            id={`fixo`}
                            label={`Sim`}
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