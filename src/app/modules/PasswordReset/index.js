import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import {Link} from 'react-router-dom';
import BlockUi from 'react-block-ui';

export default function PasswordReset(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const loading_reset_password = useSelector(state => state.resetPassword.loading_reset_password);
    const reset_password_data = useSelector(state => state.resetPassword.reset_password_data);
    const resetar = () => {
        if (password !== confirmationPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        dispatch({
            type: 'RESET_PASSWORD',
            payload: {
                data: {
                    password: password,
                    confirmation_password: confirmationPassword,
                    token: props.match.params.token
                },
            }
        });
    }

    return (
        <div className="d-flex flex-column flex-root" style={{backgroundColor: '#FFF'}}>
            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: `url(${toAbsoluteUrl('/media/development-hd.png')})`}}>
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                    <a href="/metronic8/demo1/../demo1/index.html" className="mb-12">
                        
                        <img alt="Logo" src={toAbsoluteUrl("/media/logo-buzke.svg")} className="h-45px" />
                    </a>
                    <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto" style={{backgroundColor: '#FFF'}}>
                        <form className="form w-100" novalidate="novalidate" id="kt_password_reset_form">
                            { (Object.keys(reset_password_data).length > 0 && reset_password_data.success) &&
                        <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
        <div className="alert-text font-weight-bold">Sucesso! Sua senha foi alterada com sucesso. <Link to="/" style={{fontWeight: 'bold', color: 'inherit', fontSize: '16px'}}>Clique aqui para realizar login.</Link></div>
        </div>
}                                { (Object.keys(reset_password_data).length > 0 && !reset_password_data.success) &&

        <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
        <div className="alert-text font-weight-bold">{(reset_password_data.msg || 'Ocorreu um erro ao alterar sua senha, tente novamente.')}</div>
        </div>

}
{ (Object.keys(reset_password_data).length == 0 || (Object.keys(reset_password_data).length > 0 && !reset_password_data.success) ) &&


                            <BlockUi tag="div" blocking={loading_reset_password}>
                                <div className="text-center mb-10">
                                    <h1 className="text-dark mb-3">Alterar senha</h1>
                                    <div className="text-gray-400 fw-bold fs-4">Digite a sua nova senha.</div>
                                </div>
                                <div className="fv-row mb-10">
                                    <label className="form-label fw-bolder text-gray-900 fs-6">Nova senha</label>
                                    <input className="form-control form-control-solid" type="password" value={password} onChange={(evt) => setPassword(evt.target.value)} placeholder="" name="password" autocomplete="off" />
                                </div>
                                <div className="fv-row mb-10">
                                    <label className="form-label fw-bolder text-gray-900 fs-6">Confirme a senha</label>
                                    <input className="form-control form-control-solid" type="password" value={confirmationPassword} onChange={(evt) => setConfirmationPassword(evt.target.value)} placeholder="" name="confirmation_password" autocomplete="off" />
                                </div>

                                <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                                    <button type="button" id="kt_password_reset_submit" className="btn btn-lg btn-primary fw-bolder mr-5" onClick={resetar}>
                                        <span className="indicator-label">Alterar Senha</span>
                                    </button>
                                    <Link to="/" className="btn btn-lg btn-light-primary fw-bolder">Voltar</Link>
                                </div>
                            </BlockUi>
}
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