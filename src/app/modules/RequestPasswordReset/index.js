import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Link} from 'react-router-dom';
import BlockUi from 'react-block-ui';

export default function RequestPasswordReset(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const loading_request_reset = useSelector(state => state.resetPassword.loading_request_reset);
    const request_reset_data = useSelector(state => state.resetPassword.request_reset_data);
    const resetar = () => {
        if (email == '') {
            alert('Digite o e-mail.');
            return;
        }
        dispatch({
            type: 'REQUEST_RESET_PASSWORD',
            payload: {
                data: {email},
                callback: () => {
                    setEmail('');
                }
            }
        });
    }

    return (
        <div className="d-flex flex-column flex-root" style={{backgroundColor: '#FFF'}}>
            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: `url(${toAbsoluteUrl('/media/development-hd.png')})`}}>
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                    <a href="/metronic8/demo1/../demo1/index.html" className="mb-12">
                        
                        <img alt="Logo" src={toAbsoluteUrl("/media/logo-jusfy.svg")} className="h-45px" />
                    </a>
                    <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto" style={{backgroundColor: '#FFF'}}>
                        <form className="form w-100" novalidate="novalidate" id="kt_password_reset_form">
                            { (Object.keys(request_reset_data).length > 0 && request_reset_data.success) &&
                        <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
        <div className="alert-text font-weight-bold">Sucesso! Foi enviado um e-mail com as instruções para resetar sua senha.</div>
        </div>
}                                { (Object.keys(request_reset_data).length > 0 && !request_reset_data.success) &&

        <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
        <div className="alert-text font-weight-bold">{(request_reset_data.msg || 'Ocorreu um erro ao resetar sua senha, tente novamente.')}</div>
        </div>

}


                            <BlockUi tag="div" blocking={loading_request_reset}>
                                <div className="text-center mb-10">
                                    <h1 className="text-dark mb-3">Esqueceu sua senha?</h1>
                                    <div className="text-gray-400 fw-bold fs-4">Digite o seu e-mail para resetar a sua senha.</div>
                                </div>
                                <div className="fv-row mb-10">
                                    <label className="form-label fw-bolder text-gray-900 fs-6">E-mail</label>
                                    <input className="form-control form-control-solid" type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} placeholder="" name="email" autocomplete="off" />
                                </div>
                                <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                                    <button type="button" id="kt_password_reset_submit" className="btn btn-lg btn-primary fw-bolder mr-5" onClick={resetar}>
                                        <span className="indicator-label">Resetar</span>
                                    </button>
                                    <Link to="/" className="btn btn-lg btn-light-primary fw-bolder">Voltar</Link>
                                </div>
                            </BlockUi>
                        </form>
                    </div>
                </div>
                <div className="d-flex flex-center flex-column-auto p-10">
                    <div className="d-flex align-items-center fw-bold fs-6">
                        <a href="https://jusfy.com.br" target="_BLANK" className="text-muted text-hover-primary px-2">Sobre nós</a>
                        <a href="mailto:contato@jusfy.com.br" className="text-muted text-hover-primary px-2">Entrar em contato</a>
                    </div>
                </div>
            </div>
        </div>
    );
}