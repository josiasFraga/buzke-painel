import React from 'react';
import Form from 'react-bootstrap/Form';
import CurrencyInput from "react-currency-input";

export function StepOne(props) {

    const formik = props.formik;

    return (
        <>

            <div className="col-md-12 mb-8">
                <label className="form-label">Nome do Torneio <span className="text-danger">&nbsp;*</span></label>
                <input
                    type="text"
                    name="nome"
                    autoFocus
                    className={"form-control " + (formik.errors.nome && formik.touched.nome ? 'is-invalid' : '')}
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.nome && formik.touched.nome && <label className="invalid-feedback">{formik.errors.nome}</label>}
            </div>

            <div className="col-md-12 mb-8">
                <label className="form-label">Descrição do Torneio <span className="text-danger">&nbsp;*</span></label>
                <textarea
                    name="descricao"
                    className={"form-control " + (formik.errors.descricao && formik.touched.descricao ? 'is-invalid' : '')}
                    value={formik.values.descricao}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.descricao && formik.touched.descricao && <label className="invalid-feedback">{formik.errors.descricao}</label>}
            </div>

            <div className='row' style={{paddingLeft: 15, paddingRight: 15}}>
                <div className="col-md-4 mb-8">
                    <label className="form-label">Início do torneio em...<span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        name="inicio"
                        className={"form-control " + (formik.errors.inicio && formik.touched.inicio ? 'is-invalid' : '')}
                        value={formik.values.inicio}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.inicio && formik.touched.inicio && <label className="invalid-feedback">{formik.errors.inicio}</label>}
                </div>

                <div className="col-md-4 mb-8">
                    <label className="form-label">Fim do torneio em...<span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        name="fim"
                        className={"form-control " + (formik.errors.fim && formik.touched.fim ? 'is-invalid' : '')}
                        value={formik.values.fim}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.fim && formik.touched.fim && <label className="invalid-feedback">{formik.errors.fim}</label>}
                </div>
                
                <div className="col-md-4 mb-8">
                    <label className="form-label">Exibir torneio aos usuários a partir de...<span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        name="data_publicacao"
                        className={"form-control " + (formik.errors.inicio && formik.touched.data_publicacao ? 'is-invalid' : '')}
                        value={formik.values.data_publicacao}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.data_publicacao && formik.touched.data_publicacao && <label className="invalid-feedback">{formik.errors.data_publicacao}</label>}
                </div>
            </div>

            <div className='row' style={{paddingLeft: 15, paddingRight: 15}}>
                <div className="col-md-4 mb-8">
                    <label className="form-label">Inscrições de <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        name="inscricoes_de"
                        className={"form-control " + (formik.errors.inscricoes_de && formik.touched.inscricoes_de ? 'is-invalid' : '')}
                        value={formik.values.inscricoes_de}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.inscricoes_de && formik.touched.inscricoes_de && <label className="invalid-feedback">{formik.errors.inscricoes_de}</label>}
                </div>

                <div className="col-md-4 mb-8">
                    <label className="form-label">Inscrições Até <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        name="inscricoes_ate"
                        className={"form-control " + (formik.errors.inscricoes_ate && formik.touched.inscricoes_ate ? 'is-invalid' : '')}
                        value={formik.values.inscricoes_ate}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.inscricoes_ate && formik.touched.inscricoes_ate && <label className="invalid-feedback">{formik.errors.inscricoes_ate}</label>}
                </div>

                <div className="col-md-4 mb-8">
                    <label className="form-label">Valor da Inscrição <span className="text-danger">&nbsp;*</span></label>

                    <CurrencyInput
                    name={`valor_inscricao`}
                    className="form-control"
                    value={formik.values.valor_inscricao}
                    prefix="R$ "
                    decimalSeparator=","
                    thousandSeparator="."
                    selectAllOnFocus={true}
                    onChangeEvent={(ev, maskedvalue, floatvalue) =>
                        props.formik.setFieldValue(
                            `valor_inscricao`,
                            floatvalue
                        )
                    }
                    />
                    {formik.errors.valor_inscricao && formik.touched.valor_inscricao && <label className="invalid-feedback">{formik.errors.valor_inscricao}</label>}
                </div>
            </div>

            <div className='row' style={{paddingLeft: 15, paddingRight: 15}}>

                <div className="col-md-6 mb-8">
                    <label className="form-label">Limite máximo de inscrições por jogador <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="number"
                        name="max_inscricoes_por_jogador"
                        className={"form-control " + (formik.errors.max_inscricoes_por_jogador && formik.touched.max_inscricoes_por_jogador ? 'is-invalid' : '')}
                        value={formik.values.max_inscricoes_por_jogador}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.max_inscricoes_por_jogador && formik.touched.max_inscricoes_por_jogador && <label className="invalid-feedback">{formik.errors.max_inscricoes_por_jogador}</label>}
                </div>

                <div className="col-md-6 mb-8">
                    <label className="form-label">Nº de impedimentos <span className="text-danger">&nbsp;*</span></label>
                    <input
                        type="number"
                        name="impedimentos"
                        className={"form-control " + (formik.errors.impedimentos && formik.touched.impedimentos ? 'is-invalid' : '')}
                        value={formik.values.impedimentos}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.impedimentos && formik.touched.impedimentos && <label className="invalid-feedback">{formik.errors.impedimentos}</label>}
                </div>
            </div>
        </>
    )
}