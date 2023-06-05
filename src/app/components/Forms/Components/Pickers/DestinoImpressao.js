import React from "react";
import Select from 'react-select';

const oprions_destino_impressao = [
    {"name": "[selecione]", "id": ""},
    {"name": "Cozinha", "id": "cozinha"},
    {"name": "Copa", "id": "copa"},
];

export default function PickerDestinoImpressao(props) {

    const formik = props.formik;

    return (
        <>
            <label className="form-label">Destino de Impressão</label>
            <Select 
                name="destino_impressao"
                isSearchable={true}
                options={oprions_destino_impressao}
                className={formik.errors.destino_impressao && formik.touched.destino_impressao ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('destino_impressao', value.id)
                }}
                value={formik.values.destino_impressao != "" ? oprions_destino_impressao.filter(opt => opt.id == formik.values.destino_impressao)[0] : oprions_destino_impressao[0]}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />
            {formik.errors.destino_impressao && formik.touched.destino_impressao && <label className="invalid-feedback">{formik.errors.destino_impressao}</label>}
        </>
    )
}