import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import {  useDispatch } from 'react-redux';

import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { Agenda } from "./pages/Agenda";
import { Clientes } from './pages/Clientes';
import { Torneios } from './pages/Torneios';
import { ProdutosCategorias } from './pages/ProdutosCategorias';
import { Produtos } from './pages/Produtos';
import { Consumo } from './pages/Consumo';
import { Mesas } from './pages/Mesas';
import { Comandas } from './pages/Comandas';
import { TorneiosForm } from './pages/TorneiosForm';
import { Perfil } from './pages/Perfil';
import styled from 'styled-components';
import { Modal } from "react-bootstrap";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);


const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;


const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-content {
        border-radius: 10px !important;
        max-height: 90vh;
    }

    .modal-dialog {
        max-width: 700px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }
`;



export default function BasePage() {
	const dispatch = useDispatch();

	const location = useLocation();



  return (
    <Suspense fallback={<LayoutSplashScreen />}>

      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/clientes" component={Clientes} />
        <ContentRoute path="/torneios/form" component={TorneiosForm} />
        <ContentRoute path="/torneios" component={Torneios} />
        <ContentRoute path="/agenda" component={Agenda} />
        <ContentRoute path="/perfil" component={Perfil} />
        <ContentRoute path="/produtos-categorias" component={ProdutosCategorias} />
        <ContentRoute path="/produtos" component={Produtos} />
        <ContentRoute path="/consumo" component={Consumo} />
        <ContentRoute path="/mesas" component={Mesas} />
        <ContentRoute path="/comandas" component={Comandas} />
        
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
