import React, { useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerClientes(props) {
    const dispatch = useDispatch();

    const clientes = useSelector(state => state.app.customers_list);
    const formik = props.formik;
    const _onChange = props.onChange;
    const _value = props.value;

    useEffect(() => {
        dispatch({type: 'LOAD_CUSTOMERS_LIST'});
    }, []);

    const FieldFormik = () => {
        return (
            <>
            <Select 
                name="client_client_id"
                isSearchable={true}
                isClearable={true}
                options={clientes}
                className={formik.errors.client_client_id && formik.touched.client_client_id ? 'is-invalid' : ''}
                onChange={(value) => {
                    if (value == null)
                    formik.setFieldValue('client_client_id', null)
                    else
                    formik.setFieldValue('client_client_id', value.value)
                }}
                value={_value != "" ? clientes.filter(opt => opt.value == formik.values.client_client_id)[0] : null}
                placeholder={props.placeholder}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.client_client_id && formik.touched.client_client_id && <label className="invalid-feedback">{formik.errors.client_client_id}</label>}
            </>
        )
    }

    const FieldCustom = () => {
        return (
            <>
            <Select 
                name="client_client_id"
                isSearchable={true}
                isClearable={true}
                options={clientes}
                onChange={(value) => {
                    if (value == null)
                    _onChange(null)
                    else
                    _onChange(value.value)
                }}
                value={_value != "" ? clientes.filter(opt => opt.value == _value)[0] : null}
                placeholder={props.placeholder}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            </>
        )
    }

    //setFilterClient

    return (
        
        <>
            <label className="form-label">Cliente</label>
            {formik && <FieldFormik />}
            {!formik && <FieldCustom />}
            
        </>
    )
}