import React from "react";
import Select from 'react-select';

const options_parte_cupom = [
    {"name": "[selecione]", "id": ""},
    {"name": "Parte 1", "id": "1"},
    {"name": "Parte 2", "id": "2"},
];

export default function PickerParteCupom(props) {

    const formik = props.formik;

    return (
        <>
            <label className="form-label">Parte do Cupom</label>
            <Select 
                name="parte_do_cupom"
                isSearchable={true}
                options={options_parte_cupom}
                className={formik.errors.parte_do_cupom && formik.touched.parte_do_cupom ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('parte_do_cupom', value.id)
                }}
                value={formik.values.parte_do_cupom != "" ? options_parte_cupom.filter(opt => opt.id == formik.values.parte_do_cupom)[0] : options_parte_cupom[0]}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors.parte_do_cupom && formik.touched.parte_do_cupom && <label className="invalid-feedback">{formik.errors.parte_do_cupom}</label>}
        </>
    )
}