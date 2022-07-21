import React, { useState } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

const Wrapper = styled.div`
    .display-flex {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }

    .space-between {
        justify-content:  space-between;
        -webkit-box-pack: justify;
    }

    p {
        margin-bottom: 0px !important;
    }

`;
const Table = styled.table`
    
    width: 100%;
    background-color: transparent;
    border-collapse: separate;
    border-spacing: 5px;
    font-size: 11px;
    text-align: left;


tbody {
    font-size: 11px;
}

tbody tr:nth-child(odd) td{
    background-color: #fff;
}

tbody tr:nth-child(even) td{
    background-color: #E4EBFC;
}

tbody td { color: #55628e; }
thead th { font-size: 11px; color: #FFF; background-color: #091D5C !important; font-weight: 500; }
tbody td { color: #55628e;}

.cabecalho { margin-bottom: 80px }
.cabecalho p { font-size: 14px; color: #091D5C; font-weight: 500; letter-spacing: -0.02em; }

p.header-dados {font-size: 16px; font-weight: 600; color: #091D5C; margin-bottom:10px}
.dados {
    justify-content:  space-between;
    -webkit-box-pack: justify;
}
.dados p {color: #55628e; font-size: 13px }

tbody tr.footer td { font-weight: bold; }
`;




export default function RelatorioTempoContribuicao(props) {
    return (
    <Wrapper style={{padding: '20px', fontSize: '13px'}}>
        <img src="https://master.d3h4ov5s0xevwq.amplifyapp.com/media/logo-azul.svg" style={{marginTop: '10px'}} />
        <h3 style={{marginTop: '0px'}}>RELATÓRIO DE TEMPO DE CONTRIBUIÇÃO</h3>
        <div className="display-flex space-between" style={{flexDirection: 'row', width: '85%'}}>
            <div>
                <p>Dados de cliente</p>
                <p><strong>{props.dados.nome}</strong></p>
                <p>Idade: {props.dados.idade.years}a, {props.dados.idade.months}m, {props.dados.idade.days}d</p>
                <p>CPF: {props.dados.cpf}</p>
                <p>Data de nascimento: {format(parseISO(props.dados.data_nascimento), 'dd/MM/yyyy')}</p>
                <p>Sexo: {(props.dados.sexo == 'M' ? 'MASCULINO' : 'FEMININO')}</p>
            </div>
            <div>
                <p>Dados de cálculo {props.key}</p>

                <p><strong>DATA DO CÁLCULO: {format(new Date(), 'dd/MM/yyyy')}</strong></p>
                <p>Tempo de contribuição: {props.regra.tempo_contribuicao.tempo.years}a, {props.regra.tempo_contribuicao.tempo.months}m, {props.regra.tempo_contribuicao.tempo.days}d</p>
            {props.regra.carencia && 
                <p>Carência: {props.regra.carencia} meses</p>
            }
            </div>

        </div>
        <p>Benefício: {(props.regra.title + '. ' + props.regra.subtitle)}</p>


        <Table>
            <thead>
                <tr>
                    <th>Descrição e período</th>
                    <th>Tempo de contribuição</th>
                    <th>Tempo calculado</th>
                </tr>
            </thead>
            <tbody>
            { props.regra.vinculos.map(vinculo => (
                <tr>
                    <td><strong>{vinculo.company_name}</strong><br/>{format(parseISO(vinculo.start_date), 'dd/MM/yyyy')} até {format(parseISO(vinculo.end_date), 'dd/MM/yyyy')}</td>
                    <td>{vinculo.tempo_contribuicao.years}a, {vinculo.tempo_contribuicao.months}m, {vinculo.tempo_contribuicao.days}d</td>
                    <td>{vinculo.tempo_contribuicao.years}a, {vinculo.tempo_contribuicao.months}m, {vinculo.tempo_contribuicao.days}d</td>
                </tr>
            ))}
            </tbody>
        </Table>

    </Wrapper>

    );
}