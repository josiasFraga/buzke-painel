import React, { useState, useEffect, useRef } from "react";
import _ from 'lodash';

export function Jusfinder(props) {
    return (
        <>
            {/* JUSFINDER */}
            < h1 className="azul-cabecalho" > Jusfinder</h1 >
            <p className="mb-10" style={{ fontSize: '15px', opacity: '0.6' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

            <div className="defaultContent">
                <div className="container p-10 pl-15">
                    <div className="row">
                        <div className="col-12">
                            <h2>Selecione o tipo de consulta</h2>

                            <div className="row">
                                <div className="col-3 boxConsulta p-8 mr-5 ml-4 active">
                                    <span className="badge badge-warning">Você possui 2 créditos</span>
                                    <i class="flaticon2-pin"></i>
                                    <span className="mt-3">Localização</span>
                                    <p>Consulta que retorna dados, como: Nome, endereço(s), telefone(s) e e-mail(s) do CPF/CNPJ indicado.</p>
                                    <hr />
                                    <button className="btn btn-primary btnDefault mt-0">Comprar créditos</button>
                                    <small><a href=""><b>Clique aqui</b></a> para comprar apenas 1 consulta</small>
                                </div>

                                <div className="col-3 boxConsulta p-8 mr-5 notActive">
                                    <span className="badge badge-warning">Você possui 2 créditos</span>
                                    <i class="flaticon2-lorry"></i>
                                    <span className="mt-3">Placa de Veiculo</span>
                                    <p>Consulta em toda base nacional do DETRAN que verifica a existência de veículos no CPF/CNPJ indicado.</p>
                                    <hr />
                                    <button className="btn btn-primary btnDefault mt-0">Comprar créditos</button>
                                    <small><a href=""><b>Clique aqui</b></a> para comprar apenas 1 consulta</small>
                                </div>

                                <div className="col-3 boxConsulta p-8 mr-0 notActive">
                                    <span className="badge badge-warning">Você possui 2 créditos</span>
                                    <i class="flaticon2-document"></i>
                                    <span className="mt-3"> Endereço</span>
                                    <p>Consulta que retorna dados, como: Nome, endereço(s), telefone(s) e e-mail(s) do CPF/CNPJ indicado.</p>
                                    <hr />
                                    <button className="btn btn-primary btnDefault mt-0">Comprar créditos</button>
                                    <small><a href=""><b>Clique aqui</b></a> para comprar apenas 1 consulta</small>
                                </div>
                            </div>

                            <h2 className="mt-10">Digite o CPF ou CNPJ</h2>

                            <div className="search">
                                <input type="text" className="form-control mt-5 consultInput" placeholder="000.000.000-00" />
                                <button className="btn btn-primary btnDefault mt-10">Buscar</button>
                            </div>
                            <div className="attention">
                                <small>Informações adicionais</small>
                                <p>Aceito e me declaro responsável legal, nos termos da Lei Geral de Proteção de Dados, Lei 13.709/2018, por toda a busca e tratamento realizados no presente banco de dados através do meu login e senha, declarando que os referidos dados serão usados exclusivamente ao exercício regular de direitos em possíveis processos judiciais, administrativos ou arbitrais, não realizando qualquer uso indevido e tampouco vazamento dos mesmos, sob pena de arcar com as possíveis consequências legais nos âmbitos cível e criminal. Ao entrar nesse ambiente, o usuário, desde que devidamente habilitado com login e senha, terá acesso a um banco de dados pessoais específicos que se destinam, com a finalidade exclusiva, ao exercício regular de direitos em possíveis processos judiciais, administrativos ou arbitrais, nos termos do artigo 7°, VI, da Lei Geral de Proteção de Dados (Lei 13.709/2018). Toda e qualquer utilização das referidas informações, que constam no respectivo banco de dados, é regida pela Lei Geral de Proteção de Dados (Lei 13.709/2018), que prevê sanções rigorosas em caso de tratamento indevido de dados pessoais, destinação de dados pessoais a fins não autorizados ou ainda em caso de vazamento de informações. Nesse sentido, ao entrar no próximo ambiente, o usuário se declara ciente das informações prestadas acima, além de prestar compromisso de que todo e qualquer dado pessoal acessado por ele terá como único fim o exercício regular de direitos em possíveis processos judiciais, administrativos ou arbitrais, responsabilizando-se legalmente, nos âmbitos civil e criminal, por qualquer tratamento indevido de tais dados ou ainda vazamento ilegal de quaisquer informações</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* COMPRAR CREDITOS*/}
            <div className="defaultContent ">
                <div className="container p-10 pl-15">
                    <div className="row">
                        <div className="col-12">
                            <h2><i class="flaticon2-left-arrow-1"></i> Comprar créditos</h2>

                            <div className="row">
                                <div className="col-3 boxConsulta p-8 pt-4 mr-10 ml-4 text-center">
                                    <i class="flaticon2-pin"></i>
                                    <span>5 créditos</span>
                                    <small>Para consultas de Localização</small>
                                    <p>Consulta que retorna dados, como: Nome, endereço(s), telefone(s) e e-mail(s) do CPF/CNPJ indicado.</p>
                                    <hr />
                                    <h5 className="price">R$ 22,99</h5>
                                    <button className="btn btn-primary btnDefault mt-5">Comprar</button>
                                    <small>Cada consulta no plano de 5 créditos irá custar apenas R$ 2,33</small>
                                </div>

                                <div className="col-3 boxConsulta p-8 mr-10 text-center active">
                                    <div className="recommend">
                                        <p>Recomendado</p>
                                    </div>
                                    <i class="flaticon2-lorry"></i>
                                    <span>20 créditos</span>
                                    <small>Para consultas de d Veiculos</small>
                                    <p>Consulta em toda base nacional do DETRAN que verifica a existência de veículos no CPF/CNPJ indicado.</p>
                                    <hr />
                                    <h5 className="price">R$ 122,99</h5>
                                    <button className="btn btn-primary btnDefault mt-5">Comprar</button>
                                    <small>Cada consulta no plano de 5 créditos irá custar apenas R$ 2,33</small>
                                </div>

                                <div className="col-3 boxConsulta p-8 mr-0 text-center">
                                    <i class="flaticon2-document"></i>
                                    <span>20 créditos</span>
                                    <small>Para consultas de localização</small>
                                    <p>Consulta que retorna dados, como: Nome, endereço(s), telefone(s) e e-mail(s) do CPF/CNPJ indicado.</p>
                                    <hr />
                                    <h5 className="price">R$ 34,99</h5>
                                    <button className="btn btn-primary btnDefault mt-5">Comprar</button>
                                    <small>Cada consulta no plano de 5 créditos irá custar apenas R$ 2,33</small>
                                </div>
                            </div>

                            <div className="attention mt-10">
                                <small>Informações adicionais</small>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MINHAS CONSULTAS */}
            <div className="defaultContent">
                <div className="container p-10 pl-15">
                    <div className="row">
                        <div className="col-12">
                            <h2><i class="flaticon2-left-arrow-1"></i> Minhas consultas</h2>

                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th className="title">Transação</th>
                                            <th className="title"><i class="flaticon2-document"></i> Tipo de compra</th>
                                            <th className="title"><i class="flaticon2-calendar"></i> Data da compra</th>
                                            <th className="title"><i class="flaticon2-refresh-arrow"></i> Status</th>
                                            <th className="title"><i class="flaticon-eye"></i> Visualizar</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td><b>#9831893</b></td>
                                            <td>Consulta de Localização</td>
                                            <td>23/04/2022</td>
                                            <td><span className="badge badge-success">Aprovada</span></td>
                                            <td><a href=""><i class="flaticon2-printer"></i> Clique aqui</a></td>
                                        </tr>
                                        <tr>
                                            <td><b>#9831893</b></td>
                                            <td>Consulta de Localização</td>
                                            <td>23/04/2022</td>
                                            <td><span className="badge badge-success">Aprovada</span></td>
                                            <td><a href=""><i class="flaticon2-printer"></i> Clique aqui</a></td>
                                        </tr>
                                        <tr>
                                            <td><b>#9831893</b></td>
                                            <td>Consulta de Localização</td>
                                            <td>23/04/2022</td>
                                            <td><span className="badge badge-success">Aprovada</span></td>
                                            <td><a href=""><i class="flaticon2-printer"></i> Clique aqui</a></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
