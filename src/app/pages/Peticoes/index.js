import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { cpfMask, cnpjMask, phoneMask, cepMask } from '../../../_metronic/_helpers/MasksHelper';
import { Link, useHistory } from 'react-router-dom';
import {Pagination} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';
import BlockUi from 'react-block-ui';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import styled from 'styled-components';

const InnerCard = styled.div`
    padding: 0 15px;
`;

const Card = styled.div`
    cursor: pointer;
    color: #091D5C;
    font-size: 15px;
    border-radius: 8px;
    padding: 20px 0px 20px 0px;
    text-align: center;
    background-color: #fff;
    filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.15));

    @media (max-width: 1199.98px) {
        width: 32%;
    }

    @media (max-width: 767.98px) {
        width: 48%;
    }

    @media (max-width: 575.98px) {
        width: 98%;
    }


`;

export function Peticoes() {
    const dispatch = useDispatch();
    const history = useHistory();
    const subheader = useSubheader();
    const petitions_categories = useSelector(state => state.app.petitions_categories);
    const is_petitions_categories_loading = useSelector(state => state.app.is_petitions_categories_loading);
    useEffect(() => {
        dispatch({type: 'LOAD_PETITIONS_CATEGORIES'});
    }, []);

    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Jusfile',
                title: 'Jusfile',
                href: '#'
            }
        ])
    }, []);
    
    
   
    return (
    <>
        <h1 className="azul-cabecalho">JusFile</h1>
        <p className="subheader-text mb-10">Aqui está o melhor acervo de petições do Brasil.</p>
        <BlockUi tag="div" blocking={is_petitions_categories_loading}>
            <div className="row mb-10">
            {petitions_categories && petitions_categories.map(category => 
                <InnerCard className="col-xl-3">
                    <Card
                        className="mb-5"
                        onClick={() => history.push(`/peticoes/listagem/${category.id}`)}
                    >
                        <span className="font-weight-bolder">{category.name}</span>
                    </Card>
                </InnerCard>
            )}
            </div>
        </BlockUi>

    </>
    );
}