import React from "react";
import BlockUi from 'react-block-ui';
import { useSelector, useDispatch } from 'react-redux';

export function FormAddProductToOrder(props) {

    const dispatch = useDispatch();

    const formik = props.formik;
    const produto_id = props.produto_id;
    const aditionals = useSelector(state => state.app.product_aditionals);

    React.useEffect(()=>{
        
        formik.setFieldValue('produto_id', produto_id);

        dispatch({type: 'LOAD_PRODUCT_ADITIONALS', payload: {
            params: {
                produto_id: produto_id
            }
        }});
    }, [produto_id]);

    return (
    <BlockUi tag="div" blocking={formik.isSubmitting}>
        <div className="row">

            <div className="col-md-12 mb-8">
                <label className="form-label">Adicionais </label>
                {aditionals.map((aditional, index) => (
                    <div key={index} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`aditional-${index}`}
                            name={`aditional-${index}`}
                            value={aditional.ProdutoAdicional.id} // Presumindo que cada adicional tem um id
                            onChange={(evt) => {
                                const isChecked = evt.target.checked;
                                const updatedAdicionais = isChecked
                                    ? [...formik.values.adicionais, evt.target.value]
                                    : formik.values.adicionais.filter(id => id !== evt.target.value);

                                formik.setFieldValue("adicionais", updatedAdicionais);
                            }}
                        />
                        <label className="form-check-label" htmlFor={`aditional-${index}`}>
                            {aditional.ProdutoAdicional.descricao} +  R$ {parseFloat(aditional.ProdutoAdicional.valor).toFixed(2)}
                        </label>
                    </div>
                ))}
            </div>
        </div>

        <div className="row">

            <div className="col-md-12 mb-8">
                <label className="form-label">Quantidade </label>
                <input
                    type="text"
                    name="quantidade"
                    autoFocus
                    maxLength={2}
                    className={"form-control " + (formik.errors.quantidade && formik.touched.quantidade ? 'is-invalid' : '')}
                    value={formik.values.quantidade}
                    onChange={formik.handleChange}
                />
                {formik.errors.quantidade && formik.touched.quantidade && <label className="invalid-feedback">{formik.errors.quantidade}</label>}
            </div>
            
        </div>

        <div className="row">

            <div className="col-md-12 mb-8">
                <label className="form-label">Observações </label>
                <textarea
                    name="observacoes"
                    rows="4"
                    className={"form-control " + (formik.errors.observacoes && formik.touched.observacoes ? 'is-invalid' : '')}
                    value={formik.values.observacoes}
                    onChange={formik.handleChange}
                />
                {formik.errors.observacoes && formik.touched.observacoes && <label className="invalid-feedback">{formik.errors.observacoes}</label>}
            </div>
            
        </div>

    </BlockUi>
    );
}