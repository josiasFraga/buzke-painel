import React from 'react';
import { useSelector} from 'react-redux';
import Select from 'react-select';
import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";
  import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';

export default function Step3(props) {
    const indexes = useSelector(state => state.app.average_price_indexes);
    
    const proximo = async () => {
        const validation = await props.formik.validateForm();
        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }

    const checkInterest = () => {
        props.formik.setFieldValue('differences_has_interests', !props.formik.values.differences_has_interests);
    }

    return (<>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '40px'}}>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label">Índice que ajusta o saldo devedor <span className="text-danger">&nbsp;*</span></label>
                            <Select 
                                name="contract_balance_index"
                                theme={customSelectStyle}
                                className={props.formik.errors.contract_balance_index && props.formik.touched.contract_balance_index ? 'is-invalid' : ''}
                                options={
                                    [
                                        {
                                            id: null,
                                            name: 'NENHUM'
                                        },
                                        ...indexes
                                    ]
                                }
                                onChange={(value) => props.formik.setFieldValue('contract_balance_index', value)}
                                value={props.formik.values.contract_balance_index}
                                placeholder="Selecione.."
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                isClearable={true}
                                noOptionsMessage={() => <span>Sem resultados.</span>}
                            />
                            {props.formik.errors.contract_balance_index && props.formik.touched.contract_balance_index && <label className="invalid-feedback">{props.formik.errors.contract_balance_index}</label>}

                        </div>
                        <div className="col">
                            <label className="form-label">Índice que ajusta as parcelas pagas <span className="text-danger">&nbsp;*</span></label>
                            <Select 
                                name="contract_price_index"
                                theme={customSelectStyle}
                                className={props.formik.errors.contract_price_index && props.formik.touched.contract_price_index ? 'is-invalid' : ''}
                                options={
                                    [
                                        {
                                            id: null,
                                            name: 'NENHUM'
                                        },
                                        ...indexes
                                    ]
                                }
                                onChange={(value) => props.formik.setFieldValue('contract_price_index', value)}
                                value={props.formik.values.contract_price_index}
                                placeholder="Selecione.."
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                isClearable={true}
                                noOptionsMessage={() => <span>Sem resultados.</span>}
                            />
                            {props.formik.errors.contract_price_index && props.formik.touched.contract_price_index && <label className="invalid-feedback">{props.formik.errors.contract_price_index}</label>}

                            <FormControlLabel
                                onChange={checkInterest}
                                control={
                                    <Checkbox
                                        checked={props.formik.values.differences_has_interests}
                                        color="default"
                                        value="checkedG"
                                        inputProps={{
                                            "aria-label": "checkbox with default color"
                                        }}
                                    />
                                }
                                label="Desejo aplicar juros de 1% a.m. nas diferenças"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-4 col-md-12">
                <button type="button" className="btn btn-cinza" style={{width: '150px'}} onClick={() => props.setStep(props.step-1)}>VOLTAR</button>
            </div>
            <div className="col-xl-4 col-md-12"></div>
            <div className="col-xl-4 col-md-12">
                <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={proximo}>PRÓXIMO</button>
                
            </div>
        </div>
    </>);
    
}