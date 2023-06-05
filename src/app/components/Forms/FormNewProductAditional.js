import React from "react";
import { NumericFormat } from 'react-number-format';
import BlockUi from 'react-block-ui';

export function FormNewProductAditional(props) {
    const formik = props.formik;

    return (
    <BlockUi tag="div" blocking={formik.isSubmitting}>
        <div className="row">


            <div className="col-md-6 mb-8">
                <label className="form-label">Descrição <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="descricao"
                    className={"form-control " + (formik.errors.descricao && formik.touched.descricao ? 'is-invalid' : '')}
                    value={formik.values.descricao}
                    onChange={formik.handleChange}
                />
                {formik.errors.descricao && formik.touched.descricao && <label className="invalid-feedback">{formik.errors.descricao}</label>}
            </div>


            <div className="col-md-4 mb-8">
                <label className="form-label">Valor <span className="text-danger">&nbsp;*</span></label>
                <NumericFormat
                    thousandSeparator={true}
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    name="valor"
                    className={"form-control " + (formik.errors.valor && formik.touched.valor ? 'is-invalid' : '')}
                    value={formik.values.valor}
                    onValueChange={(values) => {
                        formik.setFieldValue('valor', values.value);
                    }}
                />
                {formik.errors.valor && formik.touched.valor && <label className="invalid-feedback">{formik.errors.valor}</label>}
            </div>
    
            <div className="col-md-2 mb-8">
                <label className="form-label"> <span className="text-danger">&nbsp;</span></label>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={formik.handleSubmit} // Chame a função de handleSubmit do formik ou a função responsável por salvar os dados
                >
                    Salvar
                </button>
            </div>

        </div>

    </BlockUi>
    );
}