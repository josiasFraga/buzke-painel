import React, { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import SvgSuccess from '../../../components/SvgAnimations/Success.js';
import SvgWarning from '../../../components/SvgAnimations/Warning.js';
import SvgError from '../../../components/SvgAnimations/Error.js';


const Content = styled.div`
    span { font-size: 40px; display: block; padding: 5px; text-align: center; color: #a1a8c1; }
    hr { opacity: 0.1; margin: 0; }
    small { font-size: 16px; display: block; text-align: center; opacity: 0.6; margin-top: 20px;}

    .success { color: #41C78F !important; }
    .warning { color: #FFC107 !important; }
    .error { color: #FF6245 !important; }
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 19px;
    text-align: center; 
    font-size: 30px;
    margin-bottom: 20px;

`;


export default function Success(props) {
    const dispatch = useDispatch();

    const navegar = () => {
        //dispatch({type: 'LOAD_SUBSCRIPTION_STATUS'});
        dispatch({type: 'CLOSE_MODAL_SUBSCRIPTION'});
        props.setScreen('choose_plan');
    }
    return (

        <Content>
            <SvgSuccess />

            <Title className="success">Parabéns, sua assinatura foi atualizada com sucesso!</Title>
            <button type="button" className="btn btn-primary" style={{width: '100%'}} onClick={navegar}>CONTINUAR NAVEGANDO</button>        
        </Content>
    ); 
}