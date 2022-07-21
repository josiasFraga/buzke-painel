import React, { useState, useEffect } from "react";

import CurrencyInput from "react-currency-input";



export default function ParcialRow(props) {

    const partial_key = props.partial_key;
    const installment_key = props.installment_key;
    const formik = props.formik;

  return (
    <>
        <div className={"row"}>
            <div className="col-xl-1">
                <div className="form-group text-right">
                &nbsp;<br /><br />
                    →
                </div>
            </div>
            <div className="col-xl-3">
                <div className="form-group">
                    <label className="form-label">
                    Data do pagamento <span class="text-danger">&nbsp;*</span>
                    </label>
                    <input
                    name={`installments[${installment_key}][partial_payments][${partial_key}].date`}
                    type="date"
                    max="2999-12-31"
                    className="form-control"
                    value={formik.values.installments[installment_key]['partial_payments'][partial_key].date}
                    onChange={props.formik.handleChange}
                    />
                </div>
            </div>
            <div className="col-xl-3">
                <div className="form-group">
                    <label className="form-label">
                    Digite o valor <span class="text-danger">&nbsp;*</span>
                    </label>
                    <CurrencyInput
                    name={`installments[${installment_key}][partial_payments][${partial_key}].amount`}
                    className="form-control"
                    value={formik.values.installments[installment_key]['partial_payments'][partial_key].amount}
                    prefix="R$ "
                    decimalSeparator=","
                    thousandSeparator="."
                    selectAllOnFocus={true}
                    onChangeEvent={(ev, maskedvalue, floatvalue) =>
                        props.formik.setFieldValue(
                            `installments[${installment_key}][partial_payments][${partial_key}].amount`,
                            floatvalue
                        )
                    }
                    />
                </div>
            </div>

            <div className="col-xl-3" style={{alignItems: 'center', display: "flex"}}>
                <button className="btn btn-vermelho" onClick={()=>{
                    let installments = props.formik.values.installments;
                    installments[installment_key].partial_payments.splice(partial_key)
                    //delete installments[installment_key].partial_payments[partial_key];
                    props.formik.setFieldValue('installments', installments);
                }}>-</button>  
            </div>

            <div className="hr mb-5"></div>
        </div>

    </>
  );
}

