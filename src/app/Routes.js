/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Simulation from "./modules/Simulation";
import Login from "./modules/Auth/pages/Login";
import { ContentRoute } from "../_metronic/layout";
import Register from './pages/Cadastro';
import Jusfinder from "./modules/Jusfinder";
import Validation from "./modules/Validation";
import LoginCers from './LoginCers';
import RequestPasswordReset from './modules/RequestPasswordReset';
import PasswordReset from './modules/PasswordReset';

export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    <Switch>
    { (window.location.hostname == 'jusfinder.com.br' || window.location.hostname == 'www.jusfinder.com.br') &&
      <Route exact path="/" component={Jusfinder} />
    }
      <Route path="/auth/cers/:email/:nome" component={LoginCers} />
      <Route path="/request_password_reset" component={RequestPasswordReset} />
      <Route path="/password_reset/:token" component={PasswordReset} />

      <Route path="/validation/:token" component={Validation} />
      <Route path="/jusfinder" component={Jusfinder} />
      <Route path="/simulation" component={Simulation} />
      <Route path="/register/:redirect" component={Register} />
      <Route path="/register" component={Register} />
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <Switch>
            <ContentRoute path="/auth/login" component={AuthPage} />
            <Redirect from="/auth" exact={true} to="/auth/login" />
            <Redirect to="/auth/login" />
          </Switch>
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
