import React, { Suspense, lazy, useState, useEffect } from "react";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Agenda } from "./pages/Agenda";
import { Oportunidades } from './pages/Oportunidades';
import { Revisional } from './pages/Revisional';
import { Clientes } from './pages/Clientes';
import { ClientesForm } from './pages/ClientesForm';
import { Perfil } from './pages/Perfil';
import { Atualizacao } from './pages/Atualizacao';
import { Jurisprudencia } from './pages/Jurisprudencia';
import { JurisprudenciaCompleta } from './pages/JurisprudenciaCompleta';
import { Consulta } from './pages/Consulta';
import { Peticoes } from './pages/Peticoes';
import { AtualizacaoCompleto } from './pages/AtualizacaoCompleto';
import { PeticoesListagem } from './pages/PeticoesListagem';
import { PeticaoVisualizar } from './pages/PeticaoVisualizar';
import { Fgts } from './pages/Fgts';
import { Pensao } from './pages/Pensao';
import { Aluguel } from './pages/Aluguel';
import { Prev } from './pages/Prev';
import { Telas } from './pages/Telas';
import { Trabalhista } from './pages/Trabalhista';
import { Jusfinder } from './pages/Jusfinder';
import Calculos from './pages/Calculos';
import AdminClientes from './pages/AdminClientes';
import { toAbsoluteUrl } from "../_metronic/_helpers";
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
        <ContentRoute path="/agenda" component={Agenda} />
        <ContentRoute path="/telasPerfilUsuario" component={Telas} />
        <ContentRoute path="/admin/clientes" component={AdminClientes} />
        <ContentRoute path="/pensao/:calculo_id" component={Pensao} />
        <ContentRoute path="/pensao" component={Pensao} />
        <ContentRoute path="/aluguel" component={Aluguel} />
        <ContentRoute path="/fgts/:calculo_id" component={Fgts} />
        <ContentRoute path="/fgts" component={Fgts} />
        <ContentRoute path="/calculadora_cnis/:calculo_id" component={Prev} />
        <ContentRoute path="/calculadora_cnis" component={Prev} />
        <ContentRoute path="/jusfinder-calc" component={Jusfinder} />
        <ContentRoute path="/oportunidades" component={Oportunidades} />
        <ContentRoute path="/calculos" component={Calculos} />
        <ContentRoute path="/peticoes/listagem/:category_id/:filter" component={PeticoesListagem} />
        <ContentRoute path="/peticoes/listagem/:category_id" component={PeticoesListagem} />
        <ContentRoute path="/peticoes/visualizar/:petition_id/:category_id" component={PeticaoVisualizar} />
        <ContentRoute path="/peticoes" component={Peticoes} />
        <ContentRoute path="/trabalhista" component={Trabalhista} />
        <ContentRoute path="/atualizacao/:calculo_id" component={Atualizacao} />
        <ContentRoute path="/atualizacao" component={Atualizacao} />
        <ContentRoute path="/atualizacao_completo/:calculo_id" component={AtualizacaoCompleto} />
        <ContentRoute path="/atualizacao_completo" component={AtualizacaoCompleto} />
        <ContentRoute path="/consulta" component={Consulta} />
        <ContentRoute path="/jurisprudencia/:id" component={JurisprudenciaCompleta} />
        <ContentRoute path="/jurisprudencia" component={Jurisprudencia} />
        <ContentRoute path="/clientes/form/:cliente_id" component={ClientesForm} />
        <ContentRoute path="/clientes/form" component={ClientesForm} />
        <ContentRoute path="/perfil" component={Perfil} />
        <ContentRoute path="/revisional/:calculo_id" component={Revisional} />
        <ContentRoute path="/revisional" component={Revisional} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
