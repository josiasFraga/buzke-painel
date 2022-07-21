import React from 'react';
import { format, parseISO } from 'date-fns';
import RelatorioRMICompleto from './RelatorioRMICompleto';
import { useSelector } from 'react-redux';
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import axios from "axios";
import FloatToCurrency from '../../../helpers/FloatToCurrency';

export default function RelatorioRMIHtml(props) {
    const relatorios = useSelector(state => state.app.report_prev);

    const generatePdf = async () => {
        const sheet = new ServerStyleSheet()

        const pagePlaceholder = renderToString(sheet.collectStyles(<RelatorioRMICompleto dados={relatorios} regra={props.calculo} key={456435} />));
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
        <button className="btn btn-primary btnDefault mt-10 mb-7" onClick={generatePdf}>Baixar relatório</button>

        <hr />

        <h4 className="mt-10 mb-7">Renda Mensal Inicial</h4>
        <h3 className="mb-8">Valor: <strong>R$ {FloatToCurrency(props.calculo.rmi)}</strong></h3>

        <table class="table">
            <thead>
                <tr>
                    <th className="title">VÍNCULO</th>
                    <th className="title">SALÁRIO</th>
                    <th className="title">ÍNDICE</th>
                    <th className="title">CORRIGIDO</th>
                </tr>
            </thead>

            <tbody>
            { props.calculo.contribuicoes.map(contribuicao => (
                <tr className={(contribuicao.desconsiderado && contribuicao.desconsiderado === true) ? 'striked' : ''}>
                    <td>{format(parseISO(contribuicao.competencia), 'MM/yyyy')} {contribuicao.vinculo}</td>
                    <td style={{verticalAlign: 'middle'}}>R$ {FloatToCurrency(contribuicao.contribuicao)}</td>
                    <td style={{verticalAlign: 'middle'}}>{contribuicao.correcao}</td>
                    <td style={{verticalAlign: 'middle'}}>R$ {FloatToCurrency(contribuicao.contribuicao_corrigida)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
    );
}