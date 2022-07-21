import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Button, Card, Accordion} from "react-bootstrap";
import { useSelector } from 'react-redux';
import FloatToCurrency from '../../../helpers/FloatToCurrency';
import { format, parseISO } from 'date-fns';
import axios from "axios";
import { renderToString } from 'react-dom/server'
import RelatorioTempoContribuicao from './RelatorioTempoContribuicao';
import RelatorioRMICompleto from './RelatorioRMICompleto';
import { ServerStyleSheet } from 'styled-components'
import { Link } from 'react-router-dom';

export default function Relatorios(props) {
    const relatorios = useSelector(state => state.app.report_prev);

    useEffect(() => {
        if (Object.keys(relatorios).length > 0) {
            /*
            const id = 'info-segurado';
            const yOffset = -140; 
            const element = document.getElementById(id);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            */
        }
    }, [relatorios]);

    const [screen, setScreen] = useState('regras');
    const [calculo, setCalculo] = useState({});
    const [relatorioEscolhido, setRelatorioEscolhido] = useState('TEMPO_CONTRIBUICAO');
    const voltarRegras = () => {
        setScreen('regras');
    }

    const abrirCalculo = (calculo) => {
        console.log(calculo)
        setCalculo(calculo);
        setScreen('calculo');
    }

    const generatePdfRMI = async () => {
        const sheet = new ServerStyleSheet()

        const pagePlaceholder = renderToString(sheet.collectStyles(<RelatorioRMICompleto dados={relatorios} regra={calculo} key={456435} />));
        const styles = sheet.getStyleTags()

        const html = `
        <!doctype html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Relatório</title>
                <style type="text/css">
             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
             body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }

                </style>
                ${styles}
            </head>
            <body>
                ${pagePlaceholder}
            </body>
        </html>
        `;
        
        const response = await axios.post(process.env.REACT_APP_API_URL + `/prev/pdf`, { html });
        window.open(response.data.data.pdf_filename);
    }


    const generatePdfTempo = async () => {
        const sheet = new ServerStyleSheet()

        const pagePlaceholder = renderToString(sheet.collectStyles(<RelatorioTempoContribuicao dados={relatorios} regra={calculo} key={34345} />));
        const styles = sheet.getStyleTags()

        const html = `
        <!doctype html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Relatório</title>
                <style type="text/css">
             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
             body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }

                </style>
                ${styles}
            </head>
            <body>
                ${pagePlaceholder}
            </body>
        </html>
        `;
        
        const response = await axios.post(process.env.REACT_APP_API_URL + `/prev/pdf`, { html });
        window.open(response.data.data.pdf_filename);
    }

    return (
        <>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '40px'}}>
                { screen == 'regras' &&
<>
<div className="row mb-5">
            <div className="col">
                <a href="#" className="btn btn-secondary" onClick={props.back}><i className="flaticon2-left-arrow-1 icon-sm"></i> VOLTAR</a>
            </div>
        </div>
                { relatorios.regras && relatorios.regras.map((rule, key) => (
                    <Accordion defaultActiveKey={0} className="accordion-solid">
                        <div className="card" style={{marginBottom: '0'}}>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={0}>
                                <div className="card-header">
                                    <div className="card-title collapsed">
                                    { rule.regra.enabled &&
                                        <i className="flaticon2-check-mark text-success"></i>
                                    }
                                    { !rule.regra.enabled &&
                                        <i className="flaticon2-cancel text-danger"></i>
                                    }
                                    {rule.regra.title}
                                    </div>
                                </div>
                            </Accordion.Toggle>
                        </div>
                    <Accordion.Collapse eventKey={0}>
                        <Card.Body style={{padding: '15px 0px 9px 18px', borderLeft: '2px solid #F3F6F9'}}>
                            <p style={{fontWeight: '600', marginBottom: '15px'}}>{rule.regra.subtitle}</p>
                            <div className="row">
                                <div className="col-xl-8">
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    {rule.regra.conditions.map(condition => (
                                        <div className="col-xl-3">
                                        { condition.missing !== false &&
                                            <p className="label label-warning label-pill label-inline mb-5">{condition.missing}</p>
                                        }
                                        { condition.missing === false &&
                                            <p className="mb-5">&nbsp;</p>
                                        }
                                            <p><strong>{condition.calculated}</strong></p>
                                            <p className="font-size-sm">{condition.condition}</p>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="row">
                                    <div className="col-xl-6">
                                        <p style={{fontSize: '18px', fontWeight: 'bold'}}>R$ {FloatToCurrency(rule.regra.rmi)}</p>
                                        <p className="font-size-sm">RMI Normal</p>

                                        <button type="button" style={{width: '100%'}} className="btn btn-primary font-size-sm btn-sm" onClick={() => abrirCalculo(rule.regra)}>VER CÁLCULO</button>
                                    </div>
                                { rule.revisaoVidaToda &&
                                    <div className="col-xl-6">
                                        <p style={{fontSize: '18px', fontWeight: 'bold'}}>R$ {FloatToCurrency(rule.revisaoVidaToda.rmi)}</p>
                                        <p className="font-size-sm">RMI Revisão da Vida Toda</p>

                                        <button type="button" style={{width: '100%'}} className="btn btn-primary font-size-sm btn-sm" onClick={() => abrirCalculo(rule.revisaoVidaToda)}>VER CÁLCULO</button>
                                    </div>
                                }
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                    
                    </Accordion>
                    
                ))}
</>
                }


        { screen == 'calculo' &&
            <>
                <div className="row mb-5">
                    <div className="col">
                        <a href="#" className="btn btn-secondary" onClick={voltarRegras}><i className="flaticon2-left-arrow-1 icon-sm"></i> BENEFÍCIOS</a>
                    </div>
                </div>

                { Object.keys(calculo).length > 0 &&
            <>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>SOMA DOS SALÁRIOS</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>R$ {FloatToCurrency(calculo.soma_salarios)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>MÉDIA DOS SALÁRIOS</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>R$ {FloatToCurrency(calculo.media_salarios)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>RMI</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>R$ {FloatToCurrency(calculo.rmi)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>QTD. CONTRIBUIÇÕES</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>{calculo.quantidade_contribuicoes}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>COEFICIENTE</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>{calculo.coeficiente}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { calculo.divisor_minimo &&
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>DIVISOR MÍNIMO</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>{calculo.divisor_minimo}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }


                    </div>

                    <div className="row">
       
                    { calculo.fator_previdenciario &&
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>FATOR PREVIDENCIÁRIO</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>{calculo.fator_previdenciario}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    { calculo.subteto &&
                        <div className="col-xl-4">
                            <div className="card card-custom gutter-b" style={{height: '130px', backgroundColor: 'rgb(22, 64, 198)'}}>
                                <div className="card-body d-flex flex-column p-0" style={{position: 'relative'}}>
                                    <div className="flex-grow-1 card-spacer-x pt-6" style={{color: '#fff'}}>
                                        <div className="font-weight-bold" style={{opacity: 0.7}}>Subteto</div>
                                        <div className="font-weight-bolder" style={{fontSize: '2.4rem'}}>R$ {FloatToCurrency(calculo.subteto)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
               
                    
                    <ul className="dashboard-tabs nav nav-pills row row-paddingless m-0 p-0 flex-column flex-sm-row" role="tablist">
	<li className="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
		<a onClick={() => setRelatorioEscolhido('TEMPO_CONTRIBUICAO')} className={"nav-link border py-10 d-flex flex-grow-1 rounded flex-column align-items-center " + (relatorioEscolhido == 'TEMPO_CONTRIBUICAO' ? 'card-active' : '')}>
			<span className="nav-icon py-2 w-auto">

                    <i className="flaticon-clock icon-3x"> &nbsp;</i>
			</span>
			<span className="nav-text font-size-lg py-2 font-weight-bold text-center">Tempo de contribuição</span>
		</a>
	</li>
	<li className="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
    <a onClick={() => setRelatorioEscolhido('RMI')} className={"nav-link border py-10 d-flex flex-grow-1 rounded flex-column align-items-center " + (relatorioEscolhido == 'RMI' ? 'card-active' : '')}>
			<span className="nav-icon py-2 w-auto">
                <i className="flaticon-graphic-1 icon-3x"></i>
			</span>
			<span className="nav-text font-size-lg py-2 font-weight-bolder text-center">Renda mensal inicial</span>
		</a>
	</li>
    <li className="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
    <Link target="_blank" to="/peticoes/listagem/49" className={"nav-link border py-10 d-flex flex-grow-1 rounded flex-column align-items-center"}>
			<span className="nav-icon py-2 w-auto">
                <i className="flaticon2-paper icon-3x"></i>
			</span>
			<span className="nav-text font-size-lg py-2 font-weight-bolder text-center">Petições</span>
		</Link>
	</li>
</ul>       
{relatorioEscolhido == 'RMI' &&

                    <div className="mt-10">
                        <button type="button" class="btn btn-success mb-10" onClick={generatePdfRMI}>
                            <i class="flaticon2-download"></i> Baixar PDF
                        </button>
                        <h3>RMI: <strong>R$ {FloatToCurrency(calculo.rmi)}</strong></h3>

                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>VÍNCULO</th>
                                    <th>SALÁRIO</th>
                                    <th>ÍNDICE</th>
                                    <th>SALÁRIO CONSIDERADO</th>
                                </tr>
                            </thead>
                            <tbody>
                            { calculo.contribuicoes.map(contribuicao => (
                                <tr className={(contribuicao.desconsiderado && contribuicao.desconsiderado === true) ? 'striked' : ''}>
                                    <td>{format(parseISO(contribuicao.competencia), 'MM/yyyy')} {contribuicao.vinculo}</td>
                                    <td>R$ {FloatToCurrency(contribuicao.contribuicao)}</td>
                                    <td>{contribuicao.correcao}</td>
                                    <td>R$ {FloatToCurrency(contribuicao.contribuicao_corrigida)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
}

{relatorioEscolhido == 'TEMPO_CONTRIBUICAO' &&


                    <div className="mt-10">
                        <button type="button" class="btn btn-success mb-10" onClick={generatePdfTempo}>
                            <i class="flaticon2-download"></i> Baixar PDF
                        </button>

                        <h3>Tempo de contribuição: <strong>{calculo.tempo_contribuicao.tempo.years}a, {calculo.tempo_contribuicao.tempo.months}m, {calculo.tempo_contribuicao.tempo.days}d.</strong></h3>


                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>VÍNCULO</th>
                                    <th>TEMPO DE CONTRIBUIÇÃO</th>
                                    <th>TEMPO CALCULADO</th>
                                </tr>
                            </thead>
                            <tbody>
                            { calculo.vinculos.map(vinculo => (
                                <tr>
                            <td><strong>{vinculo.company_name}</strong><br/>{format(parseISO(vinculo.start_date), 'dd/MM/yyyy')} até {format(parseISO(vinculo.end_date), 'dd/MM/yyyy')}</td>
                            <td>{vinculo.tempo_contribuicao.years}a, {vinculo.tempo_contribuicao.months}m, {vinculo.tempo_contribuicao.days}d</td>
                            <td>{vinculo.tempo_contribuicao.years}a, {vinculo.tempo_contribuicao.months}m, {vinculo.tempo_contribuicao.days}d</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
}

                </>
                }
            </>
        }
                </div>
            </div>
        </div>
        </>

    );
}