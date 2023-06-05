import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerEstado(props) {
    const dispatch = useDispatch();

    const estados = useSelector(state => state.app.ufs);
    const formik = props.formik;

    useEffect(() => {
        
        dispatch({type: 'LOAD_UFS'});
    }, []);

    useEffect(() => {
        
        dispatch({type: 'LOAD_CITIES', payload: {uf : formik.values.estado}});
    }, [formik.values.estado]);

    return (
        <>
            <label className="form-label">Estado</label>
            <Select 
                name="estado"
                isSearchable={true}
                options={estados}
                className={formik.errors.estado && formik.touched.estado ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('estado', value.Uf.ufe_sg)
                    formik.setFieldValue('localidade', "")
                }}
                value={formik.values.estado != "" ? estados.filter(opt => opt.Uf.ufe_sg == formik.values.estado)[0] : null}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.Uf.ufe_no}
                getOptionValue={(option) => option.Uf.ufe_sg}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.estado && formik.touched.estado && <label className="invalid-feedback">{formik.errors.estado}</label>}
        </>
    )
}