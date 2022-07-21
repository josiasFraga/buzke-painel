import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BootstrapTable from "react-bootstrap-table-next";
import { format, parseISO } from 'date-fns';
import FloatToCurrency from '../../../helpers/FloatToCurrency';
import { toast } from 'react-toastify';
import _ from 'lodash';
import FormContribuicao from './FormContribuicao';
import FormGerarContribuicoesAutomaticamente from './FormGerarContribuicoesAutomaticamente';

export default function Contribuicoes(props) {
    const [isFormContribuicaoOpen, setIsFormContribuicaoOpen] = useState(false);
    const [isFormGerarContribuicoesAutomaticamenteOpen, setIsFormGerarContribuicoesAutomaticamenteOpen] = useState(false);
    

    
    const [contribuicao, setContribuicao] = useState({});
    const salarios_minimos = useSelector(state => state.app.minimum_wages);
    const inss_tetos = useSelector(state => state.app.inss_tetos);

    const salvarContribuicao = (contribuicao) => {
        let tmpVinculos = _.cloneDeep(props.formik.values.vinculos);
        let tmpVinculoIndex = tmpVinculos.findIndex(vinculo => vinculo.id == props.contribuicoesVinculoId);

        let _contribuicao_salvar = {
            ...contribuicao,
            competencia: contribuicao.competencia.slice(0, 7) + '-01',
        }

        if (contribuicao.id) {
            let tmpContribuicaoIndex = tmpVinculos[tmpVinculoIndex].contribuicoes.findIndex(_contribuicao => _contribuicao.id == contribuicao.id);
            tmpVinculos[tmpVinculoIndex].contribuicoes[tmpContribuicaoIndex] = _contribuicao_salvar;
        } else {
            let _dados_salvar = {
                id: Math.random().toString(16).slice(-8),
                competencia: contribuicao.competencia.slice(0, 7) + '-01',
                contribuicao: contribuicao.contribuicao,
            };
            tmpVinculos[tmpVinculoIndex].contribuicoes.push(_dados_salvar);
        }
    
        props.formik.setFieldValue('vinculos', tmpVinculos);
        setIsFormContribuicaoOpen(false);
    }

    const usarTeto = (row, vinculo_id) => {
        let tmpVinculoIndex = props.formik.values.vinculos.findIndex(vinculo => vinculo.id == vinculo_id);
        let tmpContribuicaoIndex = props.formik.values.vinculos[tmpVinculoIndex].contribuicoes.findIndex(_contribuicao => _contribuicao.id == row.id);
        let inss_teto = inss_tetos.find(salario => salario.date == props.formik.values.vinculos[tmpVinculoIndex].contribuicoes[tmpContribuicaoIndex].competencia);
        if (inss_teto) {
            props.formik.setFieldValue(`vinculos[${tmpVinculoIndex}].contribuicoes[${tmpContribuicaoIndex}].contribuicao`, inss_teto.price);
        }
    }

    const usarMinimo = (row, vinculo_id) => {       
        let tmpVinculoIndex = props.formik.values.vinculos.findIndex(vinculo => vinculo.id == vinculo_id);
        let tmpContribuicaoIndex = props.formik.values.vinculos[tmpVinculoIndex].contribuicoes.findIndex(_contribuicao => _contribuicao.id == row.id);
        let salario_minimo = salarios_minimos.find(salario => salario.date == props.formik.values.vinculos[tmpVinculoIndex].contribuicoes[tmpContribuicaoIndex].competencia);
        if (salario_minimo) {
            props.formik.setFieldValue(`vinculos[${tmpVinculoIndex}].contribuicoes[${tmpContribuicaoIndex}].contribuicao`, salario_minimo.price);
        }
    }

    const openFormContribuicao = (contribuicao) => {
        setContribuicao(contribuicao);
        setIsFormContribuicaoOpen(true);
    }

    const preencher = (option, valorFixo) => {
        let vinculos = _.cloneDeep(props.formik.values.vinculos);
        let vinculoIndex = vinculos.findIndex(vinculo => vinculo.id == props.contribuicoesVinculoId);

        vinculos[vinculoIndex].contribuicoes = vinculos[vinculoIndex].contribuicoes.map(contribuicao => {
            let valor = 0;
            if (option == 'salario_minimo') {
                // devemos buscar o salario minimo da epoca
                let salario_minimo = salarios_minimos.find(salario => salario.date == contribuicao.competencia);
                if (salario_minimo) {
                    valor = salario_minimo.price;
                }
            } else if (option == 'teto_inss') {
                let inss_teto = inss_tetos.find(teto => teto.date == contribuicao.competencia);
                if (inss_teto) {
                    valor = inss_teto.price;
                }
            } else if (option == 'valor_fixo') {
                valor = valorFixo;
            }
            return {
                ...contribuicao,
                contribuicao: valor
            }
        });

        props.formik.setFieldValue('vinculos', vinculos);
    }

    const columns = [
        {
            dataField: "competencia",
            text: "COMPETÊNCIA",
            formatter: (value, row) => (
                
                <span style={{cursor: 'pointer'}} onClick={() => openFormContribuicao(row)}>
                <i className="flaticon2-edit icon-sm"></i>&nbsp;&nbsp;{format(parseISO(value), 'MM/yyyy')}
            </span>

            )
        },
        {
            dataField: "contribuicao",
            text: "SALÁRIO DE CONTRIBUIÇÃO",
            formatter: (value, row) => (
                <span style={{cursor: 'pointer'}} onClick={() => openFormContribuicao(row)}>
                <i className="flaticon2-edit icon-sm"></i>&nbsp;&nbsp;{FloatToCurrency(value)}
            </span>

            )
        
        },
        {
            dataField: "actions",
            text: "AÇÕES",
            formatter: (value, row) => (
            <>
                <button type="button" onClick={() => usarMinimo(row, props.contribuicoesVinculoId)} className="btn btn-success btn-sm mr-5">
                    <i className="flaticon2-arrow-down"></i> Usar Mínimo
                </button>

                <button type="button" onClick={() => usarTeto(row, props.contribuicoesVinculoId)} className="btn btn-success btn-sm">
                    <i className="flaticon2-arrow-up"></i> Usar Teto
                </button>
            </>
            ),
            headerStyle: () => {
                return { width: "300px" };
            }
        },

    ];


    return (
        <>
        <div className="row mb-5">
            <div className="col">
                <a href="#" className="btn btn-secondary" onClick={props.back}><i className="flaticon2-left-arrow-1 icon-sm"></i> VOLTAR</a>
            </div>
        </div>
        <div className="row mb-5">
            <div className="col">
                <a href="#" className="btn btn-secondary" onClick={() => setIsFormGerarContribuicoesAutomaticamenteOpen(true)}><i className=""></i> GERAR CONTRIBUIÇÕES AUTOMATICAMENTE</a>
            </div>
        </div>
        <FormContribuicao
            show={isFormContribuicaoOpen}
            hide={() => setIsFormContribuicaoOpen(false)}
            contribuicao={contribuicao}
            salvarContribuicao={salvarContribuicao}
        />


        <FormGerarContribuicoesAutomaticamente
            show={isFormGerarContribuicoesAutomaticamenteOpen}
            hide={() => setIsFormGerarContribuicoesAutomaticamenteOpen(false)}
            preencher={preencher}
        />
    

        <div className="row mb-5">
            <div className="col" key={props.formik.values}>
                <BootstrapTable
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    keyField="id"
                    key={props.formik.values}
                    data={props.formik.values.vinculos.find(vinculo => vinculo.id == props.contribuicoesVinculoId).contribuicoes}
                    columns={columns}
                >
                </BootstrapTable>
            </div>
        </div>

</>
    )
}