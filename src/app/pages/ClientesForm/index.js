import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import * as yup from 'yup';
import {useFormik} from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Select, { components } from 'react-select';
import { useHistory } from 'react-router-dom';
import { cpfMask, cnpjMask, phoneMask, cepMask } from '../../../_metronic/_helpers/MasksHelper';

export function ClientesForm(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const person_types = useSelector(state => state.app.person_types);
    const states = useSelector(state => state.app.states);
    const cities = useSelector(state => state.app.cities);
    const [clienteId, setClienteId] = useState(props.match.params.cliente_id == 'back_review' ? null : props.match.params.cliente_id);
    const cliente = useSelector(state => state.app.customer);
    const [initialValues, setInitialValues] = useState({
        document_type: null,
        document_number: '',
        name: '',
        email: '',
        address: '',
        phone_1: '',
        postal_code: '',
        phone_2: '',
        state: null,
        city: null,
        birthday: '',
        observations: ''
    });

    useEffect(() => {
        dispatch({type: 'LOAD_STATES'});
        if (clienteId) {
            dispatch({type: 'LOAD_CUSTOMER', payload:{id:clienteId}});
        }
    }, []);

    useEffect(() => {
        if (Object.keys(cliente).length > 0 && clienteId) { // verifico se carregou os estados, senão não adianta
            if (cliente._state_data != null) {
				dispatch({type: 'LOAD_CITIES', payload: {state: cliente.state}});                                
            }
            let document_type = null;
            if (cliente.document_type != '') {
                if (cliente.document_type == 'CPF') {
                    document_type = person_types.filter(type => type.id == 'pf')[0];
                } else {
                    document_type = person_types.filter(type => type.id == 'pj')[0];
                }
            }

            setInitialValues({
                document_type: document_type,
                document_number: cliente.document_number,
                name: cliente.name,
                email: cliente.email,
                address: cliente.address,
                phone_1: cliente.phone_1,
                postal_code: cliente.postal_code,
                phone_2: cliente.phone_2,
                state: cliente._state_data,
                city: cliente._city_data,
                birthday: cliente.birthday,
                observations: cliente.observations
            });
        } else {
            // se for novo
            setInitialValues({
                ...initialValues,
            })
        }
    }, [cliente]); // importante ter todos, porque conforme carrega, ele recarrega o formulario inteiro, senão não carregaria o formulario direito, porque dependemos deles. E não há problema ficar recarregando, pq vai ser só 1x no load.



    const loadCidades = (state) => {

        dispatch({type: 'LOAD_CITIES', payload: {state: state}});
    }

    const documentMask = value => {
        if (formik.values.document_type.id == 'pf') {
            return cpfMask(value);
        } else {
            return cnpjMask(value);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values, {setSubmitting}) => {
            dispatch({type: 'SAVE_CUSTOMER', payload: {
                submitValues: {
                    ...values,
                    id: clienteId
                },
                setSubmitting,
                callback: () => {
                    history.goBack();
                }
            }});
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('O campo nome é obrigatório!'),
        })
    });
   

    return (
    <>
    {!clienteId && <>
        <h1 className="azul-cabecalho">Cadastro de Cliente</h1>
        <p className="subheader-text mb-10">Realize o cadastro de seu cliente</p>
    </>}
    {clienteId && <>
        <h1 className="azul-cabecalho">Visualizando Cadastro</h1>
        <p className="subheader-text mb-10">Visualize e edite informações de seu cliente</p>
    </>}

        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                    <div className="row">
                        <div className="col-xl-4 col-md-12">
                            <label className="form-label">Nome completo <span class="text-danger">&nbsp;*</span></label>
                            <input
                                type="text"
                                name="name"
                                className={"form-control " + (formik.errors.name && formik.touched.name ? 'is-invalid' : '')}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name && formik.touched.name && <label className="invalid-feedback">{formik.errors.name}</label>}
                        </div>
                        <div className="col-xl-4 col-md-12">
                            <label className="form-label">E-mail</label>
                            <input
                                type="text"
                                name="email"
                                className={"form-control " + (formik.errors.email && formik.touched.email ? 'is-invalid' : '')}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email && <label className="invalid-feedback">{formik.errors.email}</label>}
                        
                        </div>
                        <div className="col-xl-4 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Data de nascimento</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    max="2999-12-31"
                                    className={"form-control " + (formik.errors.birthday && formik.touched.birthday ? 'is-invalid' : '')}
                                    value={formik.values.birthday}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.birthday && formik.touched.birthday && <label className="invalid-feedback">{formik.errors.birthday}</label>}
                            </div>
                        </div>
                       
                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="form-group">
                                <label className="form-label">Tipo</label>
                                <Select 
                                    name="document_type"
                                    isSearchable={false}
                                    options={person_types}
                                    className={formik.errors.document_type && formik.touched.document_type ? 'is-invalid' : ''}
                                    onChange={(value) => {
                                        formik.setFieldValue('document_type', value)
                                        formik.setFieldValue('document_number', '');
                                    }}
                                    value={formik.values.document_type}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />                         
                                {formik.errors.document_type && formik.touched.document_type && <label className="invalid-feedback">{formik.errors.document_type}</label>}
                            </div>
                        </div>
                    { formik.values.document_type != null &&
                        <div className="col-xl-8">
                            <div className="form-group">
                                <label className="form-label">{formik.values.document_type.id == 'pf' ? 'CPF' : 'CNPJ'}</label>
                                <input
                                    type="text"
                                    name="document_number"
                                    className={"form-control " + (formik.errors.document_number && formik.touched.document_number ? 'is-invalid' : '')}
                                    value={formik.values.document_number}
                                    onChange={(evt) => formik.setFieldValue('document_number', documentMask(evt.target.value))}
                                />                       
                                {formik.errors.document_number && formik.touched.document_number && <label className="invalid-feedback">{formik.errors.document_number}</label>}
                            </div>
                        </div>
                    }
                    </div>
                    
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="form-group">
                                <label className="form-label">CEP</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    className={"form-control " + (formik.errors.postal_code && formik.touched.postal_code ? 'is-invalid' : '')}
                                    value={formik.values.postal_code}
                                    onChange={(evt) => formik.setFieldValue('postal_code', cepMask(evt.target.value))}

                                />
                                {formik.errors.postal_code && formik.touched.postal_code && <label className="invalid-feedback">{formik.errors.postal_code}</label>}
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Estado</label>

                                <Select 
                                    name="state"
                                    isSearchable={true}
                                    isClearable={true}

                                    options={states}
                                    className={formik.errors.state && formik.touched.state ? 'is-invalid' : ''}
                                    onChange={(value) => {
                                        formik.setFieldValue('state', value);
                                        
                                        if (value) {
                                            loadCidades(value.state);
                                        } else {
                                            formik.setFieldValue('city', null);
                                            loadCidades('');
                                        }
                                        
                                    }}
                                    value={formik.values.state}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.state}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />

                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Cidade</label>
                                <Select 
                                    name="city"
                                    isSearchable={true}
                                    isClearable={true}
                                    options={cities}
                                    className={formik.errors.city && formik.touched.city ? 'is-invalid' : ''}
                                    onChange={(value) => formik.setFieldValue('city', value)}
                                    value={formik.values.city}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Endereço</label>
                                <input
                                    type="text"
                                    name="address"
                                    className={"form-control " + (formik.errors.address && formik.touched.address ? 'is-invalid' : '')}
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.address && formik.touched.address && <label className="invalid-feedback">{formik.errors.address}</label>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Telefone 1</label>
                                <input
                                    type="text"
                                    name="phone_1"
                                    className={"form-control " + (formik.errors.phone_1 && formik.touched.phone_1 ? 'is-invalid' : '')}
                                    value={formik.values.phone_1}
                                    onChange={(evt) => formik.setFieldValue('phone_1', phoneMask(evt.target.value))}
                                />
                                {formik.errors.phone_1 && formik.touched.phone_1 && <label className="invalid-feedback">{formik.errors.phone_1}</label>}
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Telefone 2</label>
                                <input
                                    type="text"
                                    name="phone_2"
                                    className={"form-control " + (formik.errors.phone_2 && formik.touched.phone_2 ? 'is-invalid' : '')}
                                    value={formik.values.phone_2}
                                    onChange={(evt) => formik.setFieldValue('phone_2', phoneMask(evt.target.value))}

                                />
                                {formik.errors.phone_2 && formik.touched.phone_2 && <label className="invalid-feedback">{formik.errors.phone_2}</label>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Observações</label>
                                <textarea
                                    rows="4"
                                    name="observations"
                                    className={"form-control " + (formik.errors.observations && formik.touched.observations ? 'is-invalid' : '')}
                                    value={formik.values.observations}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.observations && formik.touched.observations && <label className="invalid-feedback">{formik.errors.observations}</label>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" className="btn btn-primary btnDefault mb-10" style={{width: '230px'}} onClick={formik.handleSubmit}>SALVAR</button>
    </>
    );
}