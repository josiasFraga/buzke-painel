import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import BlockUi from 'react-block-ui';
import { Modal } from "react-bootstrap";
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import styled from 'styled-components';
import ModalViewOpportunity from '../../components/ModalViewOpportunity';
import FloatToCurrency from '../../helpers/FloatToCurrency';

const ButtonUnlock = styled.button`
    height: 40px;
    color: #FFF;
    background-color: #091D5C;
    font-size: 14px;
    letter-spacing: -0.02em;
    font-weight: bold;

    :hover {
        opacity: 0.6;
    }
`;

const ButtonUnlocked = styled.button`
    height: 40px;
    color: #FFF;
    background-color: #7D89AB;
    font-size: 14px;
    letter-spacing: -0.02em;
    font-weight: bold;

    :hover {
        opacity: 0.6;
    }
`;

const OpportunitiesContainer = styled.div`
    background-color: #FFF;
    border: 1px solid #eaeaea;
    padding: 25px 25px 15px 25px;
    border-radius: 5px;
`;

const OpportunityTypes = styled.div`
    padding: 0px 0px 13px 13px;    
`;

const OpportunityTypesButton = styled.div`
    background-color: ${props => props.active ? '#41C78F' : '#F5F7FA'};
    color: ${props => props.active ? '#FFF' : '#7D89AB'};
    font-weight: bold;
    text-align: center;
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 8px 8px 0 0;
    margin-right: 10px;
    cursor: pointer;
`;

export function Oportunidades() {
    const dispatch = useDispatch();
    const subheader = useSubheader();

    const opportunities = useSelector(state => state.app.opportunities);
    const is_opportunities_loading = useSelector(state => state.app.is_opportunities_loading);
    const [opportunity, setOpportunity] = useState({});
    const [opportunityTypes, setOpportunityTypes] = useState('lockeds');
    const [isModalViewOpportunityOpen, setIsModalViewOpportunityOpen] = useState(false);

    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Oportunidades',
                title: 'Oportunidades',
                href: ''
            }
        ])
    }, []);

    useEffect(() => {
        dispatch({type: 'LOAD_OPPORTUNITIES'});
    }, []);

    const view = (opportunity) => {
        setIsModalViewOpportunityOpen(true);
        setOpportunity(opportunity);
    }

    const unlock = (id) => {
        if (!window.confirm("Deseja realmente desbloquear esta oportunidade?")) {
            return;
        }
        dispatch({type: 'UNLOCK_OPPORTUNITY', payload: {
            submitValues: {
                id: id
            },
            callback: () => {
                //setIsUnlockModalOpen(false);
                dispatch({type: 'LOAD_OPPORTUNITIES'});
                setOpportunityTypes('unlockeds');
            }
        }});
    }
    return (<>
        <div className="page-oportunidades">
            <ModalViewOpportunity opportunity={opportunity} isOpen={isModalViewOpportunityOpen} close={() => setIsModalViewOpportunityOpen(false)} />
            <h1 className="azul-cabecalho">JusMatch</h1>
            <p className="mb-10" style={{fontSize: '15px', opacity: '0.6'}}>Confira as últimas oportunidades de clientes disponíveis para você.</p>

            <BlockUi tag="div" blocking={is_opportunities_loading}>
                <div className="row">
                    <div className="col-xl-12">
                        <OpportunitiesContainer style={{ border: '2px solid #EBEDF3'}}>
                            <OpportunityTypes className="row">
                                <OpportunityTypesButton
                                    active={(opportunityTypes == 'lockeds')}
                                    onClick={() => setOpportunityTypes('lockeds')}
                                    style={{ fontSize: '16px'}}
                                >
                                    TODAS
                                </OpportunityTypesButton>

                                <OpportunityTypesButton
                                    active={(opportunityTypes == 'unlockeds')}
                                    onClick={() => setOpportunityTypes('unlockeds')}
                                    style={{ fontSize: '16px'}}
                                >
                                    ADQUIRIDAS
                                </OpportunityTypesButton>
                            </OpportunityTypes>
                            <div className="hr" style={{margin: '-14px 0px 10px 1px'}}></div>

                        {(opportunities.filter(opportunity => opportunity.unlocked == (opportunityTypes == 'unlockeds')).length == 0) &&
                            <p className="value">Não há oportunidades para este filtro.</p>
                        }
                        {opportunities.filter(opportunity => opportunity.unlocked == (opportunityTypes == 'unlockeds')).map(item => (


                            <div className="row mb-10">
                                <div className="col-12">
                                    <div style={{backgroundColor: '#fff', padding: '40px 40px 35px 40px', borderRadius: '10px', border: '2px solid #EBEDF3'}}>

                                        <div className="d-flex" style={{justifyContent: 'space-between'}}>
                                            <div className="d-flex" style={{flexDirection: 'column', width: '30%'}}>  
                                                <h2 className="azul-cabecalho">{item.name.toUpperCase()}</h2>
                                                <p style={{opacity: '0.6'}}>AÇÃO REVISIONAL</p>


                                            </div>
                                            <div className="d-flex flex-grow-1" style={{flexDirection: 'column'}}>  
                                                <p style={{marginBottom: '1px', opacity: '0.6', fontWeight: '600'}}>VALOR CONTRATADO</p>
                                            
                                                <p style={{fontSize: '36px', letterSpacing: '-0.04em', fontWeight: 'bold', color: '#41c78f', marginTop: '-10px'}}>
                                                    { item.amount > 0 &&
                                                        <>R$ {FloatToCurrency(item.amount)}</>
                                                    }
                                                </p>


                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                            {!item.unlocked &&
                                                <ButtonUnlock className="btn btnDefault unlock" onClick={() => unlock(item.id)}>DESBLOQUEAR</ButtonUnlock>
                                            }
                                            {item.unlocked &&
                                                <ButtonUnlocked className="btn btnDefault view" onClick={() => view(item)}>VISUALIZAR</ButtonUnlocked>
                                            }


                                            </div>
                                        </div>

                                        <div className="hr mb-5"></div>
                                        <div className="d-flex" style={{justifyContent: 'space-between'}}>
                                            <div style={{width: '18%'}}>
                                                <p className="tipo-campo">TELEFONE</p>
                                                <p className="campo">{item.phone}</p>
                                            </div>
                                            <div style={{width: '18%'}}>
                                                <p className="tipo-campo">INTERESSES</p>
                                                <p className="campo">{item.orders}</p>
                                            </div>
                                            <div style={{width: '18%'}}>
                                                <p className="tipo-campo">ESTADO</p>
                                                <p className="campo">{item.state}</p>
                                            </div>
                                        { /*
                                            <div style={{width: '18%'}}>
                                                <p className="tipo-campo">TEMPO DE CONTATO</p>
                                                <p className="campo">{item.long_ago}</p>
                                            </div>
                                        */ }
                                        </div>
                                    </div>

                                </div>
                            </div>
                            ))}
                        </OpportunitiesContainer>
                    </div>
                </div>
        </BlockUi>
        </div>
  </>);
}