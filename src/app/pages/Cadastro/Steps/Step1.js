import React, {useEffect} from 'react';
import { cpfMask, cnpjMask, phoneMask, cepMask } from '../../../../_metronic/_helpers/MasksHelper';
import { useSelector, useDispatch } from 'react-redux';
import Select, { components } from 'react-select';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import axios from "axios";
import BlockUi from 'react-block-ui';
import RightInfo from '../components/RightInfo';

export default function Step1(props) {
    const dispatch = useDispatch();
    const states = useSelector(state => state.app.states);
    const cities = useSelector(state => state.app.cities);
    const professions = useSelector(state => state.app.professions);

    const loadCidades = (state, city = '') => {
        dispatch({type: 'LOAD_CITIES', payload: {state: state, callback: (_cities) => {
            if (city != '') {
                setTimeout(() => {
                    const found_city = _cities.find(value_city => value_city.name == city);

                    if (found_city) {
                        props.formik.setFieldValue('city', found_city);
                    }
                }, 1500);
            }
        }}});
    }

    const chooseCEP = async (cep) => {
            var request = new XMLHttpRequest();
            request.open('get', `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`, true);
            request.send();
            request.onload = function () {
                const result = JSON.parse(this.response);
                let state = states.find(state => state.state == result.uf);
                if (state) {
                    props.formik.setFieldValue('state', state);
                    props.formik.setFieldValue('address', result.logradouro);
                    props.formik.setFieldValue('district', result.bairro);
                    
                    loadCidades(state.state, result.localidade);
                }
            }

    }

    const avancar = async () => {
        const validation = await props.formik.validateForm();
        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) {
            if (!cpf.isValid(props.formik.values.document_number)) {
                alert("CPF inválido.");
                return;
            }
            props.setStep(1);
        }
    }

    return (
            <div className="row no-gutters mb-20">
                {/*<pre>
                {JSON.stringify(props.formik.values, null, '\t')}
                </pre>*/}
                <div className="col-xl-8">
                    <div className="border-radius-only-left" style={{backgroundColor: '#fff', padding: '40px', height: '100%'}}>
                    
                        <div className="row">
                            <div className="col-xl-4 d-flex mb-10">
                                <div>
                                    <div className={`step ${props.step == 0 ? 'active' : ''}`}><span>1</span></div>
                                </div>
                                <div className="step-info d-flex flex-column">
                                    <span className="step-title">Cadastro</span>
                                    <span className="step-description">preencha os seus dados</span>
                                </div>
                            </div>
                            <div className="col-xl-4 d-flex mb-10">
                                <div>
                                    <div className={`step ${props.step == 1 ? 'active' : ''}`}><span>2</span></div>
                                </div>
                                <div className="step-info d-flex flex-column">
                                    <span className="step-title">Financeiro</span>
                                    <span className="step-description">dados financeiros</span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-4">
                                <label className="form-label">Profissão <span class="text-danger">&nbsp;*</span></label>
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
                                />
                                {props.formik.errors.profession && props.formik.touched.profession && <label className="invalid-feedback">{props.formik.errors.profession}</label>}
                            </div>
                        </div>
                    { props.formik.values.profession != null && props.formik.values.profession.name === 'Advogado' &&
                        <div className="row mb-5">
                            <div className="col-xl-4">
                                <label className="form-label">Nº da OAB <span class="text-danger">&nbsp;*</span></label>
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
                                <label className="form-label">Estado <span class="text-danger">&nbsp;*</span></label>
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
                                />
                                {props.formik.errors.oab_state && props.formik.touched.oab_state && <label className="invalid-feedback">{props.formik.errors.oab_state}</label>}

                            </div>
                        </div>
                    }
                        
                        <div className="row mb-5">
                            <div className="col-xl-6">
                                <label className="form-label">Nome completo <span class="text-danger">&nbsp;*</span></label>
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
                                <label className="form-label">CPF <span class="text-danger">&nbsp;*</span></label>
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
                                <label className="form-label">E-mail <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    type="text"
                                    name="email"
                                    className={"form-control " + (props.formik.errors.email && props.formik.touched.email ? 'is-invalid' : '')}
                                    value={props.formik.values.email}
                                    onChange={props.formik.handleChange}
                                />
                                {props.formik.errors.email && props.formik.touched.email && <label className="invalid-feedback">{props.formik.errors.email}</label>}
                            
                            </div>
                            <div className="col-xl-6">
                                <label className="form-label">Telefone <span class="text-danger">&nbsp;*</span></label>
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
                                <label className="form-label">CEP <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    className={"form-control " + (props.formik.errors.postal_code && props.formik.touched.postal_code ? 'is-invalid' : '')}
                                    value={props.formik.values.postal_code}
                                    onBlur={(evt) => chooseCEP(evt.target.value)}
                                    onChange={(evt) => props.formik.setFieldValue('postal_code', cepMask(evt.target.value))}
                                    maxlength="10"
                                />
                                {props.formik.errors.postal_code && props.formik.touched.postal_code && <label className="invalid-feedback">{props.formik.errors.postal_code}</label>}

                            </div>
                            <div className="col-xl-4">
                                <label className="form-label">Estado <span class="text-danger">&nbsp;*</span></label>
                                <Select 
                                    name="state"
                                    isSearchable={true}
                                    isClearable={true}
                                    options={states}
                                    className={props.formik.errors.state && props.formik.touched.state ? 'is-invalid' : ''}
                                    onChange={(value) => {
                                        props.formik.setFieldValue('state', value);


                                        if (value) {
                                            if (value._load_city) {
                                                loadCidades(value.state, value._load_city);
                                            } else {
                                                loadCidades(value.state);
                                            }   
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
                                />
                            </div>
                            <div className="col-xl-4">
                                <label className="form-label">Cidade <span class="text-danger">&nbsp;*</span></label>
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
                                />
                            </div>
                        </div>

                        
                        
                        <div className="row mb-5">
                            <div className="col-xl-6">
                                <label className="form-label">Endereço <span class="text-danger">&nbsp;*</span></label>
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
                                <label className="form-label">Bairro <span class="text-danger">&nbsp;*</span></label>
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
                        
                        <div className="row mb-5">
                            
                            <div className="col-xl-6">
                                <label className="form-label">Senha <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    type="password"
                                    name="password"
                                    className={"form-control " + (props.formik.errors.password && props.formik.touched.password ? 'is-invalid' : '')}
                                    value={props.formik.values.password}
                                    onChange={props.formik.handleChange}
                                />
                                {props.formik.errors.password && props.formik.touched.password && <label className="invalid-feedback">{props.formik.errors.password}</label>}

                            </div>
                            <div className="col-xl-6">
                                <label className="form-label">Confirme a senha <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    type="password"
                                    name="confirmation_password"
                                    className={"form-control " + (props.formik.errors.confirmation_password && props.formik.touched.confirmation_password ? 'is-invalid' : '')}
                                    value={props.formik.values.confirmation_password}
                                    onChange={props.formik.handleChange}
                                />
                                {props.formik.errors.confirmation_password && props.formik.touched.confirmation_password && <label className="invalid-feedback">{props.formik.errors.confirmation_password}</label>}

                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-xl-6">
                                <label className="form-label">Se possuir um cupom de convênio, digite abaixo</label>
                                <input
                                    type="text"
                                    name="coupom"
                                    className={"form-control " + (props.formik.errors.coupom && props.formik.touched.coupom ? 'is-invalid' : '')}
                                    value={props.formik.values.coupom}
                                    onChange={props.formik.handleChange}
                                    onBlur={props.getCoupom}
                                />
                                {props.formik.errors.coupom && props.formik.touched.coupom && <label className="invalid-feedback">{props.formik.errors.coupom}</label>}
                            </div>
                        </div>


                        <div className="row mb-5">
                            <div className="col-xl-12">
                                <button type="button" onClick={avancar} className="btn btn-primary" style={{width: '100%', height: '50px'}}>AVANÇAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <RightInfo formik={props.formik} />
            </div>
    );
}
