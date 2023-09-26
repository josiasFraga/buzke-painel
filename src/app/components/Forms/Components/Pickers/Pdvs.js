import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

export default function PickerEstado(props) {
    const dispatch = useDispatch();

    const pos = useSelector(state => state.app.pos);
    const formik = props.formik;

    useEffect(() => {
        
        dispatch({type: 'LOAD_POS'});
    }, []);

    useEffect(() => {
        
        if ( pos.length > 0 ) {
            formik.setFieldValue('pdv_id', pos[0]['Pdv']['id'])
        }
    }, [pos]);

    return (
        <>
            <label className="form-label">PDV</label>
            <Select 
                name="pdv_id"
                isSearchable={true}
                options={pos}
                className={formik.errors.pdv_id && formik.touched.pdv_id ? 'is-invalid' : ''}
                onChange={(value) => {
                    formik.setFieldValue('pdv_id', value.Pdv.id);
                    if ( props.setIsDelivery ) {
                        if ( value != "" && value != null ) {
                            const delivery = value.Pdv.delivery;
                            props.setIsDelivery(delivery);
                        } else {
                            props.setIsDelivery('N');    
                        }
                    }
                }}
                value={formik.values.pdv_id != "" ? pos.filter(opt => opt.Pdv.id == formik.values.pdv_id)[0] : null}
                placeholder="Selecione uma opção.."
                getOptionLabel={(option) => { return option.Pdv.nome + ' (+' + option.Pdv.taxa_adicional + '%)' }}
                getOptionValue={(option) => option.Pdv.id}
                noOptionsMessage={() => <span>Sem resultados.</span>}
            />                         
            {formik.errors.pdv_id && formik.touched.pdv_id && <label className="invalid-feedback">{formik.errors.pdv_id}</label>}
        </>
    )
}