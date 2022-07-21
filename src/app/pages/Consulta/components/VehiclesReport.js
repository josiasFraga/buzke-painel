import React from 'react';

export default function VehiclesReport(props) {
    return (
        props.vehicles.map((vehicle, key) => 
            <div className="row">
                <div className="col-xl-12">
                    <table className="table table-bordered">
                        <thead>
                            <th colspan="4">Veículo {(key+1)}</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="1">Placa:</td>
                                <td colspan="1"><strong>{vehicle.placa[0]}</strong></td>
                                <td colspan="1">Renavam:</td>
                                <td colspan="1"><strong>{vehicle.renavam[0]}</strong></td>
                            </tr>
                            <tr>
                                <td colspan="1">Situação:</td>
                                <td colspan="3">{vehicle.situacao[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Ocorrência:</td>
                                <td colspan="3">{vehicle.ocorrencia[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Marca:</td>
                                <td colspan="3">{vehicle.marca[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Tipo de veiculo:</td>
                                <td colspan="3">{vehicle.tipo_veiculo[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Ano de Fabricação.:</td>
                                <td colspan="1">{vehicle.ano_fabricacao[0]}</td>
                                <td colspan="1">Ano Modelo.:</td>
                                <td colspan="1">{vehicle.ano_modelo[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Combustível:</td>
                                <td colspan="3">{vehicle.combustivel[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Cor:</td>
                                <td colspan="3">{vehicle.cor[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Potência:</td>
                                <td colspan="3">{vehicle.potencia[0]}</td>
                            </tr>

                            <tr>
                                <td colspan="1">Documento:</td>
                                <td colspan="3">{vehicle.documento[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Última Atualização:</td>
                                <td colspan="3">{vehicle.ultima_atualizacao[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Chassi:</td>
                                <td colspan="1">{vehicle.chassi[0]}</td>
                                <td colspan="1">Remarcação do Chassi:</td>
                                <td colspan="1">{vehicle.remarcacao_do_chassi[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Montagem:</td>
                                <td colspan="3">{vehicle.montagem[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Motor:</td>
                                <td colspan="3">{vehicle.motor[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Caixa de Câmbio:</td>
                                <td colspan="3">{vehicle.caixa_cambio[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Nº de Carroceria:</td>
                                <td colspan="3">{vehicle.num_carroceria[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Nº de eixos:</td>
                                <td colspan="1">{vehicle.num_eixo[0]}</td>
                                <td colspan="1">Nº de eixos aux.:</td>
                                <td colspan="1">{vehicle.num_eixo_aux[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Aux.:</td>
                                <td colspan="3">{vehicle.aux[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Procedência:</td>
                                <td colspan="3">{vehicle.procedencia[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Espécie:</td>
                                <td colspan="3">{vehicle.especie[0]}</td>
                            </tr>
                            
                            <tr>
                                <td colspan="1">Cilindrada:</td>
                                <td colspan="3">{vehicle.cilindrada[0]}</td>
                            </tr>
                            
                            <tr>
                                <td colspan="1">Capacidade de Passageiros:</td>
                                <td colspan="3">{vehicle.capacidade_passageiros[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Capacidade de Carga:</td>
                                <td colspan="3">{vehicle.capacidade_carga[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">CMT:</td>
                                <td colspan="3">{vehicle.CMT[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">PTB:</td>
                                <td colspan="3">{vehicle.PTB[0]}</td>
                            </tr>
                            <tr>
                                <td colspan="1">Restrição:</td>
                                <td colspan="3">{vehicle.restricao[0]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );
}