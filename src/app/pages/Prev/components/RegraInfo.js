import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FloatToCurrency from '../../../helpers/FloatToCurrency';
import axios from "axios";
import { renderToString } from 'react-dom/server'
import RelatorioTempoContribuicao from './RelatorioTempoContribuicao';
import RelatorioRMICompleto from './RelatorioRMICompleto';
import { ServerStyleSheet } from 'styled-components'
import { Link } from 'react-router-dom';
import RelatorioTempoContribuicaoHtml from './RelatorioTempoContribuicaoHtml';
import RelatorioRMIHtml from './RelatorioRMIHtml';

export default function RegraInfo(props) {
    const relatorios = useSelector(state => state.app.report_prev);
    const [calculo, setCalculo] = useState({});
    const [relatorioEscolhido, setRelatorioEscolhido] = useState('RMI');
    
    const abrirCalculo = (calculo_param) => {
        setCalculo(calculo_param);
        props.setScreen('calculo');
    }

    return (
        <div className="boxInfo pl-10 pr-10">
        { props.screen == 'info' &&
        <>
            <h4 className="mt-10"></h4>
            <span>{relatorios.regras[props.regraAberta].regra.title}</span><br/>
            <span style={{fontSize: '12px'}}>{relatorios.regras[props.regraAberta].regra.subtitle}</span>

            <h5 className="mt-15">Resumo</h5>
            <hr />

            <div className="row">
            {relatorios.regras[props.regraAberta].regra.conditions.map(condition => (
                <div className="col-3 mt-3">
                    <span className="title">{condition.condition}</span>
                    <h2>{condition.calculated}</h2>
                { condition.missing &&
                    <span className="badge badge-primary">{condition.missing}</span>
                }
                </div>
            ))}
            </div>

            <h5 className="mt-15">Renda Mensal Inicial</h5>
            <hr />

            <div className="row">
                <div className="col-3 mt-3">
                    <span className="title">Normal</span>
                    <h2>R$ {FloatToCurrency(relatorios.regras[props.regraAberta].regra.rmi)}</h2>
                    <span className="badge badge-primary calc" onClick={() => abrirCalculo(relatorios.regras[props.regraAberta].regra)}>Ver Cálculo</span>
                </div>
            { relatorios.regras[props.regraAberta].revisaoVidaToda &&
                <div className="col-4 mt-3">
                    <span className="title">Revisão da Vida Toda</span>
                    <h2>R$ {FloatToCurrency(relatorios.regras[props.regraAberta].revisaoVidaToda.rmi)}</h2>
                    <span className="badge badge-primary calc" onClick={() => abrirCalculo(relatorios.regras[props.regraAberta].revisaoVidaToda)}>Ver Cálculo</span>
                </div>
            }
            </div>
        </>
        }

        { props.screen == 'calculo' && Object.keys(calculo).length > 0 &&
        <>
            <a href="#" className="btn btn-secondary" onClick={() => props.setScreen('info')}><i className="flaticon2-left-arrow-1 icon-sm"></i> VOLTAR</a>

                <h4 className="mt-10">Benefícios</h4>

                <div className="row mt-5">
                    <div className="col-3 ml-5 bgInfo p-10">
                        <span>Soma dos salários</span>
                        <h4>R$ {FloatToCurrency(calculo.soma_salarios)}</h4>
                    </div>

                    <div className="col-3 bgInfo p-10">
                        <span>Média dos salários</span>
                        <h4>R$ {FloatToCurrency(calculo.media_salarios)}</h4>
                    </div>

                    <div className="col-3 bgInfo p-10">
                        <span>RMI</span>
                        <h4>R$ {FloatToCurrency(calculo.rmi)}</h4>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-3 ml-5 bgInfo p-10">
                        <span>QTD. CONTRIBUIÇÕES</span>
                        <h4>{calculo.quantidade_contribuicoes}</h4>
                    </div>

                    <div className="col-3 bgInfo p-10">
                        <span>COEFICIENTE</span>
                        <h4>{calculo.coeficiente}</h4>
                    </div>
                { calculo.divisor_minimo &&
                    <div className="col-3 bgInfo p-10">
                        <span>DIVISOR MÍNIMO</span>
                        <h4>{calculo.divisor_minimo}</h4>
                    </div>
                }
                </div>



                <div className="row mt-5">
                { calculo.fator_previdenciario &&
                    <div className="col-3 ml-5 bgInfo p-10">
                        <span>FATOR PREVIDENCIÁRIO</span>
                        <h4>{calculo.fator_previdenciario}</h4>
                    </div>
                }
                { calculo.subteto &&
                    <div className="col-3 bgInfo p-10">
                        <span>SUBTETO</span>
                        <h4>R$ {FloatToCurrency(calculo.subteto)}</h4>
                    </div>
                }
                </div>

                <h4 className="mt-10">Relatórios</h4>

                <div className="row mt-5">
                    <div className={"col-3 ml-5 bgInfo bgWhite p-6 " + (relatorioEscolhido === 'RMI' ? 'active' : 'notActive')} onClick={() => setRelatorioEscolhido('RMI')}>
                        <i class="flaticon2-paper icon-3x mr-5"></i>
                        <span className="nameR ml-4">Renda mensal inicial</span>
                    </div>
                    <div className={"col-3 ml-5 bgInfo bgWhite p-6 " + (relatorioEscolhido === 'TEMPO_CONTRIBUICAO' ? 'active' : 'notActive')} onClick={() => setRelatorioEscolhido('TEMPO_CONTRIBUICAO')}>
                        <i class="flaticon2-paper icon-3x mr-5"></i>
                        <span className="nameR ml-4">Tempo de contribuição</span>
                    </div>
                    <Link target="_blank" to="/peticoes/listagem/49" className={"col-3 ml-5 bgInfo bgWhite p-6 notActive"}>
                        <i class="flaticon2-paper icon-3x mr-5"></i>
                        <span className="nameR ml-4">Banco de petições</span>
                    </Link>
                </div>

                <p className="mt-7">* Ao selecionar um relatorio será possivel efetuar o download do relatório</p>
            { relatorioEscolhido === 'TEMPO_CONTRIBUICAO' &&
                <RelatorioTempoContribuicaoHtml calculo={calculo} />
            }

            { relatorioEscolhido === 'RMI' &&
                <RelatorioRMIHtml calculo={calculo} />
            }

        </>
        }
        </div>
    );
}
