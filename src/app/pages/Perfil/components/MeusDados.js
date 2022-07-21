import React, { useState, useEffect } from "react";
import { cpfMask, phoneMask, cepMask } from '../../../../_metronic/_helpers/MasksHelper';

import {Pagination} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';
import * as yup from 'yup';
import BlockUi from 'react-block-ui';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';

export default function MeusDados(props) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const states = useSelector(state => state.app.states);
    const cities = useSelector(state => state.app.cities);
    const professions = useSelector(state => state.app.professions);
    const [tab, setTab] = useState('profile_info');

    const loadCidades = (state) => {
        dispatch({type: 'LOAD_CITIES', payload: {state: state}});
    }


    return (
    <>            
        <div className="row mb-5">
            <div className="col-xl-4">
                <label className="form-label">Profissão <span className="text-danger">&nbsp;*</span></label>
                <Select
                    name="profession"
                    isSearchable={true}
                    isClearable={true}
                    options={professions}
                    className={props.formik.errors.profession && props.formik.touched.profession ? 'is-invalid' : ''}
                    onChange={(value) => {
                        props.formik.setFieldValue('profession', value);
                    }}
                    value={props.formik.values.profession}
                    placeholder="Selecione.."
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    noOptionsMessage={() => <span>Sem resultados.</span>}
                    theme={customSelectStyle}
                />
                {props.formik.errors.profession && props.formik.touched.profession && <label className="invalid-feedback">{props.formik.errors.profession}</label>}
            </div>
        </div>
    { props.formik.values.profession != null && props.formik.values.profession.name === 'Advogado' &&
        <div className="row mb-5">
            <div className="col-xl-4">
                <label className="form-label">Nº da OAB <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="number"
                    name="oab"
                    className={"form-control " + (props.formik.errors.oab && props.formik.touched.oab ? 'is-invalid' : '')}
                    value={props.formik.values.oab}
                    onChange={props.formik.handleChange}
                />
                {props.formik.errors.oab && props.formik.touched.oab && <label className="invalid-feedback">{props.formik.errors.oab}</label>}
            </div>
            <div className="col-xl-4">
                <label className="form-label">Estado <span className="text-danger">&nbsp;*</span></label>
                <Select
                    name="oab_state"
                    isSearchable={true}
                    isClearable={true}
                    options={states}
                    className={props.formik.errors.oab_state && props.formik.touched.oab_state ? 'is-invalid' : ''}
                    onChange={(value) => {
                        props.formik.setFieldValue('oab_state', value);
                    }}
                    value={props.formik.values.oab_state}
                    placeholder="Selecione.."
                    getOptionLabel={(option) => option.state}
                    getOptionValue={(option) => option.state}
                    noOptionsMessage={() => <span>Sem resultados.</span>}
                    theme={customSelectStyle}
                />
                {props.formik.errors.oab_state && props.formik.touched.oab_state && <label className="invalid-feedback">{props.formik.errors.oab_state}</label>}

            </div>
        </div>
    }

        <div className="row mb-5">
            <div className="col-xl-6">
                <label className="form-label">Nome completo <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="name"
                    className={"form-control " + (props.formik.errors.name && props.formik.touched.name ? 'is-invalid' : '')}
                    value={props.formik.values.name}
                    onChange={props.formik.handleChange}
                />
                {props.formik.errors.name && props.formik.touched.name && <label className="invalid-feedback">{props.formik.errors.name}</label>}
            </div>
            <div className="col-xl-6">
                <label className="form-label">CPF <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="document_number"
                    className={"form-control " + (props.formik.errors.document_number && props.formik.touched.document_number ? 'is-invalid' : '')}
                    value={props.formik.values.document_number}
                    onChange={(evt) => props.formik.setFieldValue('document_number', cpfMask(evt.target.value))}
                />
                {props.formik.errors.document_number && props.formik.touched.document_number && <label className="invalid-feedback">{props.formik.errors.document_number}</label>}
            </div>
        </div>

        <div className="row mb-5">
            <div className="col-xl-6">
                <label className="form-label">E-mail <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="email"
                    className={"form-control " + (props.formik.errors.email && props.formik.touched.email ? 'is-invalid' : '')}
                    value={props.formik.values.email}
                    disabled={true}
                    style={{cursor: 'not-allowed'}}
                />
            </div>
            <div className="col-xl-6">
                <label className="form-label">Telefone <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="phone"
                    className={"form-control " + (props.formik.errors.phone && props.formik.touched.phone ? 'is-invalid' : '')}

                    value={props.formik.values.phone}
                    onChange={(evt) => props.formik.setFieldValue('phone', phoneMask(evt.target.value))}
                />
                {props.formik.errors.phone && props.formik.touched.phone && <label className="invalid-feedback">{props.formik.errors.phone}</label>}

            </div>
        </div>
        <div className="row mb-5">
            <div className="col-xl-4">
                <label className="form-label">CEP <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="postal_code"
                    className={"form-control " + (props.formik.errors.postal_code && props.formik.touched.postal_code ? 'is-invalid' : '')}
                    value={props.formik.values.postal_code}
                    onChange={(evt) => props.formik.setFieldValue('postal_code', cepMask(evt.target.value))}
                />
                {props.formik.errors.postal_code && props.formik.touched.postal_code && <label className="invalid-feedback">{props.formik.errors.postal_code}</label>}
            </div>
            <div className="col-xl-4">
                <label className="form-label">Estado <span className="text-danger">&nbsp;*</span></label>
                <Select
                    name="state"
                    isSearchable={true}
                    isClearable={true}
                    options={states}
                    className={props.formik.errors.state && props.formik.touched.state ? 'is-invalid' : ''}
                    onChange={(value) => {
                        props.formik.setFieldValue('state', value);

                        if (value) {
                            loadCidades(value.state);
                        } else {
                            props.formik.setFieldValue('city', null);
                            loadCidades('');
                        }

                    }}
                    value={props.formik.values.state}
                    placeholder="Selecione.."
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.state}
                    noOptionsMessage={() => <span>Sem resultados.</span>}
                    theme={customSelectStyle}
                />
            </div>
            <div className="col-xl-4">
                <label className="form-label">Cidade <span className="text-danger">&nbsp;*</span></label>
                <Select
                    name="city"
                    isSearchable={true}
                    isClearable={true}
                    options={cities}
                    className={props.formik.errors.city && props.formik.touched.city ? 'is-invalid' : ''}
                    onChange={(value) => props.formik.setFieldValue('city', value)}
                    value={props.formik.values.city}
                    placeholder="Selecione.."
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    noOptionsMessage={() => <span>Sem resultados.</span>}
                    theme={customSelectStyle}
                />
            </div>
        </div>

        <div className="row mb-5">
            <div className="col-xl-6">
                <label className="form-label">Endereço <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="address"
                    className={"form-control " + (props.formik.errors.address && props.formik.touched.address ? 'is-invalid' : '')}
                    value={props.formik.values.address}
                    onChange={props.formik.handleChange}
                />
                {props.formik.errors.address && props.formik.touched.address && <label className="invalid-feedback">{props.formik.errors.address}</label>}
            </div>
            <div className="col-xl-6">
                <label className="form-label">Bairro <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="district"
                    className={"form-control " + (props.formik.errors.district && props.formik.touched.district ? 'is-invalid' : '')}
                    value={props.formik.values.district}
                    onChange={props.formik.handleChange}
                />
                {props.formik.errors.district && props.formik.touched.district && <label className="invalid-feedback">{props.formik.errors.district}</label>}
            </div>
        </div>
        <button type="button" className="btn btn-primary btnDefault"onClick={props.formik.handleSubmit}>SALVAR</button>
    </>
    );
}
