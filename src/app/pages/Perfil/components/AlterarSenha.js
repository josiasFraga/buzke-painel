import React from "react";

export default function AlterarSenha(props) {
    return (
    <>            
        <div className="row mb-5">
            <div className="col-xl-6">
                <label className="form-label">Nova senha</label>
                <input
                    type="password"
                    name="password"
                    className={"form-control " + (props.formik.errors.password && props.formik.touched.password ? 'is-invalid' : '')}
                    value={props.formik.values.password}
                    onChange={props.formik.handleChange}
                />
                {props.formik.errors.password && props.formik.touched.password && <label className="invalid-feedback">{props.formik.errors.password}</label>}
            </div>
            <div className="col-xl-6">
                <label className="form-label">Confirmar senha</label>
                <input
                    type="password"
                    name="confirmation_password"
                    className={"form-control " + (props.formik.errors.confirmation_password && props.formik.touched.confirmation_password ? 'is-invalid' : '')}
                    value={props.formik.values.confirmation_password}
                    onChange={props.formik.handleChange}
                />
                {props.formik.errors.confirmation_password && props.formik.touched.confirmation_password && <label className="invalid-feedback">{props.formik.errors.confirmation_password}</label>}
            </div>
        </div>
        <button type="button" className="btn btn-primary btnDefault" style={{width: '230px'}} onClick={props.formik.handleSubmit}>ALTERAR</button>
    </>
    );
}
