import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerProdutoCategoria(props) {
    const dispatch = useDispatch();

    const categorias = useSelector(state => state.app.products_categories);
    const formik = props.formik;

    useEffect(() => {
        
        dispatch({type: 'LOAD_PRODUCTS_CATEGORIES'});
    }, []);

    return (
        <>
            <label className="form-label">Categoria</label>
            <Select 
                name="categoria_id"
                isSearchable={true}
                options={categorias}
                className={formik.errors.categoria_id && formik.touched.categoria_id ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('categoria_id', value.ProdutoCategoria.id);
                }}
                value={formik.values.categoria_id != "" ? categorias.filter(opt => opt.ProdutoCategoria.id == formik.values.categoria_id)[0] : null}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.ProdutoCategoria.nome}
                getOptionValue={(option) => option.ProdutoCategoria.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.categoria_id && formik.touched.categoria_id && <label className="invalid-feedback">{formik.errors.categoria_id}</label>}
        </>
    )
}