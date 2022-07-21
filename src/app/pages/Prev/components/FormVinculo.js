import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { useFormik } from 'formik';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';
import Select from 'react-select';

const BtnCancelar = styled.button`
    width: 160px;
    float: right;
`;

const BtnSalvar = styled.button`
    width: 160px;
    float: right;
`;

export default function FormVinculo(props) {
    const Title = () => (Object.keys(props.vinculo).length == 0 ? `Adicionar novo vínculo` : `Alterar vínculo`);
    const emptyValues = {
        company_name: '',
        start_date: '',
        end_date: '',
        activity_type: {id: 'NORMAL', name: 'NORMAL'}
    }
    const activity_types = [
        {id: 'NORMAL', name: 'NORMAL'},
        {id: 'PROFESSOR', name: 'PROFESSOR'},
        {id: 'RURAL', name: 'RURAL'},
        {id: 'ESPECIAL_25', name: 'ATV. BAIXO RISCO (ESPECIAL 25)'},
        {id: 'ESPECIAL_20', name: 'ATV. MÉDIO RISCO (ESPECIAL 20)'},
        {id: 'ESPECIAL_15', name: 'ATV. ALTO RISCO (ESPECIAL 15)'},
    ];
    const [initialValues, setInitialValues] = useState(emptyValues);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    });

    useEffect(() => {
        if (Object.keys(props.vinculo).length == 0) {
            formik.setValues(emptyValues);
        } else {
            formik.setValues(props.vinculo);
        }
    }, [props.vinculo]);

    return (
        <Modal
            show={props.show}
            centered
        >
            <Modal.Header>
                <Modal.Title key={props.vinculo}>
                    <Title />
                </Modal.Title>
 
                <button type="button" className="close" onClick={props.hide}>
                    <i aria-hidden="true" className="ki ki-close"></i>
                </button>

          </Modal.Header>
            <Modal.Body>
                <div className="form-group row">
                    <div className="col-xl-12">
                        <label className="form-label">Vínculo</label>
                        <input
                            name="company_name"
                            type="text"
                            placeholder="Digite aqui o nome do vínculo"
                            className="form-control"
                            value={formik.values.company_name}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xl-12 col-md-12">
                        <label className="form-label">Tipo do vínculo</label>
                        <Select 
                            name="activity_type"
                            theme={customSelectStyle}
                            isSearchable={false}
                            options={activity_types}
                            onChange={(value) => formik.setFieldValue('activity_type', value)}
                            value={formik.values.activity_type}
                            placeholder="Selecione.."
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            noOptionsMessage={() => <span>Sem resultados.</span>}
                        />                         
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xl-6 col-md-12">
                        <label className="form-label">Data de início</label>
                        <input
                            name="start_date"
                            type="date"
                            className="form-control"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="col-xl-6 col-md-12">
                        <label className="form-label">Data de fim</label>
                        <input
                            name="end_date"
                            type="date"
                            className="form-control"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <BtnSalvar
                            type="button"
                            className="btn btn-primary"
                            onClick={() => props.salvarVinculo(formik.values)}
                        >Salvar</BtnSalvar>
                        <BtnCancelar
                            type="button"
                            className="btn btn-outline-secondary mr-5"
                            onClick={props.hide}
                        >Cancelar</BtnCancelar>

                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}