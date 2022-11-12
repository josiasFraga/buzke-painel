import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerCidade(props) {
    const dispatch = useDispatch();

    const cidades = useSelector(state => state.app.cities);
    const formik = props.formik;

    return (
        <>
            <label className="form-label">Cidade</label>
            <Select 
                name="localidade"
                isSearchable={true}
                options={cidades}
                className={formik.errors.localidade && formik.touched.localidade ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('localidade', value.Localidade.loc_nu_sequencial)
                }}
                value={formik.values.localidade != "" ? cidades.filter(opt => opt.Localidade.loc_nu_sequencial == formik.values.localidade)[0] : null}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.Localidade.loc_no}
                getOptionValue={(option) => option.Localidade.loc_nu_sequencial}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.localidade && formik.touched.localidade && <label className="invalid-feedback">{formik.errors.localidade}</label>}
        </>
    )
}