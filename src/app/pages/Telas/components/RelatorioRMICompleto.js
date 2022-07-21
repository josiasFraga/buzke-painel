import React, { useState } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import FloatToCurrency from '../../../helpers/FloatToCurrency';

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
    text-align: right;


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
tbody tr.striked {
    text-decoration: line-through;
  }
  

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

export default function RelatorioRMICompleto(props) {
    return (
    <Wrapper style={{padding: '20px', fontSize: '13px'}}>
        <img src="https://master.d3h4ov5s0xevwq.amplifyapp.com/media/logo-azul.svg" style={{marginTop: '10px'}} />
        <h3 style={{marginTop: '0px'}}>RELATÓRIO DE RENDA MENSAL INICIAL</h3>
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

                <p>RMI: R$ {FloatToCurrency(props.regra.rmi)}</p>
                <p>Soma dos salários: R$ {FloatToCurrency(props.regra.soma_salarios)}</p>

                <p>Média dos salários: R$ {FloatToCurrency(props.regra.media_salarios)}</p>
                <p>Qtd. contribuições: {props.regra.quantidade_contribuicoes}</p>


            { props.regra.divisor_minimo &&
                <p>Divisor mínimo: {props.regra.divisor_minimo}</p>
            }
            { props.regra.fator_previdenciario &&
                <p>Fator previdenciário: {props.regra.fator_previdenciario}</p>
            }
            { props.regra.subteto &&
                <p>Subteto: R$ {props.regra.subteto}</p>
            }

            </div>
        </div>
        <p>Benefício: {(props.regra.title + '. ' + props.regra.subtitle)}</p>



        <Table>
            <thead>
                <tr>
                    <th>COMPETÊNCIA</th>
                    <th>DESCRIÇÃO</th>
                    <th>VALOR ORIGINAL</th>
                    <th>ÍNDICE DE CORREÇÃO</th>
                    <th>VALOR ATUALIZADO</th>
                </tr>
            </thead>
            <tbody>
            { props.regra.contribuicoes.map(contribuicao => (
                    <tr className={(contribuicao.desconsiderado && contribuicao.desconsiderado === true) ? 'striked' : ''}>
                    <td>{format(parseISO(contribuicao.competencia), 'MM/yyyy')}</td>
                    <td>{contribuicao.vinculo}</td>
                    <td>R$ {FloatToCurrency(contribuicao.contribuicao)}</td>
                    <td>{contribuicao.correcao}</td>
                    <td>R$ {FloatToCurrency(contribuicao.contribuicao_corrigida)}</td>
                </tr>
            ))}
            </tbody>
        </Table>

    </Wrapper>

    );
}