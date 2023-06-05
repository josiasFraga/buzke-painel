import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerPadelCategories(props) {
    const dispatch = useDispatch();

    const categorias = useSelector(state => state.app.padel_categories);
    const formik = props.formik;
    const name = props.name;
    const showExtra = props.showExtra;
    let _arr_categorias = [];

    if ( showExtra ) {
        const option_add = [{
            PadelCategoria: {
                id: "0",
                titulo: "Outra"
            }
        }]
        _arr_categorias = [...option_add, ...categorias];
    } else {
        _arr_categorias = categorias;
    }

    useEffect(() => {
        dispatch({type: 'LOAD_PADEL_CATEGORIES'});
    }, []);

    let name_split = name.split(".");
    let defaultValue = formik.values[name];

    if ( name_split.length == 2 ) {
        defaultValue = formik.values[name_split[0]][name_split[1]];
    }

    if ( name_split.length == 3 ) {
        defaultValue = formik.values[name_split[0]][name_split[1]][name_split[2]];
    }

    return (
        <>
            <label className="form-label">Categoria</label>
            <Select 
                name={name}
                isSearchable={true}
                options={_arr_categorias}
                className={props.field_invalid ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue(name, value.PadelCategoria.id)
                }}
                value={defaultValue != "" ? _arr_categorias.filter(opt => opt.PadelCategoria.id == defaultValue)[0] : null}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.PadelCategoria.titulo}
                getOptionValue={(option) => option.PadelCategoria.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors[name] && formik.touched[name] && <label className="invalid-feedback">{formik.errors[name]}</label>}
        </>
    )
}