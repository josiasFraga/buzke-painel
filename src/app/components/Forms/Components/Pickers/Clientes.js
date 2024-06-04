import React, { useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerClientes(props) {
    const dispatch = useDispatch();

    const clientes = useSelector(state => state.app.customers_list);
    const formik = props.formik;
    const _onChange = props.onChange;
    const _value = props.value;
    const fieldName = props.fieldName;

    useEffect(() => {
        dispatch({type: 'LOAD_CUSTOMERS_LIST'});
    }, []);

    const FieldFormik = () => {
        return (
            <>
            <Select 
                name={fieldName}
                isSearchable={true}
                isClearable={true}
                options={clientes}
                className={formik.errors[fieldName] && formik.touched[fieldName] ? 'is-invalid' : ''}
                onChange={(value) => {
                    if (value == null)
                    formik.setFieldValue(fieldName, null)
                    else
                    formik.setFieldValue(fieldName, value.value)

                    if (props.captureAddress) {
                        if (value == null) {
                            props.captureAddress('');                            
                        } else {
                            const client_selected = clientes.filter(opt => opt.value == value.value)[0]
                            props.captureAddress(client_selected.endereco); 
                        }
                    }

                    if ( props.callbackOnChange && value != null ) {
                        props.callbackOnChange(value.value);
                    }
                }}
                value={_value != "" ? clientes.filter(opt => opt.value == formik.values[fieldName])[0] : null}
                placeholder={props.placeholder}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors[fieldName] && formik.touched[fieldName] && <label className="invalid-feedback">{formik.errors[fieldName]}</label>}
            </>
        )
    }

    const FieldCustom = () => {
        return (
            <>
            <Select 
                name={fieldName}
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