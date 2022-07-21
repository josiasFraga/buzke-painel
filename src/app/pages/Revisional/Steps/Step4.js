import React from 'react';
import CurrencyInput from 'react-currency-input';
import { addMonths, parseISO, format } from 'date-fns';
import BlockUi from 'react-block-ui';
import styled from 'styled-components';
import FloatToCurrency from '../../../helpers/FloatToCurrency';

const TotalTitulo = styled.p`
    font-size: 16px;
    color: #091D5C;
    margin-bottom: 0;
    font-weight: 500;
`;

const TotalValor = styled.p`
    font-size: 23px;
    color: #091D5C;
    opacity: 0.48;
    font-weight: 500;
`;

export default function Step4(props) {
    const getPaidInstallments = () => {
        return Object.assign([], props.formik.values.paid_installments);
    }

    const setInstallmentFieldValue = (key, field, value) => {
        let paidInstallmentsTmp = getPaidInstallments();
        paidInstallmentsTmp[key][field] = value;
        props.formik.setFieldValue('paid_installments', paidInstallmentsTmp);
    }
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    

    const changeInstallmentsCount = () => {
        let count = props.formik.values.paid_installments_count;
          if (props.formik.values.paid_installments.length == 0) {
            let paidInstallmentsTmp = [];
            for (let i = 0; i < count; i++) {
                paidInstallmentsTmp.push({
                    date: format(addMonths(parseISO(props.formik.values.first_installment_date), i), 'yyyy-MM-dd'),
                    amount: props.formik.values.installment_amount,
                    paid: true
                });
            }
            props.formik.setFieldValue('paid_installments', paidInstallmentsTmp);
            return true;
        } else if (props.formik.values.paid_installments.length > 0) {
            const installmentsDifference = Math.abs(count - props.formik.values.paid_installments.length);
            const hasRemovedInstallments = (count - props.formik.values.paid_installments.length) < 0;

            if (!hasRemovedInstallments) {
                // caso tenha adicionado parcelas
                let paidInstallmentsTmp = getPaidInstallments();
                let lastInstallmentDate = paidInstallmentsTmp[paidInstallmentsTmp.length - 1].date;

                if (!window.confirm("Deseja realmente adicionar " + installmentsDifference + " parcela(s)?")) {
                    return true;
                }

                for (let i = 0; i < installmentsDifference; i++) {
                    paidInstallmentsTmp.push({
                        date: format(addMonths(parseISO(lastInstallmentDate), (i+1)), 'yyyy-MM-dd'),
                        amount: props.formik.values.installment_amount,
                        paid: true
                    });
                }
                props.formik.setFieldValue('paid_installments', paidInstallmentsTmp);
                return true;
            } else {
                if (window.confirm("Deseja realmente remover a(s) " + installmentsDifference + " última(s) parcelas?")) {
                    let paidInstallmentsTmp = getPaidInstallments();
                    paidInstallmentsTmp.splice(paidInstallmentsTmp.length - installmentsDifference)
                    props.formik.setFieldValue('paid_installments', paidInstallmentsTmp);
                    return true;
                }
            }
        }

    }

    const changeStatusInstallment = (key, paid) => {
        setInstallmentFieldValue(key, 'paid', paid);
        if (!paid) {
            setInstallmentFieldValue(key, 'amount', 0);
        }
    }

    return (
        <BlockUi tag="div" blocking={props.formik.isSubmitting}>
            <div className="row mb-10">
                <div className="col-xl-12">
                    <div className="card-custom">
                        <div className="row">
                            <div className="col-xl-4">
                                <label className="form-label">Quantidade de parcelas pagas <span className="text-danger">&nbsp;*</span></label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="paid_installments_count"
                                        className="form-control"
                                        value={props.formik.values.paid_installments_count}
                                        onClick={(evt) => evt.currentTarget.select()}
                                        onChange={props.formik.handleChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-primary" onClick={changeInstallmentsCount}>GERAR PARCELAS</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        { props.formik.values.paid_installments.length > 0 &&
            <div className="row mb-10">
                <div className="col-xl-12">
                    <div className="card-custom">
                        <h3 style={{color: '#091d5c', marginBottom: '40px', marginTop: '10px'}}>Parcelas</h3>
                    { props.formik.values.paid_installments.map((installment, key) => 
                        <div className="row mb-10">
                            <div className="col-xl-2">
                                <label className="form-label">Parcela</label>
                                <input className="form-control input-parcela" placeholder={zeroPad((key+1), 2)} disabled="disabled" />
                            </div>
                            <div className="col-xl-3">
                                <label className="form-label">Data de Pagamento</label>
                                <input
                                    className="form-control"
                                    value={installment.date}
                                    type="date"
                                    max="2999-12-31"
                                    onChange={(evt) => setInstallmentFieldValue(key, 'date', evt.target.value)}
                                />
                            </div>
                            <div className="col-xl-3">
                                <label className="form-label">Valor da Parcela</label>                           
                                    <CurrencyInput
                                        className="form-control"
                                        value={installment.amount}
                                        prefix="R$ "
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        selectAllOnFocus={true}
                                        onChangeEvent={(ev, maskedvalue, floatvalue) => setInstallmentFieldValue(key, 'amount', floatvalue)}
                                        disabled={!installment.paid}
                                    />
                            </div>

                            <div className="col-xl-3">
                                <div className="row justify-content-end">
                                    <div>
                                        <label className="form-label">A parcela foi paga?</label>  
                                        <div className="input-group">  
                                            <div className="btn-group">
                                                <button type="button" onClick={() => changeStatusInstallment(key, true)} className={"btn " + (installment.paid ? 'btn-primary' : 'btn-cinza')} style={{width: '80px'}}>SIM</button>
                                                <button type="button" onClick={() => changeStatusInstallment(key, false)} className={"btn " + (!installment.paid ? 'btn-vermelho' : 'btn-cinza')} style={{width: '80px'}}>NÃO</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="hr mb-10"></div>

                    <div className="row mb-10">
                        <div className="col-xl-3">
                            <TotalTitulo>Total de parcelas:</TotalTitulo>
                            <TotalValor>R$ {FloatToCurrency(props.formik.values.paid_installments.reduce((a,b) => a+b.amount, 0))}</TotalValor>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        }

         

            <div className="row">
                <div className="col-xl-4 col-md-12">
                    <button type="button" className="btn btn-cinza" style={{width: '150px'}} onClick={() => props.setStep(props.step-1)}>VOLTAR</button>
                </div>
                <div className="col-xl-4 col-md-12"></div>
                <div className="col-xl-4 col-md-12">
                    <button
                        type="button"
                        className="btn btn-primary float-right"
                        style={{width: '150px'}}
                        onClick={props.formik.handleSubmit}
                        disabled={(props.formik.values.paid_installments.length == 0)}>
                            CALCULAR
                        </button>
                </div>
            </div>
        </BlockUi>
    );
}