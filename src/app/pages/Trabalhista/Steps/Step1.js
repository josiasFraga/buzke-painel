import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async';
import Select, { components } from 'react-select';
import { Link } from 'react-router-dom';

const Input = (props) => <components.Input placeholder="selecione.." {...props} isHidden={false} />;

export default function Step1(props) {
    const dispatch = useDispatch();
    const stakeholder_types = useSelector(state => state.app.stakeholder_types);

    const proximo = async () => {
        const validation = await props.formik.validateForm();

        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }



    return (
<>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label">Nome do cálculo</label>
                            <input
                                name="process_number"
                                onChange={props.formik.handleChange}
                                value={props.formik.values.process_number}
                                placeholder="Digite o nome do cálculo"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <label className="form-label">Nome das partes envolvidas</label>
                        </div>
                    </div>
                { props.formik.values.stakeholders.map((_,key) => (
                    <div className="row">
                        <div className="col-xl-12">

                            <div className="input-remover-container" style={{width: '100%'}}>
                            {props.formik.values.stakeholders.length > 1 &&
                                <div className="icon-remover pointer icon-remover-left-corner" onClick={() => props.removeStakeholder(key)}><span>&times;</span></div>          
                            }
                                <input
                                    name={`stakeholders[${key}].name`}
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.stakeholders[key].name}
                                    placeholder={`Digite o nome da parte ${(key+1)}`}
                                    className="form-control mb-5"
                                />
                            </div>                           
                        </div>
                        
                    </div>
                ))}
                    <span className="primary font-size-small mb-5" style={{cursor: 'pointer', display: 'block', marginTop: '-8px'}} onClick={props.appendStakeholder}><i className="primary flaticon2-add-square icon-md"></i> Adicionar parte envolvida</span>

                    <div className="row mb-5">
                        <div className="col-xl-4">
                            <label className="form-label"> Data da admissão</label>
                            <input
                                type="date"
                                name="res_judicata_date"
                                onChange={props.formik.handleChange}
                                value={props.formik.values.res_judicata_date}
                                max="2999-12-31"
                                placeholder="Digite a data da admissão"
                                className="form-control"
                            />
                        </div>

                        <div className="col-xl-4">
                            <label className="form-label">Data da demissão</label>
                                <input
                                    type="date"
                                    name="res_judicata_date"
                                    onChange={props.formik.handleChange}
                                    value={props.formik.values.res_judicata_date}
                                    max="2999-12-31"
                                    placeholder="Digite a data da admissão"
                                    className="form-control"
                                />
                                 
                        </div>
                        <div className="" style={{paddingTop: '34px'}}>
                            <input type="checkbox" aria-label="Checkbox for following text input" />
                            <span>&nbsp;&nbsp;Funcionário ainda ativo na empresa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div className="row">
            <div className="col-xl-4 col-md-12">
            </div>
            <div className="col-xl-4 col-md-12"></div>
            <div className="col-xl-4 col-md-12">
                <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={proximo}>PRÓXIMO</button>
                
            </div>
        </div>

    </>);
}