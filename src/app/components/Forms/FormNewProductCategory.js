import React from "react";
import BlockUi from 'react-block-ui';

export function FormNewProductCategory(props) {

    const formik = props.formik;

    return (
    <BlockUi tag="div" blocking={formik.isSubmitting}>
        <div className="row">

            <div className="col-xl-12 col-md-12">
                <h4>Dados da Categoria:</h4>
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Nome <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="nome"
                    autoFocus
                    className={"form-control " + (formik.errors.nome && formik.touched.nome ? 'is-invalid' : '')}
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                />
                {formik.errors.nome && formik.touched.nome && <label className="invalid-feedback">{formik.errors.nome}</label>}
            </div>
            
        </div>

    </BlockUi>
    );
}