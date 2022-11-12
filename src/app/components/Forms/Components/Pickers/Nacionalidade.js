import React from "react";
import Select from 'react-select';

const options_nacionalidade = [
    {"name": "Brasileira", "id": "Brasil"},
    {"name": "Uruguaia", "id": "Uruguai"},
];

export default function PickerNacionalidade(props) {

    const formik = props.formik;

    return (
        <>
            <label className="form-label">Nacionalidade</label>
            <Select 
                name="nacionalidade"
                isSearchable={true}
                options={options_nacionalidade}
                className={formik.errors.nacionalidade && formik.touched.nacionalidade ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('nacionalidade', value.id)
                }}
                value={formik.values.nacionalidade != "" ? options_nacionalidade.filter(opt => opt.id == formik.values.nacionalidade)[0] : options_nacionalidade[0]}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.nacionalidade && formik.touched.nacionalidade && <label className="invalid-feedback">{formik.errors.nacionalidade}</label>}
        </>
    )
}