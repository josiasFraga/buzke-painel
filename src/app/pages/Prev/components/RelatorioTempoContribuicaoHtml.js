import React from 'react';
import { format, parseISO } from 'date-fns';
import RelatorioTempoContribuicao from './RelatorioTempoContribuicao';
import { useSelector } from 'react-redux';
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import axios from "axios";

export default function RelatorioTempoContribuicaoHtml(props) {
    const relatorios = useSelector(state => state.app.report_prev);

    const generatePdfTempo = async () => {
        const sheet = new ServerStyleSheet()

        const pagePlaceholder = renderToString(sheet.collectStyles(<RelatorioTempoContribuicao dados={relatorios} regra={props.calculo} key={34345} />));
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
        <button className="btn btn-primary btnDefault mt-10 mb-7" onClick={generatePdfTempo}>Baixar relatório</button>

        <hr />

        <h4 className="mt-10 mb-7">Tempo de contribuição: <strong>{props.calculo.tempo_contribuicao.tempo.years} anos, {props.calculo.tempo_contribuicao.tempo.months} meses, {props.calculo.tempo_contribuicao.tempo.days} dias.</strong></h4>


        <table class="table">
            <thead>
                <tr>
                    <th className="title">Vínculo</th>
                    <th className="title">Tempo de Contribuição</th>
                    <th className="title">Tempo Calculado</th>
                </tr>
            </thead>

            <tbody>
            { props.calculo.vinculos.map(vinculo => (
                <tr>
                    <td><strong>{vinculo.company_name}</strong><br/>{format(parseISO(vinculo.start_date), 'dd/MM/yyyy')} até {format(parseISO(vinculo.end_date), 'dd/MM/yyyy')}</td>
                    <td style={{verticalAlign: 'middle'}}>{vinculo.tempo_contribuicao.years} anos, {vinculo.tempo_contribuicao.months} meses, {vinculo.tempo_contribuicao.days} dias</td>
                    <td style={{verticalAlign: 'middle'}}>{vinculo.tempo_contribuicao.years} anos, {vinculo.tempo_contribuicao.months} meses, {vinculo.tempo_contribuicao.days} dias</td>
                </tr>
            ))}

            </tbody>
        </table>
    </>
    );
}