import React, {useState} from 'react';
import CurrencyInput from 'react-currency-input';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';
import {
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

export default function Step2(props) {
    const amortization_types = useSelector(state => state.app.amortization_types);
    const [additionalAmounts, setAdditionalAmounts] = useState(false);

    const proximo = async () => {
        const validation = await props.formik.validateForm();
        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }


    const manageAdditionalAmountsState = () => {
        if (additionalAmounts) {
            hideAdditionalAmounts();
        } else {
            displayAdditionalAmounts();
        }
    }

    const displayAdditionalAmounts = () => setAdditionalAmounts(true);
    
    const hideAdditionalAmounts = () => {
        props.formik.setFieldValue('contract_service_tax', 0);
        props.formik.setFieldValue('contract_iof', 0);
        props.formik.setFieldValue('contract_another_taxes', 0);
        
        setAdditionalAmounts(false);
    }

    const selecionouTabelaSac = () => {
        try {
            return (props.formik.values.amortization_system.id == 'sac');
        } catch (err) {
            return false;
        }
    }

    return (<>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '40px'}}>
                    <div className="row mb-5">
                        <div className="col-xl-4">
                            <label className="form-label">Valor total financiado <span className="text-danger">&nbsp;*</span></label>

                            <div className="input-icon input-icon-right">
                                <CurrencyInput
                                    name="contract_value"
                                    className={"form-control " + (props.formik.errors.contract_value && props.formik.touched.contract_value ? 'is-invalid' : '')}
                                    value={props.formik.values.contract_value}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('contract_value', floatvalue)}
                                />
                                <span className={(props.formik.errors.contract_value && props.formik.touched.contract_value ? 'is-invalid' : '')} title={additionalAmounts ? "Esconder valores adicionais" : "Incluir valores adicionais"} onClick={manageAdditionalAmountsState}>
                                    <i className={"icon-more-info icon-md " + (additionalAmounts ? "flaticon-delete-2" : "flaticon-plus")}></i>
                                </span>
                                {props.formik.errors.contract_value && props.formik.touched.contract_value && <label className="invalid-feedback">{props.formik.errors.contract_value}</label>}
                            </div>
                        </div>
                        {additionalAmounts && <>
                            <div className="col-xl-2">
                                <label className="form-label">Valor Total do Bem</label>
                                <CurrencyInput
                                    className="form-control"
                                    prefix="R$ "
                                    name="contract_goods"
                                    value={props.formik.values.contract_goods}
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('contract_goods', floatvalue)}
                                />
                    
                            </div>
                            <div className="col-xl-2">
                                <label className="form-label">IOF</label>

                                <CurrencyInput
                                    name="contract_iof"
                                    className="form-control"
                                    value={props.formik.values.contract_iof}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('contract_iof', floatvalue)}
                                />
                    
                            </div>
                            <div className="col-xl-2">
                                <label className="form-label">Taxa de Cadastro (TAC)</label>

                                <CurrencyInput
                                    className="form-control"
                                    prefix="R$ "
                                    name="contract_service_tax"
                                    value={props.formik.values.contract_service_tax}
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('contract_service_tax', floatvalue)}
                                />
                    
                            </div>
                            <div className="col-xl-2">
                                <label className="form-label">Outras Taxas</label>
                                <CurrencyInput
                                    name="contract_another_taxes"
                                    className="form-control"
                                    value={props.formik.values.contract_another_taxes}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('contract_another_taxes', floatvalue)}
                                />
                            </div>
                        </> }
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label">Data do contrato <span className="text-danger">&nbsp;*</span></label>
                            <input
                                className={"form-control " + (props.formik.errors.contract_date && props.formik.touched.contract_date ? 'is-invalid' : '')}
                                type="date"
                                max="2999-12-31"
                                value={props.formik.values.contract_date}
                                name="contract_date"
                                onChange={props.formik.handleChange}
                            />
                            {props.formik.errors.contract_date && props.formik.touched.contract_date && <label className="invalid-feedback">{props.formik.errors.contract_date}</label>}
                        </div>
                                            
                        <div className="col">
                            <label className="form-label">Data de vencto. da primeira parcela <span className="text-danger">&nbsp;*</span></label>
                            <input
                                className={"form-control " + (props.formik.errors.first_installment_date && props.formik.touched.first_installment_date ? 'is-invalid' : '')}
                                type="date"
                                max="2999-12-31"
                                value={props.formik.values.first_installment_date}
                                name="first_installment_date"
                                onChange={props.formik.handleChange}
                            />
                            {props.formik.errors.first_installment_date && props.formik.touched.first_installment_date && <label className="invalid-feedback">{props.formik.errors.first_installment_date}</label>}

                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label">Quantidade de parcelas <span className="text-danger">&nbsp;*</span></label>
                            <input 
                                className={"form-control " + (props.formik.errors.contract_installments && props.formik.touched.contract_installments ? 'is-invalid' : '')}
                                type="number"
                                value={props.formik.values.contract_installments}
                                name="contract_installments"
                                onClick={(evt) => evt.currentTarget.select()}
                                onChange={(evt) => props.formik.setFieldValue('contract_installments', parseInt((evt.target.value != '' ? evt.target.value : 0)))}
                            />
                            {props.formik.errors.contract_installments && props.formik.touched.contract_installments && <label className="invalid-feedback">{props.formik.errors.contract_installments}</label>}
                        </div>
                        <div className="col">
                            <label className="form-label">Valor da 1ª parcela <span className="text-danger">&nbsp;*</span></label>
                            <CurrencyInput
                                name="installment_amount"
                                className={"form-control " + (props.formik.errors.installment_amount && props.formik.touched.installment_amount ? 'is-invalid' : '')}
                                value={props.formik.values.installment_amount}
                                prefix="R$ "
                                decimalSeparator=","
                                thousandSeparator="."
                                selectAllOnFocus={true}
                                onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('installment_amount', floatvalue)}
                            />
                            {props.formik.errors.installment_amount && props.formik.touched.installment_amount && <label className="invalid-feedback">{props.formik.errors.installment_amount}</label>}
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-xl-3">
                            <label className="form-label">Parcelas fixas ou variáveis <span className="text-danger">&nbsp;*</span></label>
                            <Select 
                                name="amortization_system"
                                className={"select2-custom " + props.formik.errors.amortization_system && props.formik.touched.amortization_system ? 'is-invalid' : ''}
                                options={amortization_types}
                                onChange={(value) => props.formik.setFieldValue('amortization_system', value)}
                                value={props.formik.values.amortization_system}
                                placeholder="Selecione.."
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                isClearable={true}
                                isSearchable={false}
                                theme={customSelectStyle}
                            />
                            {props.formik.errors.amortization_system && props.formik.touched.amortization_system && <label className="invalid-feedback">{props.formik.errors.amortization_system}</label>}
                        </div>
                    { selecionouTabelaSac() &&
                        <div className="col-xl-3">
                            <label className="form-label">Taxa de juros contratada (%) <span className="text-danger">&nbsp;*</span></label>
                            <div className="input-group">
                                <CurrencyInput
                                    name="interest_rate"
                                    className={"form-control " + (props.formik.errors.interest_rate && props.formik.touched.interest_rate ? 'is-invalid' : '')}
                                    value={props.formik.values.interest_rate}
                                    prefix=""
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('interest_rate', floatvalue)}
                                />
                                <div className="input-group-append">
                                    <button type="button" className={"btn btn-outline-secondary input-group-button " + (props.formik.values.interest_rate_periodicity == 'monthly' ? 'active' : '')} onClick={() => props.formik.setFieldValue('interest_rate_periodicity', 'monthly')}>Mensal</button>
                                    <button type="button" className={"btn btn-outline-secondary input-group-button " + (props.formik.values.interest_rate_periodicity == 'annually' ? 'active' : '')} onClick={() => props.formik.setFieldValue('interest_rate_periodicity', 'annually')}>Anual</button>
                                </div>
                                
                                { (props.formik.errors.interest_rate && props.formik.touched.interest_rate) &&
                                    <label className="invalid-feedback">{props.formik.errors.interest_rate}</label>
                                }
                            
                            </div>

                        </div>
                    }
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <FormControlLabel
                                style={{marginLeft: '-10px'}}
                                className="flex-grow-1"
                                onChange={() => props.formik.setFieldValue('own_average_interest', !props.formik.values.own_average_interest)}
                                control={
                                    <Checkbox
                                        checked={props.formik.values.own_average_interest}
                                        color="default"
                                        value="checkedG"
                                        inputProps={{
                                            "aria-label": "checkbox with default color"
                                        }}
                                    />
                                }
                                label={"Deseja informar a taxa de juros ao invés do sistema buscar automaticamente a taxa média do BACEN?"}
                            />

                        </div>
                    </div>
                { props.formik.values.own_average_interest &&
                    <div className="row">
                        <p style={{marginLeft: '12px', fontSize: '11px', color: 'red'}}>Não será gerado parecer técnico e petição inicial do cálculo, devido ao sistema ter sido desenvolvido para calcular com a taxa média do BACEN.</p>

                        <div className="col-xl-6">

                            <label className="form-label">Taxa média de juros (%) <span className="text-danger">&nbsp;*</span></label>
                            <div className="input-group">
                                <CurrencyInput
                                    name="average_interest"
                                    className={"form-control " + (props.formik.errors.average_interest && props.formik.touched.average_interest ? 'is-invalid' : '')}
                                    value={props.formik.values.average_interest}
                                    prefix=""
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue('average_interest', floatvalue)}
                                />
                                <div className="input-group-append">
                                    <button type="button" className={"btn btn-outline-secondary input-group-button " + (props.formik.values.average_interest_periodicity == 'monthly' ? 'active' : '')} onClick={() => props.formik.setFieldValue('average_interest_periodicity', 'monthly')}>Mensal</button>
                                    <button type="button" className={"btn btn-outline-secondary input-group-button " + (props.formik.values.average_interest_periodicity == 'annually' ? 'active' : '')} onClick={() => props.formik.setFieldValue('average_interest_periodicity', 'annually')}>Anual</button>
                                </div>
                                
                                { (props.formik.errors.average_interest && props.formik.touched.average_interest) &&
                                    <label className="invalid-feedback">{props.formik.errors.average_interest}</label>
                                }
                            </div>
                        </div>
                    </div>
                }
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