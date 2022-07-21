import React, { useEffect, useState } from "react";

import Graph from './components/Graph';
import { toAbsoluteUrl } from "../../_helpers";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../layout";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import BlockUi from 'react-block-ui';
import { useSubheader } from "../../layout/_core/MetronicSubheader";
import ModalViewOpportunity from '../../../app/components/ModalViewOpportunity';
import ModalCalculo from '../../layout/components/aside/aside-menu/ModalCalculo';
import FloatToCurrency from '../../../app/helpers/FloatToCurrency';
import { CarouselOpportunities } from "./components/CarouselOpportunities";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

export function UserDashboard(props) {
    const dashboard = useSelector(state => state.app.dashboard);
    const is_dashboard_loading = useSelector(state => state.app.is_dashboard_loading);
    const { user } = useSelector((state) => state.auth);
    const subheader = useSubheader();
    const [opportunity, setOpportunity] = useState({});
    const [isNovoCalculoOpen, setIsNovoCalculoOpen] = useState(false);

    const dispatch = useDispatch();
    const opportunities = useSelector(state => state.app.opportunities);
    const is_opportunities_loading = useSelector(state => state.app.is_opportunities_loading);
    const [isModalViewOpportunityOpen, setIsModalViewOpportunityOpen] = useState(false);

    const view = (opportunity) => {
        setIsModalViewOpportunityOpen(true);
        setOpportunity(opportunity);
    }

    const unlock = (id) => {
        if (!window.confirm("Deseja realmente desbloquear esta oportunidade?")) {
            return;
        }
        dispatch({
            type: 'UNLOCK_OPPORTUNITY', payload: {
                submitValues: {
                    id: id
                },
                callback: () => {
                    //setIsUnlockModalOpen(false);
                    dispatch({ type: 'LOAD_OPPORTUNITIES' });
                }
            }
        });
    }

    useEffect(() => {
        dispatch({ type: 'LOAD_OPPORTUNITIES' });
        dispatch({ type: 'LOAD_DASHBOARD' });
        subheader.setBreadcrumbs([]);
    }, []);

    return (
        <div className="user-dashboard">
            <ModalCalculo isOpen={isNovoCalculoOpen} close={() => setIsNovoCalculoOpen(false)} />
            <ModalViewOpportunity opportunity={opportunity} isOpen={isModalViewOpportunityOpen} close={() => setIsModalViewOpportunityOpen(false)} />

            <div className="row">
                <div className="col-xxl-12 mb-9">
                    <h1 className="azul-cabecalho">Seja bem-vindo, {user.name.split(" ")[0]}</h1>
                </div>
            </div>
            <BlockUi tag="div" blocking={is_dashboard_loading}>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="row">
                            <div className="col-xl-6 column-custom ">
                                <div className={`card card-custom card-stretch card-numeric gutter-b`} style={{ backgroundColor: '#091D5C' }}>
                                    <div className="card-body p-0">
                                        <div className="d-flex flex-column">
                                            <span className="card-visualizar"><Link to="/clientes" style={{ color: '#FFF' }}>VISUALIZAR</Link></span>
                                            <span className="card-descricao">CLIENTES</span>
                                            <span className="card-numero">{dashboard.customers}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 column-custom">
                                <div className={`card card-custom card-numeric card-stretch gutter-b`} style={{ backgroundColor: '#0B236E' }}>
                                    <div className="card-body p-0">
                                        <div className="d-flex flex-column">
                                            <span className="card-visualizar"><a href="#" onClick={() => setIsNovoCalculoOpen(true)} style={{ color: '#fff' }}>NOVO CÁLCULO</a></span>
                                            <span className="card-descricao">MEUS CÁLCULOS</span>
                                            <span className="card-numero">{dashboard.calculations}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 column-custom">
                                <div className={`card card-custom card-numeric card-stretch gutter-b`} style={{ backgroundColor: '#133398' }}>
                                    <div className="card-body p-0">
                                        <div className="d-flex flex-column">
                                            <span className="card-visualizar"><Link to="/oportunidades" style={{ color: '#FFF' }}>VISUALIZAR</Link></span>
                                            <span className="card-descricao">OPORTUNIDADES</span>
                                            <span className="card-numero">{dashboard.opportunities}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 column-custom">
                                <div className={`card card-custom card-numeric card-stretch gutter-b`} style={{ backgroundColor: '#1640C6' }}>
                                    <div className="card-body p-0">
                                        <div className="d-flex flex-column">
                                            <span className="card-visualizar"><Link to="/peticoes" style={{ color: '#FFF' }}>VISUALIZAR</Link></span>
                                            <span className="card-descricao">PETIÇÕES</span>
                                            <span className="card-numero">{dashboard.petitions}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className={`card card-stretch gutter-b heightFix`} style={{backgroundColor: `#f7f7f7`}}>
                            <div className="card-body p-0">
                                <div>
                                    <h3 class="azul-cabecalho">OPORTUNIDADES</h3>
                                </div>
                                <CarouselOpportunities />
                            </div>
                        </div>
                    </div>
                </div>
            </BlockUi>
       

        </div>

    );
}