import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async';
import Select, { components } from 'react-select';
import { Link } from 'react-router-dom';
import { customSelectStyle } from '../../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';

const Input = (props) => <components.Input placeholder="Selecione.." {...props} isHidden={false} />;

const CustomMenu = ({ innerRef, innerProps, isDisabled, children }) =>
        !isDisabled ? (
            <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
                {children}
                <Link to="/clientes/form">
                <button
                    className="btn btn-primary btn-sm btn-block"
                    
                >ADICIONAR NOVO CLIENTE</button></Link>
            </div>
        ) : null;


const LoadMore = ({ innerRef, innerProps, isDisabled, children }) =>
!isDisabled ? (
    <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <button
            className="btn btn-sm btn-cinza btn-block"
            
        >PARA VER MAIS, DIGITE 3 OU MAIS CARACTERES</button>
    </div>
) : null;
  
export default function Step1(props) {
    const dispatch = useDispatch();
    const [indexes, setIndexes] = useState([]);
    const customers = useSelector(state => state.app.customers);
    const indexes_pf = useSelector(state => state.app.indexes_pf);
    const indexes_pj = useSelector(state => state.app.indexes_pj);
    const person_types = useSelector(state => state.app.person_types);

    const changePersonType = (value) => {
        props.formik.setFieldValue('contract_person_type', value);

        props.formik.setFieldValue('contract_type', '');
    }

    useEffect(() => {
        if (props.formik.values.contract_person_type == '') {
            return;
        }

        if (props.formik.values.contract_person_type.id == 'pf') {
            setIndexes(indexes_pf);
        } else if (props.formik.values.contract_person_type.id == 'pj') {
            setIndexes(indexes_pj);
        }
    }, [props.formik.values.contract_person_type]);

    useEffect(() => {
        dispatch({type: 'LOAD_CUSTOMERS'});
    }, []);

    const selectRef = useRef();

    const [inputValue, setInputValue] = useState('');
    const loadOptions = (param1, callback) => {
        /*if (param1.length < 3) {
          callback([]);
          return false;
        }*/

        dispatch({
          type: 'LOAD_INSTITUTIONS',
          payload: {
            keyword: param1,
            callback: (dados) => {
              const instutitions_select = dados.map(institution => ({
                  label: institution.company_name,
                  value: institution.id
              }));
              callback(instutitions_select);
            }
          }
        });
    }

    const onInputChange = (inputValue, { action }) => {
        // onBlur => setInputValue to last selected value
        if (action === "input-blur") {
          setInputValue(props.formik.values.contract_institution ? props.formik.values.contract_institution.label : "");
        }
    
        // onInputChange => update inputValue
        else if (action === "input-change") {
          setInputValue(inputValue);
        }
      };
    
    const onChange = (option) => {
      props.formik.setFieldValue('contract_institution', option ? option : {});
      setInputValue(option ? option.label : "");
    };
    
    const onFocus = () => props.formik.values.contract_institution.value && selectRef.current.select.select.inputRef.select();
    
    const proximo = async () => {
        const validation = await props.formik.validateForm();
        props.formik.setTouched(validation);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }

    return (
<>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '40px'}}>
                    <div className="row mb-5">
                        <div className="col">
                            <label className="form-label">Selecione um cliente</label>
                            <Select 
                                name="contract_customer"
                                theme={customSelectStyle}
                                components={{ Menu: CustomMenu }}
                                options={customers}
                                onChange={(value) => props.formik.setFieldValue('contract_customer', value)}
                                value={props.formik.values.contract_customer}
                                placeholder="Selecione.."
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                isClearable={true}
                                noOptionsMessage={() => <span>Sem resultados.</span>}

                            />
                        </div>
                        <div className="col">
                            <label className="form-label">Tipo de Pessoa <span className="text-danger">&nbsp;*</span></label>

                            <Select 
                                name="contract_person_type"
                                theme={customSelectStyle}
                                isSearchable={false}
                                options={person_types}
                                className={props.formik.errors.contract_person_type && props.formik.touched.contract_person_type ? 'is-invalid' : ''}
                                onChange={(value) => changePersonType(value)}
                                value={props.formik.values.contract_person_type}
                                placeholder="Selecione.."
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                noOptionsMessage={() => <span>Sem resultados.</span>}
                            />                         
                            {props.formik.errors.contract_person_type && props.formik.touched.contract_person_type && <label className="invalid-feedback">{props.formik.errors.contract_person_type}</label>}

                        </div>
                        <div className="col">
                            <label className="form-label">Modalidade de contrato <span className="text-danger">&nbsp;*</span></label>
                            <Select 
                                name="contract_type"
                                theme={customSelectStyle}
                                className={props.formik.errors.contract_type && props.formik.touched.contract_type ? 'is-invalid' : ''}
                                options={indexes}
                                onChange={(value) => props.formik.setFieldValue('contract_type', value)}
                                value={props.formik.values.contract_type}
                                placeholder="Selecione.."
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                isClearable={true}
                                noOptionsMessage={() => <span>Sem resultados.</span>}
                            />
                            {props.formik.errors.contract_type && props.formik.touched.contract_type && <label className="invalid-feedback">{props.formik.errors.contract_type}</label>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <label className="form-label">Selecione a instituição financeira</label>
                            <AsyncSelect
                                ref={selectRef}
                                loadOptions={loadOptions}
                                theme={customSelectStyle}
                                defaultOptions 
                                onInputChange={onInputChange}
                                inputValue={inputValue}
                                placeholder=""
                                value={props.formik.values.contract_institution}
                                onChange={onChange}
                                onFocus={onFocus}
                                isClearable={true}
                                noOptionsMessage={() => 'Sem resultados, digite 3 letras ou mais para iniciar a busca.'}
                                components={{
                                    Input,
                                    Menu: LoadMore
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-4 col-md-12">
            </div>
            <div className="col-xl-4 col-md-12"></div>
            <div className="col-xl-4 col-md-12">
                <button type="button" className="btn btn-primary float-right" style={{width: '150px'}} onClick={proximo}>PRÓXIMO</button>
                
            </div>
        </div>

    </>);
}