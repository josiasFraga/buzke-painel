import React from 'react';

export default function AddressReport(props) {
    return (
        <div className="row">
            <div className="col-xl-12">
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="4"><strong>LOCALIZAÇÃO - INFORMAÇÕES BÁSICAS</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="1">Documento:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].documento}</td>
                            <td colspan="1">Nome:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].nome}</td>
                        </tr>
                        <tr>
                            <td colspan="1">UF:</td>
                            <td colspan="3">{props.data.content.nome.conteudo[0].uf}</td>
                        </tr>
                        <tr>
                            <td colspan="1">Data de Nascimento:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].data_nascimento}</td>
                            <td colspan="1">Idade:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].idade}</td>
                        </tr>
                        <tr>
                            <td colspan="1">Sexo:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].sexo}</td>
                            <td colspan="1">Óbito:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].obito}</td>
                        </tr>
                        <tr>
                            <td colspan="1">Pessoa Exposta Publicamente:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].pessoa_exposta_publicamente.existe_informacao}</td>
                            <td colspan="1">Situação Receita:</td>
                            <td colspan="1">{props.data.content.nome.conteudo[0].situacao_receita}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="4"><strong>LOCALIZAÇÃO - TELEFONE(S)</strong></th>
                        </tr>
                        <tr>
                            <th><strong>DDD</strong></th>
                            <th><strong>Telefone</strong></th>
                            <th><strong>Operadora</strong></th>
                            <th><strong>Tipo</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.data.content.pesquisa_telefones.existe_informacao !== "SIM" &&
                            <tr>
                                <td colspan="4">Não há informações.</td>
                            </tr>                            
                        }
                { props.data.content.pesquisa_telefones.existe_informacao === "SIM" && props.data.content.pesquisa_telefones.conteudo.celular && props.data.content.pesquisa_telefones.conteudo.celular.map(telefone => 
                        <tr>
                            <td>{telefone.ddd}</td>
                            <td>{telefone.telefone}</td>
                            <td>{telefone.operadora}</td>
                            <td>Celular</td>
                        </tr>
                )}
                { props.data.content.pesquisa_telefones.existe_informacao === "SIM" && props.data.content.pesquisa_telefones.conteudo.outros && props.data.content.pesquisa_telefones.conteudo.outros.map(telefone => 
                        <tr>
                            <td>{telefone.ddd}</td>
                            <td>{telefone.telefone}</td>
                            <td>{telefone.operadora}</td>
                            <td>Outros</td>
                        </tr>
                )}
                { props.data.content.pesquisa_telefones.existe_informacao === "SIM" && props.data.content.pesquisa_telefones.conteudo.comercial && props.data.content.pesquisa_telefones.conteudo.comercial.map(telefone => 
                        <tr>
                            <td>{telefone.ddd}</td>
                            <td>{telefone.telefone}</td>
                            <td>{telefone.operadora}</td>
                            <td>Comercial</td>
                        </tr>
                )}
                    </tbody>
                </table>
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="1"><strong>LOCALIZAÇÃO - E-MAILS</strong></th>
                        </tr>
                        <tr>
                            <th><strong>E-mail</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                    { props.data.content.emails.existe_informacao !== "SIM" &&
                            <tr>
                                <td colspan="1">Não há informações.</td>
                            </tr>                            
                        }
                { props.data.content.emails.existe_informacao === "SIM" && props.data.content.emails.conteudo.map(email => 

                        <tr>
                            <td>{email.email}</td>
                        </tr>
                )}
                    </tbody>
                </table>
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="4"><strong>LOCALIZAÇÃO - ENDEREÇOS</strong></th>
                        </tr>
                        <tr>
                            <th><strong>Endereço</strong></th>
                            <th><strong>Bairro</strong></th>
                            <th><strong>Cidade / UF</strong></th>
                            <th><strong>CEP</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                    { props.data.content.pesquisa_enderecos.existe_informacao !== "SIM" &&
                            <tr>
                                <td colspan="4">Não há informações.</td>
                            </tr>                            
                        }
                { props.data.content.pesquisa_enderecos.existe_informacao === "SIM" && props.data.content.pesquisa_enderecos.conteudo.map(endereco => 

                        <tr>
                            <td>{endereco.logradouro} {endereco.endereco} - Nº {endereco.numero} {endereco.complemento}</td>
                            <td>{endereco.bairro}</td>
                            <td>{endereco.cidade} {endereco.uf == '' ? '' : '/ ' + endereco.uf}</td>
                            <td>{endereco.cep}</td>
                        </tr>
                )}
                    </tbody>
                </table>
                

                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="6"><strong>LOCALIZAÇÃO - CONTATOS</strong></th>
                        </tr>
                        <tr>
                            <th><strong>Documento</strong></th>
                            <th><strong>Nome</strong></th>
                            <th><strong>Endereço</strong></th>
                            <th><strong>Bairro</strong></th>
                            <th><strong>CEP</strong></th>
                            <th><strong>Cidade / UF</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.data.content.pessoas_contato.existe_informacao !== "SIM" &&
                            <tr>
                                <td colspan="6">Não há informações.</td>
                            </tr>                            
                        }
                { props.data.content.pessoas_contato.existe_informacao === "SIM" && props.data.content.pessoas_contato.conteudo.map(contato => 
                        <tr>
                            <td>{contato.documento}</td>
                            <td>{contato.nome}</td>
                            <td>{contato.endereco}</td>
                            <td>{contato.bairro}</td>
                            <td>{contato.cep}</td>
                            <td>{contato.cidade} {contato.uf == '' ? '' : '/ ' + contato.uf}</td>
                        </tr>
                )}
                    </tbody>
                </table>

                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="7"><strong>LOCALIZAÇÃO - PARENTES</strong></th>
                        </tr>
                        <tr>
                            <th><strong>Tipo</strong></th>
                            <th><strong>Documento</strong></th>
                            <th><strong>Nome</strong></th>
                            <th><strong>Óbito</strong></th>
                            <th><strong>Tipo Benefício</strong></th>
                            <th><strong>Aposentado</strong></th>
                            <th><strong>Idade</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                    { props.data.content.dados_parentes.existe_informacao !== "SIM" &&
                            <tr>
                                <td colspan="7">Não há informações.</td>
                            </tr>                            
                        }
                { props.data.content.dados_parentes.existe_informacao === "SIM" && props.data.content.dados_parentes.conteudo.map(contato => 
                        <tr>
                            <td>{contato.campo}</td>
                            <td>{contato.documento}</td>
                            <td>{contato.nome}</td>
                            <td>{contato.obito}</td>
                            <td>{contato.tipo_beneficio}</td>
                            <td>{contato.aposentado}</td>
                            <td>{contato.idade}</td>
                        </tr>
                )}
                    </tbody>
                </table>

                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th colspan="10"><strong>LOCALIZAÇÃO - TRABALHA/TRABALHOU</strong></th>
                        </tr>
                        <tr>
                            <th><strong>Documento</strong></th>
                            <th><strong>Nome</strong></th>
                            <th><strong>Admissão</strong></th>
                            <th><strong>Desligamento</strong></th>
                            <th><strong>Telefone(s)</strong></th>
                            <th><strong>CNAE(s)</strong></th>
                            <th><strong>Endereço</strong></th>
                            <th><strong>Bairro</strong></th>
                            <th><strong>CEP</strong></th>
                            <th><strong>Cidade / UF</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.data.content.trabalha_trabalhou.existe_informacao !== "SIM" &&
                            <tr>
                                <td colspan="10">Não há informações.</td>
                            </tr>                            
                        }
                { props.data.content.trabalha_trabalhou.existe_informacao === "SIM" && props.data.content.trabalha_trabalhou.conteudo.map(empresa => 
                        <tr>
                            <td>{empresa.documento}</td>
                            <td>{empresa.nome}</td>
                            <td>{empresa.admissao}</td>
                            <td>{empresa.desligamento}</td>
                            <td>{empresa.telefones.join(",")}</td>
                            <td>{empresa.cnae.join(",")}</td>
                            <td>{empresa.endereco} - Nº {empresa.numero} {empresa.complemento}</td>
                            <td>{empresa.bairro}</td>
                            <td>{empresa.cep}</td>
                            <td>{empresa.cidade} {empresa.uf == '' ? '' : '/ ' + empresa.uf}</td>

                        </tr>
                )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}