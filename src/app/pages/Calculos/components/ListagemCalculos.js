import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import BlockUi from 'react-block-ui';
import Accordion from './Accordion';

export default function ListagemCalculos(props) {
    const calculations = useSelector(state => state.app.calculations);
    const dispatch = useDispatch();
    const [isArchiving, setIsArchiving] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const unlocked_users = useSelector((state) => state.app.unlocked_users);


    const arquivar = async (id) => {
        if (!window.confirm("Deseja realmente arquivar este cálculo?")) {
            return;
        }

        setIsArchiving(true);
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + `/calculations/archive`, { id });
            if (response.data.success === false) {
                toast.error('Ocorreu um erro ao arquivar o seu cálculo, tente novamente.');
            } else {
                toast.success('Cálculo arquivado com sucesso!');
                dispatch({ type: 'LOAD_CALCULATIONS' });
            }
        } catch (err) {
            toast.error('Ocorreu um erro ao arquivar o seu cálculo, tente novamente.');
        }
        setIsArchiving(false);
    }

    return (
        
        <BlockUi tag="div" blocking={isArchiving}>
            {(user && user.email && unlocked_users.includes(user.email) && calculations && calculations.prev && calculations.prev.filter(calculation => calculation.archived == props.archived).length > 0) &&
                <Accordion title={`JusPrev (${calculations.prev.filter(calculation => calculation.archived == props.archived).length})`}>
                {calculations.prev.filter(calculation => calculation.archived == props.archived).map(calculation => (
                    <div className="col-xl-4 oportunidade mb-8 relative" key={calculation.id}>
                        {!props.archived &&
                            <div className="input-remover-container">
                                <div className="icon-remover pointer" onClick={() => arquivar(calculation.id)}><span>&times;</span></div>
                            </div>
                        }
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '2px solid #e6eaef' }}>
                            <div>
                                <p className="tipo-campo">DATA DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{format(parseISO(calculation.created_at), 'dd/MM/yyyy')}</p>
                                <p className="tipo-campo">CLIENTE</p>
                                <p className="font-size-lg font-weight-bold">{calculation.customer}&nbsp;</p>
                            </div>

                            <Link to={`/calculadora_cnis/${calculation.id}`}><p className="primary font-size-sm font-weight-boldest mb-0 pointer link">VISUALIZAR CÁLCULO</p></Link>
                        </div>
                    </div>
                ))}
                </Accordion>
            }

            {(calculations && calculations.review && calculations.review.filter(calculation => calculation.archived == props.archived).length > 0) &&
                <Accordion title={`JusRevisional (${calculations.review.filter(calculation => calculation.archived == props.archived).length})`}>
                {calculations.review.filter(calculation => calculation.archived == props.archived).map(calculation => (
                    <div className="col-xl-4 oportunidade mb-8 relative" key={calculation.id}>
                        {!props.archived &&
                            <div className="input-remover-container">
                                <div className="icon-remover pointer" onClick={() => arquivar(calculation.id)}><span>&times;</span></div>
                            </div>
                        }
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '2px solid #e6eaef' }}>
                            <div>
                                <p className="tipo-campo">DATA DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{format(parseISO(calculation.created_at), 'dd/MM/yyyy')}</p>
                                <p className="tipo-campo">CLIENTE</p>
                                <p className="font-size-lg font-weight-bold">{calculation.customer}&nbsp;</p>
                            </div>

                            <Link to={`/revisional/${calculation.id}`}><p className="primary font-size-sm font-weight-boldest mb-0 pointer link">VISUALIZAR CÁLCULO</p></Link>
                        </div>
                    </div>
                ))}
                </Accordion>
            }

            {(calculations && calculations.correction_simple && calculations.correction_simple.filter(calculation => calculation.archived == props.archived).length > 0) &&
                <Accordion title={`JusCalc Simples (${calculations.correction_simple.filter(calculation => calculation.archived == props.archived).length})`}>
                {calculations.correction_simple.filter(calculation => calculation.archived == props.archived).map(calculation => (
                    <div className="col-xl-4 oportunidade mb-8 relative" key={calculation.id}>
                        {!props.archived &&
                            <div className="input-remover-container">
                                <div className="icon-remover pointer" onClick={() => arquivar(calculation.id)}><span>&times;</span></div>
                            </div>
                        }
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '2px solid #e6eaef' }}>
                            <div>
                                <p className="tipo-campo">DATA DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{format(parseISO(calculation.created_at), 'dd/MM/yyyy')}</p>
                                <p className="tipo-campo">IDENTIFICAÇÃO DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{calculation.name}&nbsp;</p>
                            </div>

                            <Link to={`/atualizacao/${calculation.id}`}><p className="primary font-size-sm font-weight-boldest mb-0 pointer link">VISUALIZAR CÁLCULO</p></Link>

                        </div>
                    </div>
                ))}
                </Accordion>
            }

            {(calculations && calculations.correction_complete && calculations.correction_complete.filter(calculation => calculation.archived == props.archived).length > 0) &&
                <Accordion title={`JusCalc Completo (${calculations.correction_complete.filter(calculation => calculation.archived == props.archived).length})`}>
                {calculations.correction_complete.filter(calculation => calculation.archived == props.archived).map(calculation => (
                    <div className="col-xl-4 oportunidade mb-8 relative" key={calculation.id}>
                        {!props.archived &&
                            <div className="input-remover-container">
                                <div className="icon-remover pointer" onClick={() => arquivar(calculation.id)}><span>&times;</span></div>
                            </div>
                        }
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '2px solid #e6eaef' }}>
                            <div>
                                <p className="tipo-campo">DATA DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{format(parseISO(calculation.created_at), 'dd/MM/yyyy')}</p>
                                <p className="tipo-campo">NOME DAS PARTES</p>
                                {calculation.stakeholders.map((stakeholder, key) => (
                                    <p key={key} className="font-size-lg font-weight-bold mb-0">{stakeholder}</p>
                                ))}
                            </div>

                            <Link to={`/atualizacao_completo/${calculation.id}`}><p className="primary font-size-sm font-weight-boldest mb-0 mt-5 pointer link">VISUALIZAR CÁLCULO</p></Link>

                        </div>
                    </div>
                ))}
                </Accordion>
            }

            {(calculations && calculations.correction_fgts && calculations.correction_fgts.filter(calculation => calculation.archived == props.archived).length > 0) &&
                <Accordion title={`JusCalc FGTS (${calculations.correction_fgts.filter(calculation => calculation.archived == props.archived).length})`}>

                {calculations.correction_fgts.filter(calculation => calculation.archived == props.archived).map(calculation => (
                    <div className="col-xl-4 oportunidade mb-8 relative" key={calculation.id}>
                        {!props.archived &&
                            <div className="input-remover-container">
                                <div className="icon-remover pointer" onClick={() => arquivar(calculation.id)}><span>&times;</span></div>
                            </div>
                        }
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '2px solid #e6eaef' }}>
                            <div>
                                <p className="tipo-campo">DATA DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{format(parseISO(calculation.created_at), 'dd/MM/yyyy')}</p>
                                <p className="tipo-campo">AUTOR</p>
                                <p className="font-size-lg font-weight-bold">{calculation.author}&nbsp;</p>
                            </div>

                            <Link to={`/fgts/${calculation.id}`}><p className="primary font-size-sm font-weight-boldest mb-0 pointer link">VISUALIZAR CÁLCULO</p></Link>

                        </div>
                    </div>
                ))}
                </Accordion>
            }
            {(calculations && calculations.childcare && calculations.childcare.filter(calculation => calculation.archived == props.archived).length > 0) &&

                <Accordion title={`JusCalc Pensão (${calculations.childcare.filter(calculation => calculation.archived == props.archived).length})`}>
                {calculations.childcare.filter(calculation => calculation.archived == props.archived).map(calculation => (
                    <div className="col-xl-4 oportunidade mb-8 relative" key={calculation.id}>
                        {!props.archived &&
                            <div className="input-remover-container">
                                <div className="icon-remover pointer" onClick={() => arquivar(calculation.id)}><span>&times;</span></div>
                            </div>
                        }
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '2px solid #e6eaef' }}>
                            <div>
                                <p className="tipo-campo">DATA DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{format(parseISO(calculation.created_at), 'dd/MM/yyyy')}</p>
                                <p className="tipo-campo">IDENTIFICAÇÃO DO CÁLCULO</p>
                                <p className="font-size-lg font-weight-bold">{calculation.name}&nbsp;</p>
                            </div>

                            <Link to={`/pensao/${calculation.id}`}><p className="primary font-size-sm font-weight-boldest mb-0 pointer link">VISUALIZAR CÁLCULO</p></Link>
                        </div>
                    </div>
                ))}
                </Accordion>
            }

        </BlockUi>
    );
}