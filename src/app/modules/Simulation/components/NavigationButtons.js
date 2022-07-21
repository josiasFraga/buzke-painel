import React from "react";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import axios from 'axios';

export default function NavigationButtons(props) {

    const avancar = () => {
        if (!props.isValidated) {
            alert("Por favor, preencha todos os campos e tente novamente.");
            return false;
        }
        axios.post(process.env.REACT_APP_API_URL + `/reports/simulation/data`, {data: props.formik.values});

        if (props.action) {
            props.action();
        } else {
            props.setStep(props.step+1);
        }
    }

    const voltar = () => {
        if (props.actionBack) {
            props.actionBack();
        } else {
            props.setStep(props.step-1);
        }
    }

    return (
    <>
        <a onClick={voltar} href="#"><button className="btn-back">Voltar </button></a>
        <a onClick={avancar} href="#"><button>Avançar <img src={toAbsoluteUrl("/media/svg/icons/Navigation/ArrowRight.svg")}/></button></a>
    </>
    );
}