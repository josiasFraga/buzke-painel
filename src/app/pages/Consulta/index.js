import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {useFormik} from 'formik';
import Select from 'react-select';
import * as yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import BlockUi from 'react-block-ui';
import { Modal } from "react-bootstrap";

import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";
import AddressReport from './components/AddressReport';
import VehiclesReport from './components/VehiclesReport';
import { cpfMask, cnpjMask } from '../../../_metronic/_helpers/MasksHelper';

export function Consulta() {
    const dispatch = useDispatch();

    const [modalPacoteIsOpen, setModalPacoteIsOpen] = useState(false);

    const [queryTypes, setQueryTypes] = useState([]);


    const queryData = useSelector(state => state.app.query_data);

    const documentMask = value => {
        if (formik.values.document_type.id === 'CPF') {
            return cpfMask(value);
        } else if (formik.values.document_type.id == 'CNPJ') {
            return cnpjMask(value);
        }
        return value;
    }

    const formik = useFormik({
        initialValues: {
            'document_type': null,
            'document': '',
            'query_type': null,
            'accept_terms': false
        },
        validationSchema: yup.object().shape({
            document_type: yup.object().nullable().required('Este campo é obrigatório!'),
            document: yup.string().required('Este campo é obrigatório!'),
            query_type: yup.object().nullable().required('Este campo é obrigatório!'),
        }),
        onSubmit: (values, {setSubmitting}) => {
            if (!window.confirm("Esta consulta será cobrada, deseja continuar?")) {
                   return false;
            }
            setModalPacoteIsOpen(false);
            if (values.document_type.id === 'CPF' && !cpf.isValid(values.document)) {
                alert("CPF inválido.");
                return;
            }
            if (values.document_type.id === 'CNPJ' && !cnpj.isValid(values.document)) {
                alert("CNPJ inválido.");
                return;
            }

            if (!values.accept_terms) {
                alert("É necessário aceitar os termos de uso para prosseguir.");
                return;
            }

            dispatch({
                type: 'QUERY_DATA',
                payload: {
                    values: values,
                    setSubmitting: setSubmitting
                }
            })
        },        
      });

      useEffect(() => {
        if (formik.values.document_type) {
            if (formik.values.document_type.id != 'plate') {
                setQueryTypes([
                    {name: 'Veículos', id: 'vehicles'},
                    {name: 'Endereço', id: 'address'}
                ]);
            } else if (formik.values.document_type.id == 'plate') {
                setQueryTypes([
                    {name: 'Veículos', id: 'vehicles'},
                ]);
            } else {
                setQueryTypes([]);
            }
        }
      }, [formik.values.document_type]);

    return (
    <>
    <Modal
      show={modalPacoteIsOpen}
      onHide={() => setModalPacoteIsOpen(false)}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      >
          <Modal.Header style={{padding: '20px 30px 0px 0px', border: 'none'}}>
            <h5 className="modal-title">&nbsp;</h5>
            <button type="button" className="close" onClick={() => setModalPacoteIsOpen(false)}>
                <i aria-hidden="true" className="ki ki-close"></i>
            </button>

          </Modal.Header>
          <Modal.Body>
              <div className="row flex-column" style={{padding: '0px 20px 20px 20px', textAlign: 'center', alignItems: 'center', color: '#293667'}}>
                <h1>Escolha o plano</h1>
                <span className="font-size-sm mb-5" style={{width: '60%'}}>This should talk about your product and all features that will include.</span>

                <div className="d-flex" style={{alignContent: 'space-between'}}>
                    <div className="d-flex flex-column" style={{borderRadius: '11px', alignItems: 'center', padding: '15px'}}>
                        <span className="font-size-h3 azul-cabecalho font-weight-boldest mb-5">STARTER</span>
                        <span className="mb-5 font-size-sm azul-cabecalho" style={{opacity: 0.35}}>This should talk about your product and all .</span>
                        <h1 className="mb-5 font-weight-boldest azul-cabecalho">R$ 10,00</h1>
                        <button type="button" className="btn btn-contratar mb-5" style={{width: '90%'}} onClick={formik.handleSubmit}>CONTRATAR</button>

                    </div>
                    <div className="d-flex flex-column" style={{borderRadius: '11px', backgroundColor: '#F5F7FA', alignItems: 'center', padding: '15px'}}>
                        <span className="font-size-h3 primary font-weight-boldest mb-5">PRO</span>
                        <span className="mb-5 font-size-sm azul-cabecalho" style={{opacity: 0.35}}>This should talk about your product and all .</span>
                        <h1 className="mb-5 font-weight-boldest primary">R$ 10,00</h1>
                        <button type="button" className="btn btn-primary mb-5" style={{width: '90%', color: '#D4D6E0'}} onClick={formik.handleSubmit}>CONTRATAR</button>

                    </div>
                </div>

              </div>
          </Modal.Body>
          </Modal>
        <h1 className="azul-cabecalho">Jusfinder</h1>
        <p className="subheader-text mb-10">Realize buscas de dados.</p>
        <BlockUi tag="div" blocking={formik.isSubmitting}>
            <div className="row mb-5">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <div className="row mb-5">
                            <div className="col">
                                <label className="label-form">Tipo de documento <span class="text-danger">&nbsp;*</span></label>
                                <Select 
                                    name="document_type"
                                    options={[
                                        {name: 'CPF', id: 'CPF'},
                                        {name: 'CNPJ', id: 'CNPJ'},
                                        {name: 'Placa', id: 'plate'},
                                    ]}
                                    className={(formik.errors.document_type && formik.touched.document_type ? 'is-invalid' : '')}
                                    onChange={(value) => {
                                        formik.setFieldValue('document_type', value)
                                        formik.setFieldValue('document', '');
                                    }}
                                    value={formik.values.document_type}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {formik.errors.document_type && formik.touched.document_type && <label className="invalid-feedback">{formik.errors.document_type}</label>}
                                
                            </div>
                        </div>
                    
                        { formik.values.document_type != null &&
                        <div className="row mb-5">
                            <div className="col">
                                <label className="label-form">Nº do documento <span class="text-danger">&nbsp;*</span></label>
                                <input
                                    name="document"
                                    className={"form-control " + (formik.errors.document && formik.touched.document ? 'is-invalid' : '')}
                                    onChange={(evt) => formik.setFieldValue('document', documentMask(evt.target.value))}
                                    value={formik.values.document}
                                    name="document"

                                />
                                {formik.errors.document && formik.touched.document && <label className="invalid-feedback">{formik.errors.document}</label>}

                            </div>
                        </div>
                        }
                        <div className="row">
                            <div className="col">
                                <label className="label-form">Tipo de consulta <span class="text-danger">&nbsp;*</span></label>
                                <Select 
                                    name="query_type"
                                    options={queryTypes}
                                    className={(formik.errors.query_type && formik.touched.query_type ? 'is-invalid' : '')}
                                    onChange={(value) => formik.setFieldValue('query_type', value)}
                                    value={formik.values.query_type}
                                    placeholder="Selecione.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                                {formik.errors.query_type && formik.touched.query_type && <label className="invalid-feedback">{formik.errors.query_type}</label>}
                                
                            </div>
                        </div>

                        
                    </div>

                </div>

            </div>
            
            <div className="d-flex flex-column">
                <FormControlLabel
                    checked={formik.values.accept_terms}
                    onChange={() => formik.setFieldValue('accept_terms', !formik.values.accept_terms)}
                    control={
                        <Checkbox
                        color="default"
                        value="checkedG"
                        inputProps={{
                            "aria-label": "checkbox with default color"
                        }}
                        />
                    }
                    label="Estou ciente de tudo que estou de acordo apenas pelo fato de que se penso logo existo"
                    />

                <button type="button" className="btn btn-primary mb-10" onClick={() => setModalPacoteIsOpen(true)} style={{width: '150px'}}>CONSULTAR</button>
            </div>

            {Object.keys(queryData).length > 0 &&
            <div className="d-flex" style={{cursor: 'pointer'}} onClick={() => window.open(`${process.env.REACT_APP_API_URL}/${queryData.pdf}`)}>
                <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                    <i className="flaticon2-protected"></i>
                    <span className="pulse-ring"></span>
                </a>
                <span className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Sua consulta está disponível para download, clique aqui.</span>
            </div>
            }
        </BlockUi>
    </>
    );
}