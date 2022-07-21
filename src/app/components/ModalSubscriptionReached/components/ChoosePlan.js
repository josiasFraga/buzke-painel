import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    FormHelperText,
    Switch
  } from "@material-ui/core";
const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-content {
        border-radius: 10px !important;
        max-height: 90vh;
    }

    .modal-dialog {
        max-width: 700px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }
`;

const Content = styled.div`
    width: 100%;
    h3 { text-align: center; font-weight: bold; color: #2e3f75 }

    .MuiSwitch-thumb { background-color: #41C78F !important }
    .MuiSwitch-track { background-color: #41C78F !important }
    .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track { background-color: #41C78F !important }
`;

const Produto = styled.div`
   cursor:pointer;
   border:2px solid #f1f1f1;
   padding: 20px;
   border-radius: 5px;
   height: 100%;

   :hover {
       border:2px solid #41C78F;
       background: #fafafa;
    }
    span { color: #2e3f75; font-weight: bold; font-size: 12px; margin-bottom: 5px; }
    p.preco { font-size: 15px; margin-bottom: 10px; font-weight: bold; opacity: 0.7; color: #2e3f75}
   p.subtitulo { margin-top: 5px !important; height: 40px; font-size: 12px; line-height: 18px; margin: 0; color:#5f677d; opacity: 0.6; margin-bottom: 31px; }
    a { color:#2e3f75; font-weight: bold; position: absolute; bottom: 23px; text-decoration: none; font-size: 12px; display: block; }
    a img { display: inline-block; width: 18px; margin-left: 10px; opacity: 0.5; margin-bottom: 0px; }
    ul { padding: 0 0 0 4px; margin-bottom: 40px; }
    ul li {
        list-style: none;
    }
    ul li i {
        color: #41C78F;
    }

    ul li span {
        opacity: 0.4;
        font-size: 12px;
        color: #1c2e66;
        margin-left: 5px;
        line-height: 26px;
    }

    @media only screen and (max-width: 899px) {
         width: 100%;
         margin-bottom: 10px;
         padding: 13px;
        span { color:#41C78F; }
        p { display: none; }
        a { position: relative; margin-top: 15px; bottom: 0px }
    }
`;

export default function ChoosePlan(props) {
    const [periodicity, setPeriodicity] = useState(true);
    const [precoStarter, setPrecoStarter] = useState('R$ 59,90/mês');
    const [precoMaster, setPrecoMaster] = useState('R$ 79,90/mês');

    useEffect(() => {
        if (periodicity) {
            // mensal
            setPrecoStarter('R$ 59,90/mensal');
            setPrecoMaster('R$ 79,90/mensal');
        } else {
            // anual
            setPrecoStarter('R$ 575,04/anual (20% de desconto)');
            setPrecoMaster('R$ 767,04/anual (20% de desconto)');
        }
    }, [periodicity]);

    const chooseProduct = (plan) => {
        if (plan == 'starter') {
            props.formik.setFieldValue('product_selected', {
                id: 'starter',
                name: 'Plano Starter',
                description: (periodicity ? 'Mensal' : 'Anual com 20% de desconto'),
                periodicity: (periodicity ? 'monthly' : 'annually'),
                price: (periodicity ? 59.9 : 575.04),
            });
        } else if (plan == 'master') {
            props.formik.setFieldValue('product_selected', {
                id: 'master',
                name: 'Plano Master',
                description: (periodicity ? 'Mensal' : 'Anual com 20% de desconto'),
                periodicity: (periodicity ? 'monthly' : 'annually'),
                price: (periodicity ? 79.9 : 767.04),
            });
        }
    }

    return (
        <Content>
            <h3>{props.title}</h3>
            <p>{props.subtitle}</p>

            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                <span style={{fontSize: '12px', lineHeight: '36px', marginRight: '10px'}}>Anual</span>
                <FormControl component="fieldset" style={{width: '40px'}}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={periodicity}
                                    value="gilad"
                                    onChange={() => setPeriodicity(!periodicity)}
                                />
                            }
                        />
                    </FormGroup>
                </FormControl>
                <span style={{fontSize: '12px', lineHeight: '36px', marginLeft: '10px'}}>Mensal</span>
            </div>
            <div className="row">
            <div className="col-lg-6 col-12 mb-5">
                    <Produto onClick={() => chooseProduct('starter')}>
                        <span>PLANO STARTER</span>
                        <p className="preco">{precoStarter}</p>
                        <p className="subtitulo">Plano Inicial básico para advogados iniciando a carreira.</p>
                        <ul>
                            <li><i className="icon-lg fas fa-check"></i> <span>Banco de petições (ILIMITADO)</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Busca de jurisprudências (ILIMITADO)</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>1 oportunidade grátis de potenciais clientes</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Acesso a plataforma JUSFINDER</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>1 cálculo Revisional</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>5 cálculos de Atualização de Valores</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>5 cálculos de Correção do FGTS</span></li>
                        </ul>
                        <a href="#">Assinar agora <img src={toAbsoluteUrl("/media/icon-arrow.svg")} /></a>
                    </Produto>
                </div>
                <div className="col-lg-6 col-12 mb-5">
                    <Produto onClick={() => chooseProduct('master')}>
                        <span>PLANO MASTER</span>
                        <p className="preco">{precoMaster}</p>
                        <p className="subtitulo">Plano completo para você. Tenha acesso a todas ferramentas necessárias para o seu escritório.</p>
                        <ul>
                            <li><i className="icon-lg fas fa-check"></i> <span>Banco de petições (ILIMITADO)</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Busca de jurisprudências (ILIMITADO)</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>3 oportunidades grátis mensais de potenciais clientes</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Acesso a plataforma JUSFINDER</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>5 consultas grátis mensais de busca localização</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Cálculos Revisionais ILIMITADOS</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Cálculos de Atualização de Valores ILIMITADOS</span></li>
                            <li><i className="icon-lg fas fa-check"></i> <span>Cálculos de Correção do FGTS ILIMITADOS</span></li>
                        </ul>
                        <a href="#">Assinar agora <img src={toAbsoluteUrl("/media/icon-arrow.svg")} /></a>
                    </Produto>
                </div>
            </div>
        </Content>
    ); 
}