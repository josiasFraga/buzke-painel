import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Pagination} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {useFormik} from 'formik';
import BlockUi from 'react-block-ui';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customSelectStyle } from '../../../_metronic/_partials/dropdowns/ReactSelectCustomStyle';
import {useSubheader} from "../../../_metronic/layout/_core/MetronicSubheader";
import ReactPaginate from 'react-paginate';

export function PeticoesListagem(props) {
    const dispatch = useDispatch();
    const subheader = useSubheader();

    const history = useHistory();
    const petitions_category_types = useSelector(state => state.app.petitions_category_types);
    const is_petitions_category_types_loading = useSelector(state => state.app.is_petitions_category_types_loading);
    const category_name = useSelector(state => state.app.petitions_category_name);
    const [page, setPage] = useState(0);
    const [type, setType] = useState(null);
    const petitions = useSelector(state => state.app.petitions);
    const is_petitions_loading = useSelector(state => state.app.is_petitions_loading);
    const [search, setSearch] = useState(props.match.params.filter || '');

    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Petições',
                title: 'Petições',
                pathname: '/peticoes',
                href: ''
            },
            {
                text: 'Listagem',
                title: 'Listagem',
                href: ''
            }
        ])
    }, []);

    const loadPetitions = () => {
        dispatch({type: 'LOAD_PETITIONS', payload:{
            page: page,
            search: search,
            type_id: type ? type.id : null,
            category_id: props.match.params.category_id
        }});
    }
    
    useEffect(() => {
        dispatch({type: 'LOAD_PETITIONS_CATEGORY_TYPES', payload:{category_id: props.match.params.category_id}});
        loadPetitions();
    }, []);

    useEffect(() => {
        loadPetitions();
    }, [page]);

    useEffect(() => {
        if (page == 0) {
            loadPetitions();
        } else {
            setPage(0);
        }
    }, [type, search]);

    return (
    <>
        <BlockUi tag="div" blocking={is_petitions_loading}>
            <h1 className="azul-cabecalho">{category_name}</h1>
            <p className="subheader-text mb-10">Veja as nossas petições.</p>
                <div className="row mb-10">
                    <div className="col-xl-3">
                        <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}}>
                            <h4 className="azul-cabecalho font-weight-bolder">Filtro</h4>
                            <div className="form-group">
                                <Select 
                                    theme={customSelectStyle}
                                    options={petitions_category_types}
                                    onChange={(value) => setType(value)}
                                    value={type}
                                    placeholder="Tipo de petição"
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-9">
                        
                        <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}} className="mb-10">
                            <div className="form-group">
                                <label className="form-label">Faça uma pesquisa</label>
                                <div className="input-icon input-icon-right">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onKeyPress={(evt) => evt.key === 'Enter' ? setSearch(evt.target.value) : undefined}
                                        placeholder="Digite aqui.."
                                        defaultValue={search}
                                    />
                                    <span><i className="flaticon2-search-1 icon-md"></i></span>
                                </div>
                            </div>
                        </div>
                        
                    { petitions.data && petitions.data.map(petition => (
                        <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px'}} className="mb-10">
                            <Link to={`/peticoes/visualizar/${petition.id}/${props.match.params.category_id}`}><p className="primary font-weight-boldest font-size-h6" style={{marginBottom: '1px'}}>{petition.name}</p></Link>
                            <p style={{color: '#091740', opacity: 0.35}} className="font-weight-bold">Petição elaborada...</p>
                            <p style={{color: '#091740', opacity: 0.73}} className="font-weight-bold">
                            <p className="flex-grow-1">Tipo de petição:
                                    <span class="label label-inline label-dark-primary font-weight-bold">{petition['petitions_category_type.name']}</span>
                                </p>
                                <p>Área do Direito: <strong>{category_name}</strong></p>
                                <div className="d-flex">
                                    <p style={{textAlign: 'right'}}>Atualizado em: <strong>02/04/2021</strong></p>
                                </div>
                            </p>
                        </div>
                    ))}
                        
                    { !is_petitions_loading && 
                        <div className="row justify-content-center">
                            <ReactPaginate
                                nextLabel="próximo >"
                                onPageChange={(evt) => setPage(evt.selected)}
                                pageRangeDisplayed={5}
                                pageCount={petitions.pages}
                                forcePage={page}
                                marginPagesDisplayed={1}
                                previousLabel="< anterior"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    }
                    </div>
            </div>
        </BlockUi>
    </>
    );
}
