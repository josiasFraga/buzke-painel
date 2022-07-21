import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { useFormik } from 'formik';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input';

const BtnCancelar = styled.button`
    width: 160px;
    float: right;
`;

const BtnSalvar = styled.button`
    width: 160px;
    float: right;
`;

export default function FormContribuicao(props) {
    const Title = () => (Object.keys(props.contribuicao).length == 0 ? `Adicionar nova contribuição` : `Alterar contribuição`);
    const emptyValues = {
        competencia: '',
        contribuicao: '',
    }
    const [initialValues, setInitialValues] = useState(emptyValues);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    });

    useEffect(() => {
        if (Object.keys(props.contribuicao).length == 0) {
            formik.setValues(emptyValues);
        } else {
            formik.setValues(props.contribuicao);
        }
    }, [props.contribuicao]);

    return (
        <Modal
            show={props.show}
            centered
        >
            <Modal.Header>
                <Modal.Title key={props.contribuicao}>
                    <Title />
                </Modal.Title>
 
                <button type="button" className="close" onClick={props.hide}>
                    <i aria-hidden="true" className="ki ki-close"></i>
                </button>

          </Modal.Header>
            <Modal.Body>
                <div className="form-group row">
                    <div className="col-xl-12 col-md-12">
                        <label className="form-label">Competência</label>
                        <input
                            name="competencia"
                            type="date"
                            className="form-control"
                            value={formik.values.competencia}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xl-12 col-md-12">
                        <label className="form-label">Salário de contribuição</label>
                        <CurrencyInput
                            name="contribuicao"
                            className={"form-control " + (formik.errors.contribuicao && formik.touched.contribuicao ? 'is-invalid' : '')}
                            value={formik.values.contribuicao}
                            prefix=" "
                            decimalSeparator=","
                            thousandSeparator="."
                            selectAllOnFocus={true}
                            onChangeEvent={(ev, maskedvalue, floatvalue) => formik.setFieldValue('contribuicao', floatvalue)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <BtnSalvar
                            type="button"
                            className="btn btn-primary"
                            onClick={() => props.salvarContribuicao(formik.values)}
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