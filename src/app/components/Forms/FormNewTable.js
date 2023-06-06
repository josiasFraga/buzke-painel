import React from "react";
import BlockUi from 'react-block-ui';

export function FormNewTable(props) {

    const formik = props.formik;

    return (
    <BlockUi tag="div" blocking={formik.isSubmitting}>
        <div className="row">

            <div className="col-xl-12 col-md-12">
                <h4>Dados da Mesa:</h4>
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Nome <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="descricao"
                    autoFocus
                    className={"form-control " + (formik.errors.descricao && formik.touched.descricao ? 'is-invalid' : '')}
                    value={formik.values.descricao}
                    onChange={formik.handleChange}
                />
                {formik.errors.descricao && formik.touched.descricao && <label className="invalid-feedback">{formik.errors.descricao}</label>}
            </div>
            
        </div>

    </BlockUi>
    );
}