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
import _ from 'lodash';

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
            let tmpInstallments = _.cloneDeep(props.formik.values.installments);

            tmpInstallments.splice(key, 1);

            if ( (key == activeInstallment && activeInstallment > 0) || (key != activeInstallment) ) {
                if (activeInstallment > 0) setActiveInstallment(activeInstallment - 1);
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
           
                <div className="row">
                    <div className="col-xl-3" style={{paddingRight: '0px'}}>
                        <div className="border-only-left" style={{backgroundColor: '#f3f6f9', height: '100%', border: '1px solid #eaeaea', borderRight: '0px', padding: '20px'}}>

                        { props.formik.values.installments.map((installment, key) => (

                            <div className="row mb-5" style={{padding: '0px 10px 0px 10px'}} key={key}>
                                <div className="font-size-md pointer flex-grow-1" onClick={() => setActiveInstallment(key)} style={{color: '#2e3f75'}}>
                                    <span className="label" style={{backgroundColor: (key == activeInstallment ? '#41C78F' : '#7d89ab'), color: '#fff'}}>{(key+1)}</span>
                                    &nbsp;&nbsp;{installment.description.trim() != '' ? installment.description : 'Parcela'}
                                </div>
                                <div className="parcela-actions">
                                { props.formik.values.installments.length > 1 &&
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-top">Remover Parcela</Tooltip>
                                        }
                                    >
                                        <span onClick={() => removeInstallment(key)}><i className="flaticon2-trash icon-md mr-3"></i></span>
                                    </OverlayTrigger>
                                }
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-top">Clonar Parcela</Tooltip>
                                        }
                                    >
                                        <span onClick={() => cloneInstallment(key)}><i className="flaticon2-copy icon-md"></i></span>
                                    </OverlayTrigger>
                                </div>
                            
                            </div>
                        ))}

                            <Dropdown>
                                <Dropdown.Toggle style={{width:'100%'}}>
                                    <span className="font-size-small pointer" style={{color: '#fff'}}><i className="flaticon2-add-square icon-md"></i> Adicionar parcela</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item onClick={() => appendInstallmentModal(false)}>Em branco</Dropdown.Item>
                                <Dropdown.Item onClick={() => appendInstallmentModal(true)}>Clonar a última parcela</Dropdown.Item>
                                <Dropdown.Item onClick={() => appendInstallmentModal(true, true)}>Clonar a última parcela sucessivamente</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>


                            <Dialog
                                open={modalInstallmentsCount}
                                onEntered={() => InputCountInstallments.current.select()}
                                onClose={() => setModalInstallmentsCount(false)}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title">Quantidade de parcelas</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Digite a quantidade de parcela(s) que você deseja inserir.
                                    </DialogContentText>
                                    <TextField
                                        inputRef={InputCountInstallments}
                                        autoFocus
                                        margin="dense"
                                        id="count_installments"
                                        label="Quantidade"
                                        defaultValue="1"
                                        type="number"
                                        fullWidth
                                        onKeyPress={(evt) => evt.key === 'Enter' ? appendInstallment() : undefined}
                                    />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={() => setModalInstallmentsCount(false)} color="primary">
                                    Voltar
                                </Button>
                                <Button onClick={appendInstallment} color="primary">
                                    Inserir
                                </Button>
                                </DialogActions>
                            </Dialog>                            
                        </div>
                    </div>
                    <div className="col-xl-9" style={{paddingLeft: '0px'}}>
                        <div className="border-only-right" style={{backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px'}}>

                        
                            <h3 className="azul-cabecalho mb-10">PARCELA {(activeInstallment+1)}</h3>

                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="form-group">
                                        <label className="form-label">Descrição do item</label>
                                        <input
                                            name={`installments[${activeInstallment}].description`}
                                            value={props.formik.values.installments[activeInstallment].description}
                                            type="text"
                                            maxLength="35"
                                            className="form-control"
                                            placeholder="Ex.: Aluguel, reforma.."
                                            onChange={props.formik.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group">
                                        <label className="form-label">Data do Cálculo <span className="text-danger">&nbsp;*</span></label>
                                        <input
                                            name={`installments[${activeInstallment}].calculation_date`}
                                            type="date"
                                            max="2999-12-31"
                                            className="form-control"
                                            value={props.formik.values.installments[activeInstallment].calculation_date}
                                            onChange={props.formik.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="form-group">
                                        <label className="form-label">Digite o valor <span className="text-danger">&nbsp;*</span></label>
                                        <CurrencyInput
                                            name={`installments[${activeInstallment}].amount`}
                                            value={props.formik.values.installments[activeInstallment].amount}
                                            onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue(`installments[${activeInstallment}].amount`, floatvalue)}
                                            className="form-control"
                                            prefix="R$ "
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            selectAllOnFocus={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="form-group">
                                        <label className="form-label">A que se refere esta parcela? <span className="text-danger">&nbsp;*</span></label>
                                        <Select
                                            name={`installments[${activeInstallment}].type`}
                                            value={props.formik.values.installments[activeInstallment].type}
                                            onChange={(value) => props.formik.setFieldValue(`installments[${activeInstallment}].type`, value)}
                                            options={installment_types}
                                            isSearchable={false}
                                            isClearable={false}
                                            placeholder="Selecione.."
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id}
                                            noOptionsMessage={() => <span>Sem resultados.</span>}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="hr mb-5"></div>
                        { props.formik.values.installments[activeInstallment].indexes.map((index_data, index_key) => (
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="form-group">
                                    { index_key == 0 &&   
                                        <label className="form-label">Índice <span className="text-danger">&nbsp;*</span></label>
                                    }
                                    
                                    <div className="input-remover-container" style={{width: '100%'}}>
                                    {props.formik.values.installments[activeInstallment].indexes.length > 1 &&
                                        <div className="icon-remover pointer icon-remover-left-corner" onClick={() => removeIndex(index_key)}><span>&times;</span></div> 
                                    }
                                            <Select 
                                                name={`installments[${activeInstallment}].indexes[${index_key}].index`}
                                                options={[{name: 'NENHUM', id: null}, ...indexes]}
                                                onChange={(value) => props.formik.setFieldValue(`installments[${activeInstallment}].indexes[${index_key}].index`, value)}
                                                value={props.formik.values.installments[activeInstallment].indexes[index_key].index}
                                                placeholder="Selecione.."
                                                getOptionLabel={(option) => option.name}
                                                getOptionValue={(option) => option.id}
                                                isClearable={true}
                                                noOptionsMessage={() => <span>Sem resultados.</span>}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group">
                                    { index_key == 0 &&
                                        <label className="form-label">Data Inicial <span className="text-danger">&nbsp;*</span></label>
                                    }
                                        <input
                                            name={`installments[${activeInstallment}].indexes[${index_key}].startDate`}
                                            value={props.formik.values.installments[activeInstallment].indexes[index_key].startDate}
                                            onChange={props.formik.handleChange}
                                            type="date"
                                            max="2999-12-31"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group">
                                    { index_key == 0 &&
                                        <label className="form-label">Data Final <span className="text-danger">&nbsp;*</span></label>
                                    }
                                        <input
                                            name={`installments[${activeInstallment}].indexes[${index_key}].endDate`}
                                            value={props.formik.values.installments[activeInstallment].indexes[index_key].endDate}
                                            onChange={props.formik.handleChange}
                                            type="date"
                                            max="2999-12-31"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                            <div className="row" style={{marginTop: '-17px'}}>
                                <div className="col-xl-6 mb-5">
                                    <span className="primary font-size-small pointer" onClick={() => props.appendIndex(activeInstallment)}><i className="primary flaticon2-add-square icon-md"></i>&nbsp;&nbsp;&nbsp;Deseja adicionar outro índice?</span>
                                </div>
                            </div>

                            <div className="hr mb-5"></div>


                        { props.formik.values.installments[activeInstallment].interests.map((interest_data, interest_key) => (
                        <>
                            <div className="row">
                                <div className="col-xl-3">
                                    <div className="form-group">
                                    { interest_key == 0 &&

                                        <label className="form-label">Juros (%)</label>
                                    }

                                        <div className="input-remover-container" style={{width: '100%'}}>
                                        {props.formik.values.installments[activeInstallment].interests.length > 1 &&
                                            <div className="icon-remover pointer icon-remover-left-corner" onClick={() => removeInterest(interest_key)}><span>&times;</span></div> 
                                        }

                                            <CurrencyInput
                                                name={`installments[${activeInstallment}].interests[${interest_key}].interest`}
                                                className="form-control"
                                                value={props.formik.values.installments[activeInstallment].interests[interest_key].interest}
                                                prefix=""
                                                decimalSeparator=","
                                                thousandSeparator="."
                                                selectAllOnFocus={true}
                                                onChangeEvent={(ev, maskedvalue, floatvalue) => props.formik.setFieldValue(`installments[${activeInstallment}].interests[${interest_key}].interest`, floatvalue)}
                                                disabled={interest_data.apply_index}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group">
                                    { interest_key == 0 &&
                                        <label className="form-label">Tipo</label>
                                    }

                                        <Select
                                            name={`installments[${activeInstallment}].interests[${interest_key}].type`}
                                            value={props.formik.values.installments[activeInstallment].interests[interest_key].type}
                                            onChange={(value) => props.formik.setFieldValue(`installments[${activeInstallment}].interests[${interest_key}].type`, value)}
                                            isSearchable={false}
                                            isClearable={false}
                                            placeholder="Selecione.."
                                            options={periodicity_types}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id}
                                            noOptionsMessage={() => <span>Sem resultados.</span>}
                                            isDisabled={interest_data.apply_index}

                                        />

                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group">
                                    { interest_key == 0 &&
                                        <label className="form-label">Data Inicial</label>
                                    }
                                        <input
                                            name={`installments[${activeInstallment}].interests[${interest_key}].startDate`}
                                            value={props.formik.values.installments[activeInstallment].interests[interest_key].startDate}
                                            onChange={props.formik.handleChange}
                                            type="date"
                                            max="2999-12-31"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="form-group">
                                    { interest_key == 0 &&
                                        <label className="form-label">Data Final</label>
                                    }
                                        <input
                                            name={`installments[${activeInstallment}].interests[${interest_key}].endDate`}
                                            value={props.formik.values.installments[activeInstallment].interests[interest_key].endDate}
                                            onChange={props.formik.handleChange}
                                            type="date"
                                            max="2999-12-31"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '-22px'}}>
                                <div className="col-xl-12">
                                    <FormControlLabel
                                        style={{marginLeft: '-11px'}}
                                        className="flex-grow-1"
                                        onChange={(value) => props.formik.setFieldValue(`installments[${activeInstallment}].interests[${interest_key}].apply_index`, !interest_data.apply_index)}
                                        control={
                                            <Checkbox
                                                color="default"
                                                checked={interest_data.apply_index}
                                            />
                                        }
                                        label={"Aplicar juros de poupança"}
                                    />
                                </div>
                            </div>
                        </>))
                        }
                            <div className="row" style={{marginTop: '-6px'}}>
                            <div className="col-xl-6">
                                <span className="primary font-size-small pointer" onClick={() => props.appendInterest(activeInstallment)}><i className="primary flaticon2-add-square icon-md"></i>&nbsp;&nbsp;&nbsp;Deseja adicionar outro juro?</span>
                            </div>
                        </div>
                      
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