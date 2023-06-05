import React, { useState, useEffect, createContext } from "react";
import { useDispatch } from 'react-redux';
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { useFormik } from 'formik';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import { login } from "../../../Auth/_redux/authCrud";
import BlockUi from 'react-block-ui';
import * as auth from "../../../Auth/_redux/authRedux";

const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
    }

    .modal-content {
        border-radius: 10px !important;
    }

    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }

`;

const Content = styled.div`
    input:focus {
        border: 1px solid #41C78F !important;
    }

    img { margin: 0 auto; display: block; margin-bottom: 25px; width: 80px; }
    p { text-align: center; margin-top: 20px; color: #2e3f75; opacity: 0.6; padding: 0px 30px; margin-top: 20px; margin-bottom: 0;}
    label { font-size: 14px; color: #2e3f75; margin-bottom: 5px; opacity: 0.7;}
    input.form-control { margin-bottom: 20px; outline: none; box-shadow: none; border:1px solid #ccc; padding: 10px;}
    .btn-primary { background: #41C78F; border:none; margin: 0 auto; display: block; border-radius: 50px; padding: 12px 50px; font-size: 16px; text-transform: uppercase; font-weight: 600; margin-top: 30px; }
    .btn-primary:hover { cursor: pointer; background: #3ab380; }

    @media only screen and (max-width:899px) {
        input.form-control { padding: 7px; }
        .btn-primary { padding: 10px 40px; font-size: 14px; }
    }
`;

export default function ModalLogin(props) {
    const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido.")
      .required("Este campo é obrigatório."),
    password: Yup.string()
      .required("Este campo é obrigatório")
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      console.log("submitting")
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { accessToken } }) => {

            disableLoading();
            console.log(props)
            dispatch({type: auth.actionTypes.Login, payload: {authToken: accessToken}});
            if (props.formik.values.product_selected != null) {
                props.checkout();
            } else {
                props.close();
            }
            
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus("E-mail ou senha estão incorretos.");
          });
      }, 1000);
    },
  });

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      formik.handleSubmit();
    }
  }

    return (
        <ResponsiveModal
            show={props.isOpen}
            onHide={props.close}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <ButtonClose onClick={props.close}>X</ButtonClose>

                <Content>
                    {}
                    <img src={toAbsoluteUrl("/media/logo-jusfy.svg")} />
                    <BlockUi tag="div" blocking={loading}>
                    {formik.status &&
                        <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                            <div className="alert-text font-weight-bold">{formik.status}</div>
                        </div>
                    }

                        <label>Digite seu e-mail</label>
                        <input
                            name="email"
                            type="text"
                            className={"form-control " + (formik.errors.email && formik.touched.email ? 'is-invalid' : '')}
                            onKeyDown={handleKeyDown}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email && <label className="invalid-feedback">{formik.errors.email}</label>}



                        <label>Digite sua senha</label>
                        <input
                            name="password"
                            type="password"
                            className={"form-control " + (formik.errors.password && formik.touched.password ? 'is-invalid' : '')}
                            onKeyDown={handleKeyDown}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && <label className="invalid-feedback">{formik.errors.password}</label>}

    
                        <button class="btn btn-primary" type="button" onClick={formik.handleSubmit}>Entrar agora</button>
                    </BlockUi>
                </Content>
          </Modal.Body>
          </ResponsiveModal>
    ); 
}