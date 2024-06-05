import React, {useEffect} from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerProfissionais(props) {
    const dispatch = useDispatch();

	const profissionais = useSelector(state => state.app.professionals);

    const formik = props.formik;
    //const _onChange = props.onChange;
    const _value = props.value;
    const fieldName = props.fieldName;

	useEffect(() => {
        dispatch({
            type: 'GET_PROFESSIONALS',
            payload: {}
        });
	}, []);

    const FieldFormik = () => {
        return (
            <>
            <Select 
                name={fieldName}
                isSearchable={true}
                isClearable={true}
                options={profissionais.map((profissional)=>{
                    return {
                        label: profissional.nome,
                        value: profissional.id,
                    }
                })}
                className={formik.errors[fieldName] && formik.touched[fieldName] ? 'is-invalid' : ''}
                onChange={(value) => {
                    if (value == null)
                    formik.setFieldValue(fieldName, '')
                    else
                    formik.setFieldValue(fieldName, value.value)

                    if ( props.callbackOnChange && value != null ) {
                        props.callbackOnChange(value.value);
                    }
                }}
                value={_value != "" ? profissionais.filter(opt => opt.id == formik.values[fieldName])[0] : null}
                placeholder={props.placeholder}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors[fieldName] && formik.touched[fieldName] && <label className="invalid-feedback">{formik.errors[fieldName]}</label>}
            </>
        )
    }



    return (
        
        <>
            <label className="form-label">Profissional</label>
            <FieldFormik />            
        </>
    )
}