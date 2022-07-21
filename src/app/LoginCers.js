import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { login } from "./modules/Auth/_redux/authCrud";
import * as auth from "./modules/Auth/_redux/authRedux";


function LoginCers(props) {
    useEffect(() => {
        login(props.match.params.email, '@Cers2021@_'+props.match.params.nome)
            .then(({ data: { accessToken } }) => {
            props.login(accessToken);
                setTimeout(() => {
                    window.location = 'https://app.jusfy.com.br'
                }, 3000);
            })
            .catch((err) => {
            
            });
    }, []);
    return (
      <p>Aguarde! Carregando sua página..</p>
    );
  }

  
export default injectIntl(connect(null, auth.actions)(LoginCers));
