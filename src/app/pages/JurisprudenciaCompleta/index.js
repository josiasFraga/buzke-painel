import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import BlockUi from 'react-block-ui';
import _ from 'lodash';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
  
export function JurisprudenciaCompleta(props) {
    const dispatch = useDispatch();
    const jurisprudence = useSelector(state => state.app.jurisprudence);
    const jurisprudence_fulltext = useSelector(state => state.app.jurisprudence_fulltext);
    const is_jurisprudence_loading = useSelector(state => state.app.is_jurisprudence_loading);
    const is_jurisprudence_fulltext_loading = useSelector(state => state.app.is_jurisprudence_fulltext_loading);

    useEffect(() => {
        dispatch({type: 'LOAD_JURISPRUDENCE', payload: {url: props.match.params.id}});
    }, []);
    const subheader = useSubheader();

    
    const removeTags = str => {
        const regex = /(<([^>]+)>)/ig;
        return str.replace(regex, '');
      };
      useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Busca de Jurisprudência',
                title: 'Busca de Jurisprudência',
                href: '',
                pathname: '/jurisprudencia'
            },
            {
                text: 'Visualizar',
                title: 'Visualizar',
                href: ''
            }
        ])
    }, []);

      const fullText = () => {
        dispatch({type: 'LOAD_JURISPRUDENCE_FULLTEXT', payload: {url: jurisprudence.fullTextUrl, type: 'fullText'}});

      }
      const createMarkup = encodedHtml => ({
        __html: _.unescape(encodedHtml),
      });

      const removeHref = (text) => {
          const regex = /<a[^>]*>(.*?)<\/a>/ig;

          return text.replace(regex, '$1');
      }

    return (
    <>
        
        <h1 className="azul-cabecalho">JURISPRUDÊNCIA</h1>
        <p className="subheader-text mb-10">{is_jurisprudence_loading ? 'Carregando..' : jurisprudence.title}</p>
        <BlockUi blocking={is_jurisprudence_loading || is_jurisprudence_fulltext_loading} tag="div">
            <div className="row mb-10">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        {is_jurisprudence_loading ? 'Carregando..' : ''}
                        <h3>EMENTA:</h3>
                        {Object.keys(jurisprudence).length > 0 && jurisprudence.summary.map(item => 
                            <p>{removeTags(item)}</p>
                        )}

                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary mb-10" onClick={fullText} disabled={(jurisprudence_fulltext != '')}>VER INTEIRO TEOR</button>

        { jurisprudence_fulltext != '' &&
            <div className="row mb-10">
                <div className="col-xl-12">
                    <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                        <div dangerouslySetInnerHTML={createMarkup(removeHref(jurisprudence_fulltext))} />
                    </div>
                </div>
            </div>
        }


            </BlockUi>

    </>
    );
}