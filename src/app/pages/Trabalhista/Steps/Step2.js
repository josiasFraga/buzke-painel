import React, {useState, useEffect, useRef} from 'react';
import CurrencyInput from 'react-currency-input';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
    Dropdown,
    Tooltip,
    OverlayTrigger
  } from "react-bootstrap";
  import {
    Dialog,
    DialogTitle,
    Button,
    Checkbox,
    FormControlLabel,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Divider,
  } from "@material-ui/core";
import { parseISO } from 'date-fns';
export default function Step2(props) {
    const dispatch = useDispatch();
  const [modalInstallmentsCount, setModalInstallmentsCount] = useState(false);
  const [cloneInstallments, setCloneInstallments] = useState(false);
  const [addMonth, setAddMonth] = useState(false);
    const InputCountInstallments = useRef();

    const installment_types = useSelector(state => state.app.installment_types);
    const periodicity_types = useSelector(state => state.app.periodicity_types);
    const indexes = useSelector(state => state.app.average_price_indexes);
    const [activeInstallment, setActiveInstallment] = useState(0);

    useEffect(() => {
        dispatch({type: 'LOAD_INDEXES'});
    }, []);

    const validateOverlap = (dateRanges) => {
        var sortedRanges = dateRanges.sort((previous, current) => {
  
            // get the start date from previous and current
            var previousTime = previous.start;
            var currentTime = current.start;
        
            // if the previous is earlier than the current
            if (previousTime < currentTime) {
              return -1;
            }
        
            // if the previous time is the same as the current time
            if (previousTime === currentTime) {
              return 0;
            }
        
            // if the previous time is later than the current time
            return 1;
          });
          
          var result = sortedRanges.reduce((result, current, idx, arr) => {
            // get the previous range
            if (idx === 0) { return result; }
            var previous = arr[idx-1];
          
            // check for any overlap
            var previousEnd = previous.end;
            var currentStart = current.start;
            var overlap = (previousEnd >= currentStart);
          
            // store the result
            if (overlap) {
              // yes, there is overlap
              result.overlap = true;
              // store the specific ranges that overlap
              result.ranges.push({
                previous: previous,
                current: current
              })
            }
           
            return result;
           
             // seed the reduce  
          }, {overlap: false, ranges: []});
        
        
          // return the final results  
          return result;        
    }

    const validateStep = () => {

        let dates = [
            {start: parseISO('2021-01-01'), end: parseISO('2021-03-22')},
            {start: parseISO('2020-01-01'), end: parseISO('2021-01-01')},
            {start: parseISO('2019-01-01'), end: parseISO('2019-12-31')},
        ];
        console.log(validateOverlap(dates))

        // validação das parcelas
        for (const [indexInstallment, installment] of props.formik.values.installments.entries()) {
            return true;
            // validação dos campos básicos da parcela
            if (installment.calculation_date == '') {
                toast.error(`A parcela ${(indexInstallment+1)} está com a data do cálculo em branco.`);
                return false;
            }

            if (installment.amount == 0) {
                toast.error(`A parcela ${(indexInstallment+1)} está com o valor igual a zero.`);
                return false;
            }

            // validação dos índices da parcela
            let indexes = installment.indexes;
            let interests = installment.interests;
            for (const index of indexes) {
                let MIN_CORRECTION_DATE = '1994-07-01';

                if (index.index == null || index.startDate == '' || index.endDate == '') {
                    toast.error(`A parcela ${(indexInstallment+1)} possui índice(s) com campos em branco.`);
                    return false;
                }

                if (parseISO(index.startDate) < parseISO(MIN_CORRECTION_DATE)) {
                    toast.error(`A parcela ${indexInstallment+1} possui índice(s) com a data inicial anterior a 07/1994.`);
                    return false;
                }

                if (parseISO(index.endDate) < parseISO(MIN_CORRECTION_DATE)) {
                    toast.error(`A parcela ${indexInstallment+1} possui índice(s) com a data final anterior a 07/1994.`);
                    return false;
                }

                if (parseISO(index.startDate) > parseISO(index.endDate)) {
                    toast.error(`A parcela ${indexInstallment+1} possui índice(s) com a data inicial sendo maior que a data final.`);
                    return false;
                }

                if (parseISO(index.endDate) > parseISO(installment.calculation_date)) {
                    toast.error(`A parcela ${indexInstallment+1} possui índice(s) com a data final sendo maior que a data do cálculo.`);
                    return false;
                }
            }

            for (const interest of interests) {
                let MIN_CORRECTION_DATE = '1994-07-01';

                if (interest.interest == 0 && !interest.apply_index) {
                    console.log(interest)
                    continue;
                }

               if (interest.startDate == '' || interest.endDate == '') {
                    toast.error(`A parcela ${(indexInstallment+1)} possui juro(s) com campos em branco.`);
                    return false;
                }

                if (parseISO(interest.startDate) < parseISO(MIN_CORRECTION_DATE)) {
                    toast.error(`A parcela ${indexInstallment+1} possui juro(s) com a data inicial anterior a 07/1994.`);
                    return false;
                }

                if (parseISO(interest.endDate) < parseISO(MIN_CORRECTION_DATE)) {
                    toast.error(`A parcela ${indexInstallment+1} possui juro(s) com a data final anterior a 07/1994.`);
                    return false;
                }

                if (parseISO(interest.startDate) > parseISO(interest.endDate)) {
                    toast.error(`A parcela ${indexInstallment+1} possui juro(s) com a data inicial sendo maior que a data final.`);
                    return false;
                }

                if (parseISO(interest.endDate) > parseISO(installment.calculation_date)) {
                    toast.error(`A parcela ${indexInstallment+1} possui juro(s) com a data final sendo maior que a data do cálculo.`);
                    return false;
                }
            }

            let indexes_dates = indexes.map(index => ({
                start: parseISO(index.startDate),
                end: parseISO(index.endDate)
            }));
            if (validateOverlap(indexes_dates).overlap) {
                toast.error(`A parcela ${indexInstallment+1} possui índice(s) onde as datas estão em conflito, não pode haver dois índices no mesmo período de tempo.`);
                return false;
            }

            let interests_dates = interests.map(interest => ({
                start: parseISO(interest.startDate),
                end: parseISO(interest.endDate)
            }));
            if (validateOverlap(interests_dates).overlap) {
                toast.error(`A parcela ${indexInstallment+1} possui juro(s) onde as datas estão em conflito, não pode haver dois juros no mesmo período de tempo.`);
                return false;
            }
        }

        return true;
    }

    const proximo = async () => {
        const validation = await props.formik.validateForm();
        props.formik.setTouched(validation);

        if (Object.keys(validation).length > 0) {
            return false;
        }

        if (validateStep() == false) {
            return false;
        }

        props.setStep(props.step+1);
    }

    const appendInstallmentModal = (clone, addMonth = false) => {
        setCloneInstallments(clone);
        setAddMonth(addMonth);
        setModalInstallmentsCount(true);
    }

    const appendInstallment = async () => {    
        const count_installments = parseInt(InputCountInstallments.current.value) || 0;

        if (count_installments <= 0) {
            alert("Por favor, digite pelo menos uma parcela.");
        }
        let indexToClone = null;
        if (cloneInstallments) indexToClone = props.formik.values.installments.length - 1;
        
        
        props.appendInstallment(indexToClone, count_installments, addMonth);
        
        setModalInstallmentsCount(false);

        setTimeout(() => {
            setActiveInstallment(activeInstallment+count_installments);
        }, 1000);
    }

    const removeInstallment = (key) => {
        if (window.confirm("Deseja realmente remover esta parcela?")) {
            let tmpInstallments = [...props.formik.values.installments];
            tmpInstallments.splice(key, 1);

            if ( (key == activeInstallment && activeInstallment > 0) || (key != activeInstallment) ) {
                setActiveInstallment(activeInstallment - 1);
            }
            props.formik.setFieldValue('installments', tmpInstallments);

            toast.success("Parcela removida com sucesso!");
        }
    }

    const cloneInstallment = (key) => {
        setActiveInstallment(props.formik.values.installments.length - 1);

        let tmpInstallments = [...props.formik.values.installments];
        tmpInstallments.push(props.formik.values.installments[key]);
        props.formik.setFieldValue('installments', tmpInstallments);

        setTimeout(() => {
            setActiveInstallment(tmpInstallments.length - 1);
        }, 500);

        toast.success("Parcela clonada com sucesso!");
    }

    const removeIndex = (key) => {
        if (!window.confirm("Deseja realmente remover este índice?")) {
            return;
        }
        let tmpInstallments = [...props.formik.values.installments];
        tmpInstallments[activeInstallment].indexes.splice(key, 1);
        props.formik.setFieldValue('installments', tmpInstallments);
    }

    const removeInterest = (key) => {
        if (!window.confirm("Deseja realmente remover este juro?")) {
            return;
        }

        let tmpInstallments = [...props.formik.values.installments];
        tmpInstallments[activeInstallment].interests.splice(key, 1);
        props.formik.setFieldValue('installments', tmpInstallments);
    }

    return (<>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                    <div className="row mb-5">
                        <h3>Informe as remunerações do empregado</h3>
                    </div>
                { props.formik.values.installments[activeInstallment].indexes.map((index_data, index_key) => (
                    <div className="row">
                        <div className="col-xl-3">
                            <div className="form-group">
                            { index_key == 0 &&   
                                <label className="form-label">Salário <span class="text-danger">&nbsp;*</span></label>
                            }
                            
                            <div className="input-remover-container" style={{width: '100%'}}>
                            {props.formik.values.installments[activeInstallment].indexes.length > 1 &&
                                <div className="icon-remover pointer icon-remover-left-corner" onClick={() => removeIndex(index_key)}><span>&times;</span></div> 
                            }
                                    <CurrencyInput
                                        name={`installments[${activeInstallment}].indexes[${index_key}].index`}
                                        className="form-control"
                                        value={props.formik.values.installments[activeInstallment].indexes[index_key].index}
                                        prefix=""
                                        decimalSeparator=","
                                        placeholder="1200,00"
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue(`installments[${activeInstallment}].indexes[${index_key}].index`, floatvalue)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="form-group">
                            { index_key == 0 &&
                                <label className="form-label">Data Inicial <span class="text-danger">&nbsp;*</span></label>
                            }
                            <div className="input-group">
                                <select
                                    name=""
                                    className="form-control"
                                    
                                >
                                    <option value="">Mês..</option>

                                    <option value="1">Janeiro</option>
                                    <option value="2">Fevereiro</option>
                                    <option value="3">Março</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Maio</option>
                                    <option value="6">Junho</option>
                                    <option value="7">Julho</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                                <input
                                    name={`installments[${activeInstallment}].indexes[${index_key}].startDate`}
                                    value={props.formik.values.installments[activeInstallment].indexes[index_key].startDate}
                                    onChange={props.formik.handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="2015"
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="form-group">
                            { index_key == 0 &&
                                <label className="form-label">Data Final <span class="text-danger">&nbsp;*</span></label>
                            }
                            <div className="input-group">
                                <select
                                    name=""
                                    className="form-control"
                                    
                                >
                                    <option value="">Mês..</option>

                                    <option value="1">Janeiro</option>
                                    <option value="2">Fevereiro</option>
                                    <option value="3">Março</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Maio</option>
                                    <option value="6">Junho</option>
                                    <option value="7">Julho</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                                <input
                                    name={`installments[${activeInstallment}].indexes[${index_key}].startDate`}
                                    value={props.formik.values.installments[activeInstallment].indexes[index_key].startDate}
                                    onChange={props.formik.handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ano"
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2">
                            <div className="form-group">
                            { index_key == 0 &&
                                <label className="form-label">Divisor <span class="text-danger">&nbsp;*</span></label>
                            }
                            <div className="input-group">
                               
                                <input
                                    name={`installments[${activeInstallment}].indexes[${index_key}].startDate`}
                                    value="220,00"
                                    onChange={props.formik.handleChange}
                                    type="text"
                                    className="form-control"
                                    
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))}
                    <div className="row" style={{marginTop: '-17px'}}>
                        <div className="col-xl-6 mb-5">
                            <span className="primary font-size-small pointer" onClick={() => props.appendIndex(activeInstallment)}><i className="primary flaticon2-add-square icon-md"></i>&nbsp;&nbsp;&nbsp;Clique aqui para incluir o histórico salarial.</span>
                        </div>
                    </div>
                    <div className="hr mb-5"></div>
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