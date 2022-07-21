import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import CurrencyInput from 'react-currency-input';

export default function FormGerarContribuicoesAutomaticamente(props) {
   const [option, setOption] = useState('');
   const [valorFixo, setValorFixo] = useState(0);
    const preencher = () => {
        if (option == '') {
            alert('Escolha uma opção!');
            return;
        }
        props.hide();
        props.preencher(option, valorFixo);
    }

    return (
        <Modal
            show={props.show}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title key={props.contribuicao}>
                    Gerar contribuições automaticamente
                </Modal.Title>
 
                <button type="button" className="close" onClick={props.hide}>
                    <i aria-hidden="true" className="ki ki-close"></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="row mb-5">
                    <div className="col-xl-12">
                        <label className="form-label">Escolha a forma que as contribuições serão preenchidas</label>
                        <div className="input-group">
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className={"btn btn-outline-secondary input-group-button " + (option == 'salario_minimo' ? 'active' : '')}
                                    onClick={() => setOption('salario_minimo')}

                                >Utilizando Salário Mínimo</button>
                                <button
                                    type="button"
                                    className={"btn btn-outline-secondary input-group-button " + (option == 'teto_inss' ? 'active' : '')}
                                    onClick={() => setOption('teto_inss')}
                                    >Utilizando Teto do INSS</button>
                                    <button
                                    type="button"
                                    className={"btn btn-outline-secondary input-group-button " + (option == 'valor_fixo' ? 'active' : '')}
                                    onClick={() => setOption('valor_fixo')}
                                    >Utilizando valor fixo</button>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            { option == 'valor_fixo' &&
                <div className="row mb-5">
                    <div className="col-xl-12">
                        <label className="form-label">Digite o valor</label>
                        <CurrencyInput
                            className={"form-control"}
                            value={valorFixo}
                            prefix=""
                            decimalSeparator=","
                            thousandSeparator="."
                            selectAllOnFocus={true}
                            onChangeEvent={(ev, maskedvalue, floatvalue) => {
                                setValorFixo(floatvalue);
                            }}
                        />
                    </div>
                </div>
            }
                <div className="row mb-5">
                    <button type="button" className="btn btn-primary ml-4" onClick={preencher}>Preencher contribuições</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}