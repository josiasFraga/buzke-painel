import React from "react";
import Select from 'react-select';

const options_telefone_ddi = [
    {"name": "+55", "id": "55", "flag" : "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png"},
    {"name": "+598", "id": "598", "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/2560px-Flag_of_Uruguay.svg.png"},
];

export default function PickerDdi(props) {

    const formik = props.formik;

    return (
        <>
            <Select 
                name="telefone_ddi"
                isSearchable={true}
                options={options_telefone_ddi}
                className={formik.errors.telefone_ddi && formik.touched.telefone_ddi ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('telefone_ddi', value.id);
                    if ( props.changeCallback ) {
                        props.changeCallback();
                    }
                }}
                value={formik.values.telefone_ddi != "" ? options_telefone_ddi.filter(opt => opt.id == formik.values.telefone_ddi)[0] : options_telefone_ddi[0]}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => { 
                    return(
                        <>
                        <img src={option.flag}  width={"20px"}/>
                        {" " + option.name}
                        </>
                    )
                } }
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors.telefone_ddi && formik.touched.telefone_ddi && <label className="invalid-feedback">{formik.errors.telefone_ddi}</label>}
        </>
    )
}