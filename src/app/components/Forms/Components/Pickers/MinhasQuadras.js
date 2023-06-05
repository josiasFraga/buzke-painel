import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerMinhasQuadras(props) {
    const dispatch = useDispatch();

    const quadras = useSelector(state => state.app.courts_services);
    const formik = props.formik;
    const name = props.name;
    const showExtra = props.showExtra;
    let _arr_quadras = [];

    if ( showExtra ) {
        const option_add = [{
            ClienteServico: {
                id: "0",
                nome: "Outra"
            }
        }]
        _arr_quadras = [...option_add, ...quadras];
    } else {
        _arr_quadras = quadras;
    }

    useEffect(() => {
        dispatch({type: 'LOAD_COURTS_SERVICES'});
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
            <label className="form-label">Quadra</label>
            <Select 
                name={name}
                isSearchable={true}
                options={_arr_quadras}
                className={props.field_invalid ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue(name, value.ClienteServico.id)
                }}
                value={ defaultValue != "" ? _arr_quadras.filter(opt => opt.ClienteServico.id == defaultValue)[0] : null}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.ClienteServico.nome}
                getOptionValue={(option) => option.ClienteServico.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors[name] && formik.touched[name] && <label className="invalid-feedback">{formik.errors[name]}</label>}
        </>
    )
}