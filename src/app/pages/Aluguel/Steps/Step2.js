import React, { useState, useEffect } from "react";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { format, addMonths, parseISO } from "date-fns";
import CurrencyInput from "react-currency-input";
import ParcialRow from "./Step2/ParcialRow";
import Select from "react-select";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import _ from "lodash";

import { useSubheader } from "../../../../_metronic/layout/_core/MetronicSubheader";

import { Checkbox, FormControlLabel } from "@material-ui/core";

export default function Step2(props) {

    const installments = useSelector((state) => state.app.rent_installments);
    const indexes = useSelector((state) => state.app.rent_contract_indexes);

    console.log(indexes);
    //const installments_formik = props.formik.values.installments;


  const proximo = async () => {
    const validation = await props.formik.validateForm();

    props.formik.setTouched(validation);
    if (Object.keys(validation).length == 0) props.setStep(props.step + 1);
  };

  const addRowPartialPayment = (installment_key) => {

    let _installments = props.formik.values.installments;

    _installments[installment_key].partial_payments.push({
        date: props.formik.values.installments[installment_key].date,
        amount: props.formik.values.installments[installment_key].amount
    });

    props.formik.setFieldValue('installments', _installments);
  }

  useEffect(() => {
    props.formik.setFieldValue('installments', installments);

    }, [installments]);

  useEffect(() => {
    props.formik.setFieldValue('rent_contract_indexes', indexes);

    }, [indexes]);


  return (
    <>
        {/*
        <pre>
        {JSON.stringify(props.formik.values, null, 2)}
        </pre>
        */}
      <div className="row mb-10">
        <div className="col-xl-12">
        <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px 12px 20px 12px'}}>
              {props.formik.values.installments.map((installment, installment_key) => (
                <div key={'key_' + installment_key} className={"row mb-5 installment-container" + (installment_key % 2 == 0 ? ' even' : '')}>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-xl-1">
                                <div className="form-group">
                                <label className="form-label">Item nº</label>
                                <div className="input-remover-container">
                
                                    <input
                                    className="form-control input-parcela"
                                    value={installment_key + 1}
                                    disabled="disabled"
                                    />
                                </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="form-group">
                                <label className="form-label">
                                    Data da época <span class="text-danger">&nbsp;*</span>
                                </label>
                                <input
                                    name={`installments[${installment_key}].date`}
                                    type="date"
                                    max="2999-12-31"
                                    className="form-control"
                                    value={props.formik.values.installments[installment_key].date}
                                    onChange={props.formik.handleChange}
                                />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="form-group">
                                <label className="form-label">Descrição do item</label>
                                <input
                                    name={`installments[${installment_key}].description`}
                                    type="text"
                                    maxLength="18"
                                    className="form-control"
                                    placeholder="Ex.: Aluguel, reforma.."
                                    value={props.formik.values.installments[installment_key].description}
                                    onChange={props.formik.handleChange}
                                />
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="form-group">
                                <label className="form-label">
                                    Digite o valor <span class="text-danger">&nbsp;*</span>
                                </label>
                                <CurrencyInput
                                    name={`installments[${installment_key}].amount`}
                                    className="form-control"
                                    value={props.formik.values.installments[installment_key].amount}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    selectAllOnFocus={true}
                                    onChangeEvent={(ev, maskedvalue, floatvalue) =>
                                    props.formik.setFieldValue(
                                        `installments[${installment_key}].amount`,
                                        floatvalue
                                    )
                                    }
                                />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="row justify-content-end">
                                <div>
                                    <label className="form-label">
                                    Este aluguel foi pago?
                                    </label>
                                    <div className="input-group">
                                    <div className="btn-group">
                                        <button
                                        type="button"
                                        onClick={() => {
                                            props.formik.setFieldValue(
                                            `installments[${installment_key}].paid`,
                                            true
                                            );
                                            props.formik.setFieldValue(
                                            `installments[${installment_key}].description`,
                                            props.formik.values.installments[installment_key].description_original
                                            );
                                        }}
                                        className={
                                            "btn " +
                                            (props.formik.values.installments[installment_key].paid === true
                                            ? "btn-primary"
                                            : "btn-cinza")
                                        }
                                        style={{ width: "80px" }}
                                        >
                                        SIM
                                        </button>

                                        <button
                                        type="button"
                                        onClick={() => {
                                            props.formik.setFieldValue(
                                            `installments[${installment_key}].paid`,
                                            false
                                            );
                                            props.formik.setFieldValue(
                                            `installments[${installment_key}].description`,
                                            props.formik.values.installments[installment_key].description_original
                                            );
                                        }}
                                        className={
                                            "btn " +
                                            (!props.formik.values.installments[installment_key].paid
                                            ? "btn-vermelho"
                                            : "btn-cinza")
                                        }
                                        style={{ width: "80px" }}
                                        >
                                        NÃO
                                        </button>

                                        <button
                                        type="button"
                                        onClick={() => {

                                            if ( 
                                                props.formik.values.installments[installment_key].partial_payments.length == 0
                                            ){
                                                addRowPartialPayment(installment_key);
                                            }

                                            props.formik.setFieldValue(
                                            `installments[${installment_key}].paid`,
                                            "P"
                                            );
                                            props.formik.setFieldValue(
                                            `installments[${installment_key}].description`,
                                            props.formik.values.installments[installment_key].description_original
                                            );
                                        }}
                                        className={
                                            "btn " +
                                            (props.formik.values.installments[installment_key].paid == "P"
                                            ? "btn-warning"
                                            : "btn-cinza")
                                        }
                                        style={{ width: "100px" }}
                                        >
                                        PARCIAL
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        {
                            props.formik.values.installments[installment_key].paid == 'P' && installment.partial_payments && installment.partial_payments.length > 0 && installment.partial_payments.map((partial, partial_key) => {
                                return <ParcialRow formik={props.formik} partial_key={partial_key} installment_key={installment_key} key={partial_key} />
                            }
                            )
                        }

                        {props.formik.values.installments[installment_key].paid == 'P' && 
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button className="btn btn-cinza" onClick={()=>{
                                        addRowPartialPayment(installment_key);
                                    }}>+</button>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
              ))}
            </div>
            <div className="hr mb-5"></div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-md-12">
          <button
            type="button"
            className="btn btn-cinza"
            style={{ width: "150px" }}
            onClick={() => props.setStep(props.step - 1)}
          >
            VOLTAR
          </button>
        </div>
        <div className="col-xl-4 col-md-12"></div>
        <div className="col-xl-4 col-md-12">
          <button
            type="button"
            className="btn btn-primary float-right"
            style={{ width: "150px" }}
            onClick={proximo}
          >
            PRÓXIMO
          </button>
        </div>
      </div>
    </>
  );
}

