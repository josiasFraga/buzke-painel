import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { cpfMask, phoneUyMask, phoneMask, cepMask2 } from '../../../_metronic/_helpers/MasksHelper';

import PickerNacionalidade from '../Forms/Components/Pickers/Nacionalidade';
import PickerDdi from '../Forms/Components/Pickers/DDI';
import PickerPais from "../Forms/Components/Pickers/Pais";

import Form from 'react-bootstrap/Form';


import { toast } from 'react-toastify';
import BlockUi from 'react-block-ui';

export function FormNewCustomer(props) {
    const dispatch = useDispatch();
    const address = useSelector(state => state.app.address_by_postal_code);
    const loading_address = useSelector(state => state.app.is_address_by_postal_code_loading);

    const formik = props.formik;

    useEffect(() => {

        if (address.erro) {
            toast.error('Verifique o CEP digitado!');
            formik.setFieldValue("cep", "");
        } else {
            formik.setFieldValue("localidade", address.localidade);
            formik.setFieldValue("uf", address.uf);
            formik.setFieldValue("bairro", address.bairro);
            formik.setFieldValue("endereco", address.logradouro);
        }

 
    }, [address]);

    const buscaDadosEnderecoPeloCEP = (cep) => {

        dispatch({
            type: 'LOAD_ADDRESS_BY_POSTAL_CODE',
            payload: cep
        });

    }
    

    return (
    <BlockUi tag="div" blocking={formik.isSubmitting || loading_address}>
        <div className="row">

            <div className="col-xl-12 col-md-12">
                <h4>Dados Básicos:</h4>
            </div>

            <div className="col-xl-12 col-md-12 mb-8">
                <PickerNacionalidade formik={props.formik} />
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Nome completo <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="nome"
                    autoFocus
                    className={"form-control " + (formik.errors.nome && formik.touched.nome ? 'is-invalid' : '')}
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                />
                {formik.errors.nome && formik.touched.nome && <label className="invalid-feedback">{formik.errors.nome}</label>}
            </div>
            {
                formik.values.nacionalidade == "Brasil" &&
                <div className="col-md-12 mb-8">
                    <label className="form-label">CPF </label>
                    <input
                        type="tel"
                        name="cpf"
                        className={"form-control " + (formik.errors.cpf && formik.touched.cpf ? 'is-invalid' : '')}
                        value={formik.values.cpf}
                        maxLength={14}
                        onChange={(evt) => {
                            formik.setFieldValue('cpf', cpfMask(evt.target.value))
                        }}
                    />
                    {formik.errors.cpf && formik.touched.cpf && <label className="invalid-feedback">{formik.errors.cpf}</label>}
                </div>
            }

            <div className="col-md-12 mb-8">
                <div className="row">
                    <div className="col-12">
                        <label className="form-label">Telefone </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <PickerDdi formik={formik} changeCallback={()=>{
                            formik.setFieldValue("telefone", "");
                        }} />
                    </div>
                    <div className="col-9">
                        <input
                            type="tel"
                            name="telefone"
                            className={"form-control " + (formik.errors.telefone && formik.touched.telefone ? 'is-invalid' : '')}
                            value={formik.values.telefone}
                            maxLength={formik.values.telefone_ddi == "55" ? 14 : 8}
                            onChange={(evt) => {
                                if ( formik.values.telefone_ddi == "55" )
                                    formik.setFieldValue('telefone', phoneMask(evt.target.value))
                                else if ( formik.values.telefone_ddi == "598" )
                                    formik.setFieldValue('telefone', phoneUyMask(evt.target.value))
                            }}
                        />
                        {formik.errors.cpf && formik.touched.cpf && <label className="invalid-feedback">{formik.errors.cpf}</label>}
                    </div>

                </div>
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Sexo</label>
                <Form.Check
                type="radio"
                label="Masculino"
                name="sexo"
                id="M"
                custom
                checked={formik.values.sexo == "M"}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("sexo", "M");
                    }
                }}
                />
                <Form.Check
                type="radio"
                label="Feminino"
                name="sexo"
                id="F"
                custom
                checked={formik.values.sexo == "F"}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("sexo", "F");
                    }
                }}
                />
                <Form.Check
                type="radio"
                label="Outro"
                name="sexo"
                id="O"
                custom
                checked={formik.values.sexo == "O"}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("sexo", "O");
                    }
                }}
                />
            </div>

            <div className="col-xl-12 col-md-12  mb-8">
                <label className="form-label">E-mail</label>
                <input
                    type="email"
                    name="email_cliente"
                    className={"form-control " + (formik.errors.email_cliente && formik.touched.email_cliente ? 'is-invalid' : '')}
                    value={formik.values.email_cliente}
                    onChange={formik.handleChange}
                />
                {formik.errors.email_cliente && formik.touched.email_cliente && <label className="invalid-feedback">{formik.email_cliente.email}</label>}
            
            </div>
            
            { 1 ==2 && <div className="col-xl-4 col-md-12">
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
            </div>}

            <div className="col-xl-12 col-md-12 mb-4">
                <h4>Dados de Endereço:</h4>
            </div>

            <div className="col-xl-12 col-md-12 mb-8">
                <PickerPais formik={formik} />
            </div>

            {formik.values.pais == "Brasil" && 
            <>
                <div className="col-4 mb-8">
                    <label className="form-label">CEP</label>
                    <input
                        type="text"
                        name="cep"
                        className={"form-control " + (formik.errors.cep && formik.touched.cep ? 'is-invalid' : '')}
                        value={formik.values.cep}
                        onChange={(evt) => {

                            formik.setFieldValue('cep', cepMask2(evt.target.value));

                            if ( evt.target.value != "" && evt.target.value.length == 9 ) {
                                buscaDadosEnderecoPeloCEP(evt.target.value);
                            }
                        }}
                        maxLength={9}
                    />
                    {formik.errors.cep && formik.touched.cep && <label className="invalid-feedback">{formik.errors.cep}</label>}
                </div>
            
                <div className="col-4 mb-8">
                    <label className="form-label">Cidade</label>
                    <input
                        type="text"
                        name="localidade"
                        className={"form-control " + (formik.errors.localidade && formik.touched.localidade ? 'is-invalid' : '')}
                        value={formik.values.localidade}
                        readOnly
                        placeholder="Digite o CEP"
                    />
                    {formik.errors.localidade && formik.touched.localidade && <label className="invalid-feedback">{formik.errors.localidade}</label>}
                </div>

                <div className="col-4 mb-8">
                    <label className="form-label">Estado</label>
                    <input
                        type="text"
                        name="uf"
                        className={"form-control " + (formik.errors.uf && formik.touched.uf ? 'is-invalid' : '')}
                        value={formik.values.uf}
                        readOnly
                        placeholder="Digite o CEP"
                    />
                    {formik.errors.uf && formik.touched.uf && <label className="invalid-feedback">{formik.errors.uf}</label>}

                </div>
            </>
            }

            <div className="col-md-3 mb-8">
                <label className="form-label">Bairro</label>
                <input
                    type="text"
                    name="bairro"
                    className={"form-control " + (formik.errors.bairro && formik.touched.bairro ? 'is-invalid' : '')}
                    value={formik.values.bairro}
                    onChange={formik.handleChange}
                />
                {formik.errors.bairro && formik.touched.bairro && <label className="invalid-feedback">{formik.bairro.email}</label>}
            </div>

            <div className="col-md-7">
                <label className="form-label">Endereço</label>
                <input
                    type="text"
                    name="endereco"
                    className={"form-control " + (formik.errors.endereco && formik.touched.endereco ? 'is-invalid' : '')}
                    value={formik.values.endereco}
                    onChange={formik.handleChange}
                    maxLength={80}
                />
                {formik.errors.endereco && formik.touched.endereco && <label className="invalid-feedback">{formik.errors.endereco}</label>}
            </div>

            <div className="col-md-2">
                <label className="form-label">Nº</label>
                <input
                    type="number"
                    name="n"
                    className={"form-control " + (formik.errors.n && formik.touched.n ? 'is-invalid' : '')}
                    value={formik.values.n}
                    maxLength={6}
                    onChange={formik.handleChange}
                />
                {formik.errors.n && formik.touched.n && <label className="invalid-feedback">{formik.errors.n}</label>}
            </div>
            
        </div>

    </BlockUi>
    );
}