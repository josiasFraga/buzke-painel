import React, { useState } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector} from 'react-redux';

export function LiquidacaoSentenca() {
    const [calculos, setCalculos] = useState(1);
    const [activeCalculo, setActiveCalculo] = useState(0);
    const [itens, setItens] = useState(1);
    return (
    <>
    
        <h1 className="azul-cabecalho">Atualização de valores</h1>
        <p className="subheader-text mb-10">Juscalc - atualização monetária</p>

        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                    <div className="row">
                        <div className="col-xl-4 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Escolha uma das opções</label>
                                <select className="form-control">
                                    <option value="">selecione..</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Escolha o índice a ser aplicado</label>
                                <select className="form-control">
                                    <option value="">selecione..</option>
                                    <option value="">IGP-M</option>
                                    <option value="">IPCA</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Taxa de juros (%)</label>
                                <input className="form-control" type="text" placeholder="0,00%"/>
                                
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-12">
                            <div className="form-group">
                                <label className="form-label">&nbsp;</label>
                                <select className="form-control">
                                    <option value="">Mensal</option>
                                    <option value="">Anual</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Multa (%)</label>
                                <input className="form-control" type="text" placeholder="0,00%"/>
                                
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-md-12">
                            <div className="form-group">
                                <label className="form-label">Valor dos honorários</label>
                                <input className="form-control" type="text" placeholder="R$ 0,00"/>
                                
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-12">
                            <div className="form-group">
                                <label className="form-label">&nbsp;</label>
                                <select className="form-control">
                                    <option value="">Percentual (%)</option>
                                    <option value="">Fixo (R$)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                    <div className="d-flex">
                        <div style={{flex: 1}}>
                        {[...Array(calculos)].map((calculo,key) => 
                            <button type="button" className={"btn mb-10 mr-5 " + (activeCalculo == key ? 'btn-primary' : 'btn-cinza')} onClick={() => setActiveCalculo(key)} style={{width: '115px', position: 'relative', float: 'left'}}>CÁLCULO {(key+1)}</button>
                        )}
                        
                            <div style={{position: 'relative', float: 'left', marginTop: '12px'}} onClick={() => setCalculos(calculos+1)}>
                                <label className="form-label"><i class="icon-md fas fa-plus"></i> <span style={{marginLeft: '5px'}}>Novo Cálculo</span></label>
                            </div>

                        
                        </div>
                        <div className="d-flex">
                            <label className="form-label" style={{lineHeight: 1, marginTop: '12px', marginRight: '10px'}}>Digite a quantidade de itens</label>
                            <input type="number" className="form-control" defaultValue="1" onChange={(evt) => setItens(parseInt(evt.target.value != '' ? evt.target.value : 0))} style={{width: '110px'}} />
                        </div>
                    </div>

                    <div className="hr mb-5"></div>
                {[...new Array(itens)].map((item,key) => 
                    <div className="row mb-5">
                        <div className="col-xl-3">
                            <div className="form-group">
                                <label className="form-label">Item nº</label>
                                <input type="text" className="form-control" value={(key+1)} disabled="disabled" />
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="form-group">
                                <label className="form-label">Escolha a data</label>
                                <input type="date" max="2999-12-31" className="form-control" />
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="form-group">
                                <label className="form-label">Digite o valor</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="form-group">
                                <label className="form-label">Parcela de débito</label>
                                <select className="form-control">
                                    <option value="">selecione..</option>
                                    <option value="">Sim</option>
                                    <option value="">Não</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>

        <button type="button" className="btn btn-primary mb-10" style={{width: '230px'}}>CALCULAR</button>



    </>
    );
}