import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import BlockUi from 'react-block-ui';
import { format, parseISO } from 'date-fns';
import  styled from 'styled-components';
import AdicionarCartao from './AdicionarCartao';

function SvgCreditCard(props) {
    const payment_method = useSelector(state => state.app.payment_methods_relation).find(relation => relation.id == props.brand);
    return (
        <>
        { payment_method &&
            <img src={payment_method.svg} style={{height: '23px'}} />
        }
        </>
    );
}

export default function CartoesCredito(props) {
    const credit_cards = useSelector(state => state.app.cards);
    const is_loading_cards = useSelector(state => state.app.is_loading_cards);
    const [modalAddCardOpen, setModalAddCardOpen] = useState(false);
    
    return (
        <BlockUi tag="div" blocking={is_loading_cards}>
            <p className="value">Clique no botão abaixo para adicionar um cartão de crédito vinculado a sua conta</p>
            { credit_cards.map(credit_card => (
                <div className="mb-5">
                    <SvgCreditCard brand={credit_card.brand} className="mb-5" />
                    <span style={{paddingLeft: '5px', fontSize: '12px'}}>final <strong>{credit_card.last_digits}</strong> | validade: <strong>{credit_card.expiration_date}</strong></span>
                </div>
            ))}
            <button type="button" className="btn btn-primary btnDefault" onClick={() => setModalAddCardOpen(true)} style={{width: '230px'}}>ADICIONAR CARTÃO</button>

            <AdicionarCartao isOpen={modalAddCardOpen} close={() => setModalAddCardOpen(false)} />
        </BlockUi>
    );
}