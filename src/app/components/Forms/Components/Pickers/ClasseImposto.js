import React from "react";
import Select from 'react-select';

const oprions_classe_imposto = [
    {"name": "[selecione]", "id": ""},
    {"name": "Comda e Outros", "id": "REF3170731"},
    {"name": "Bebidas", "id": "REF4051042"},
];

export default function PickerClasseImposto(props) {

    const formik = props.formik;

    return (
        <>
            <label className="form-label">Classe de Imposto</label>
            <Select 
                name="classe_imposto"
                isSearchable={true}
                options={oprions_classe_imposto}
                className={formik.errors.classe_imposto && formik.touched.classe_imposto ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('classe_imposto', value.id)
                }}
                value={formik.values.classe_imposto != "" ? oprions_classe_imposto.filter(opt => opt.id == formik.values.classe_imposto)[0] : oprions_classe_imposto[0]}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors.classe_imposto && formik.touched.classe_imposto && <label className="invalid-feedback">{formik.errors.classe_imposto}</label>}
        </>
    )
}