import React, { useState, useEffect } from "react";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import BlockUi from 'react-block-ui';
import DropdownTribunais from './components/DropdownTribunais';
import { ListTribunais } from './mock/ListTribunais';
import Select from 'react-select';
import { useSubheader } from "../../../_metronic/layout/_core/MetronicSubheader";



export function Jurisprudencia() {
    const initialListTribunais = [...ListTribunais];
    const [tribunais, setTribunais] = useState(ListTribunais);
    const subheader = useSubheader();

    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const removeTags = str => {
        const regex = /(<([^>]+)>)/ig;
        return str.replace(regex, '');
    };
    const createMarkup = encodedHtml => ({
        __html: _.unescape(encodedHtml),
    });
    useEffect(() => {
        subheader.setBreadcrumbs([
            {
                text: 'Busca de Jurisprudência',
                title: 'Busca de Jurisprudência',
                href: ''
            }
        ])
    }, []);

    const changeTribunaisValue = (value) => {
        let _tribunais = [...ListTribunais];
        _tribunais = _tribunais.map(tribunal => ({
            ...tribunal,
            checked: value,
            children: tribunal.children.map(child => ({
                ...child,
                checked: value
            }))
        }));
        setTribunais(_tribunais);
        submit();
    }

    const submit = () => {
        formik.handleSubmit();
    }

    const jurisprudences = useSelector(state => state.app.jurisprudences);
    const is_jurisprudences_loading = useSelector(state => state.app.is_jurisprudences_loading);

    const formik = useFormik({
        initialValues: {
            'search': '',
            'date': null,
            'degree': null,
        },
        onSubmit: async (values) => {
            if (values.search == '') {
                return;
            }
            dispatch({
                type: 'LOAD_JURISPRUDENCES', payload: {
                    values: {
                        ...values,
                        courts: tribunais,
                        page: page
                    }
                }
            });
        },
    });

    useEffect(() => {
        submit();
    }, [page, formik.values.date, formik.values.degree]);


    return (
        <>
            <h1 className="azul-cabecalho">Busca de Jurisprudência</h1>
            <p className="subheader-text mb-10">Realize buscas em todos tribunais.</p>
            <BlockUi blocking={is_jurisprudences_loading} tag="div">
                <div className="row mb-10">
                    <div className="col-xl-3">
                        <div style={{ backgroundColor: '#fff', border: '2px solid #EBEDF3', borderRadius: '5px', padding: '20px' }}>
                            <h4 className="azul-cabecalho font-weight-bolder mb-5">Filtro</h4>
                            <div className="form-group">
                                <Select
                                    name="date"
                                    options={[
                                        { name: 'Últimas 24 horas', id: '1dia' },
                                        { name: 'Última semana', id: '7dias' },
                                        { name: 'Último mês', id: '30dias' },
                                        { name: 'Último ano', id: '365dias' },
                                    ]}
                                    onChange={(value) => formik.setFieldValue('date', value)}
                                    value={formik.values.date}
                                    placeholder="Por data.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                            </div>
                            <div className="form-group">
                                <Select
                                    name="degree"
                                    options={[{ name: '1º grau', id: 'PRIMEIRO' }, { name: '2º grau', id: 'SEGUNDO' }]}
                                    onChange={(value) => formik.setFieldValue('degree', value)}
                                    value={formik.values.degree}
                                    placeholder="Por grau.."
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isClearable={true}
                                    noOptionsMessage={() => <span>Sem resultados.</span>}
                                />
                            </div>

                            <div className="form-group">
                                <small className="azul-cabecalho form-text">
                                    <span style={{ cursor: 'pointer' }} onClick={() => changeTribunaisValue(true)}>Marcar todos</span> - <span style={{ cursor: 'pointer' }} onClick={() => changeTribunaisValue(false)}>Desmarcar Todos</span>
                                </small>
                            </div>
                            <div className="hr"></div>
                            <div className="d-flex flex-column">
                                <DropdownTribunais tribunais={tribunais} setTribunais={setTribunais} />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-9">

                        <div style={{ backgroundColor: '#fff', border: '2px solid #EBEDF3', borderRadius: '5px', padding: '20px' }} className="mb-10">
                            <div className="form-group">
                                <label className="form-label">Faça uma pesquisa</label>
                                <div className="input-icon input-icon-right">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onKeyPress={(evt) => evt.key === 'Enter' ? formik.handleSubmit() : undefined}
                                        name="search"
                                        onChange={formik.handleChange}
                                        value={formik.values.search}
                                    />
                                    <span onClick={formik.handleSubmit} style={{ cursor: 'pointer' }}><i className="flaticon2-search-1 icon-md"></i></span>
                                </div>
                            </div>
                        </div>

                        {jurisprudences.docs &&
                            <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '20px' }} className="mb-10">
                                {jurisprudences.docs.length == 0 &&
                                    <span>Não foram encontrados resultados.</span>
                                }
                                {jurisprudences.docs.map(juris =>
                                    <>
                                        <Link to={"/jurisprudencia/" + juris.link}><p className="primary font-weight-boldest" style={{ marginBottom: '1px', fontSize: '16px' }}>{removeTags(juris.title)}</p></Link>
                                        <p style={{ color: '#091740', opacity: 0.35 }} className="font-weight-bold">{juris.published_at}</p>
                                        <p style={{ color: '#091740', opacity: 0.73, fontSize: '14px' }} className="font-weight-bold">
                                            <div dangerouslySetInnerHTML={createMarkup(juris.text)} />
                                        </p>
                                        <div className="hr mb-5"></div>
                                    </>
                                )}
                            </div>
                        }
                        {jurisprudences.docs && <>
                            <div className="row justify-content-center">
                                <Pagination>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    {jurisprudences.pages.map(_page =>
                                        <Pagination.Item active={page == _page} onClick={() => setPage(_page)}>{_page}</Pagination.Item>
                                    )}
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                            </div>
                        </>}
                    </div>
                </div>
            </BlockUi>
        </>
    );
}
