import React from "react";
import Select from 'react-select';

const options_pais = [
    {"name": "Brasil", "id": "Brasil"},
    {"name": "Uruguai", "id": "Uruguai"},
];

export default function PickerPais(props) {

    const formik = props.formik;

    return (
        <>
            <label className="form-label">País</label>
            <Select 
                name="pais"
                isSearchable={true}
                options={options_pais}
                className={formik.errors.pais && formik.touched.pais ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('pais', value.id)
                }}
                value={formik.values.pais != "" ? options_pais.filter(opt => opt.id == formik.values.pais)[0] : options_pais[0]}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.pais && formik.touched.pais && <label className="invalid-feedback">{formik.errors.pais}</label>}
        </>
    )
}