import React from "react";
import { useDispatch } from 'react-redux';

import PickerDestinoImpressao from '../Forms/Components/Pickers/DestinoImpressao';
import PickerClasseImposto from "../Forms/Components/Pickers/ClasseImposto";
import PickerParteCupom from "../Forms/Components/Pickers/ParteCupom";
import PickerProdutoCategoria from "../Forms/Components/Pickers/ProdutoCategoria";

import { NumericFormat } from 'react-number-format';

import Form from 'react-bootstrap/Form';

import BlockUi from 'react-block-ui';

export function FormNewProduct(props) {
    const formik = props.formik;

    return (
    <BlockUi tag="div" blocking={formik.isSubmitting}>
        <div className="row">

            <div className="col-xl-12 col-md-12">
                <h4>Dados Básicos:</h4>
            </div>

            <div className="col-md-12 mb-8">
                <PickerProdutoCategoria formik={formik} />
            </div>

            <div className="col-md-4 mb-8">
                <label className="form-label">Código <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="codigo"
                    autoFocus
                    className={"form-control " + (formik.errors.codigo && formik.touched.codigo ? 'is-invalid' : '')}
                    value={formik.values.codigo}
                    onChange={formik.handleChange}
                />
                {formik.errors.codigo && formik.touched.codigo && <label className="invalid-feedback">{formik.errors.codigo}</label>}
            </div>

            <div className="col-md-8 mb-8">
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
                <label className="form-label">Estoque mínimo <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="tel"
                    name="estoque_minimo"
                    className={"form-control " + (formik.errors.estoque_minimo && formik.touched.estoque_minimo ? 'is-invalid' : '')}
                    value={formik.values.estoque_minimo}
                    onChange={formik.handleChange}
                />
                {formik.errors.estoque_minimo && formik.touched.estoque_minimo && <label className="invalid-feedback">{formik.errors.estoque_minimo}</label>}
            </div>

            <div className="col-md-4 mb-8">
                <label className="form-label">Estoque inicial <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="tel"
                    name="estoque_inicial"
                    className={"form-control " + (formik.errors.estoque_inicial && formik.touched.estoque_inicial ? 'is-invalid' : '')}
                    value={formik.values.estoque_inicial}
                    onChange={formik.handleChange}
                />
                {formik.errors.estoque_inicial && formik.touched.estoque_inicial && <label className="invalid-feedback">{formik.errors.estoque_inicial}</label>}
            </div>

            <div className="col-md-4 mb-8">
                <label className="form-label">Data do estoque <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="date"
                    name="data_estoque"
                    className={"form-control " + (formik.errors.data_estoque && formik.touched.data_estoque ? 'is-invalid' : '')}
                    value={formik.values.data_estoque}
                    onChange={formik.handleChange}
                />
                {formik.errors.data_estoque && formik.touched.data_estoque && <label className="invalid-feedback">{formik.errors.data_estoque}</label>}
            </div>

            <div className="col-md-6 mb-8">
                <label className="form-label">Valor de custo <span className="text-danger">&nbsp;*</span></label>
                <NumericFormat
                    thousandSeparator={true}
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    name="valor_custo"
                    className={"form-control " + (formik.errors.valor_custo && formik.touched.valor_custo ? 'is-invalid' : '')}
                    value={formik.values.valor_custo}
                    onValueChange={(values) => {
                        formik.setFieldValue('valor_custo', values.value);
                    }}
                />
                {formik.errors.valor_custo && formik.touched.valor_custo && <label className="invalid-feedback">{formik.errors.valor_custo}</label>}
            </div>

            <div className="col-md-6 mb-8">
                <label className="form-label">Valor de venda <span className="text-danger">&nbsp;*</span></label>
                <NumericFormat
                    thousandSeparator={true}
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    name="valor_venda"
                    className={"form-control " + (formik.errors.valor_venda && formik.touched.valor_venda ? 'is-invalid' : '')}
                    value={formik.values.valor_venda}
                    onValueChange={(values) => {
                        formik.setFieldValue('valor_venda', values.value);
                    }}
                />
                {formik.errors.valor_venda && formik.touched.valor_venda && <label className="invalid-feedback">{formik.errors.valor_venda}</label>}
            </div>

            <div className="col-md-4 mb-8">
                <PickerClasseImposto formik={formik} />
            </div>

            <div className="col-md-4 mb-8">
                <label className="form-label">NCM <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="ncm"
                    className={"form-control " + (formik.errors.ncm && formik.touched.ncm ? 'is-invalid' : '')}
                    value={formik.values.ncm}
                    onChange={formik.handleChange}
                />
                {formik.errors.ncm && formik.touched.ncm && <label className="invalid-feedback">{formik.errors.ncm}</label>}
            </div>

            <div className="col-md-4 mb-8">
                <label className="form-label">CEST <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="cest"
                    className={"form-control " + (formik.errors.ncm && formik.touched.cest ? 'is-invalid' : '')}
                    value={formik.values.cest}
                    onChange={formik.handleChange}
                />
                {formik.errors.cest && formik.touched.cest && <label className="invalid-feedback">{formik.errors.cest}</label>}
            </div>

            <div className="col-md-6 mb-8">
                <PickerDestinoImpressao formik={formik} />
            </div>

            <div className="col-md-6 mb-8">
                <PickerParteCupom formik={formik} />
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Ativo</label>
                <Form.Check
                type="radio"
                label="Sim"
                name="ativo"
                id="ativo_s"
                custom
                checked={formik.values.ativo == 1}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("ativo", 1);
                    }
                }}
                />
                <Form.Check
                type="radio"
                label="Não"
                name="ativo"
                id="ativo_n"
                custom
                checked={formik.values.ativo == "0"}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("ativo", "0");
                    }
                }}
            />
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Alcoólico</label>
                <Form.Check
                type="radio"
                label="Sim"
                name="alcoolico"
                id="alcoolico_s"
                custom
                checked={formik.values.alcoolico == 1}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("alcoolico", 1);
                    }
                }}
                />
                <Form.Check
                type="radio"
                label="Não"
                name="alcoolico"
                id="alcoolico_n"
                custom
                checked={formik.values.alcoolico == "0"}
                onChange={(evt)=>{
                    if ( evt.target.checked ) {
                        formik.setFieldValue("alcoolico", "0");
                    }
                }}
            />
            </div>

            <div className="col-xl-12 col-md-12 mb-4">
                <h4>Adicionais:</h4>
            </div>

        </div>

    </BlockUi>
    );
}