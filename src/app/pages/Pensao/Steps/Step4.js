import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Step4(props) {
    const dispatch = useDispatch();

    const report_childcare = useSelector(state => state.app.report_childcare);

    const proximo = async () => {
        const validation = await props.formik.validateForm();

        props.formik.setTouched(validation);
        console.log(props.step);
        if (Object.keys(validation).length == 0) props.setStep(props.step+1);
    }

    return (
<>
        <div className="row mb-10">
            <div className="col-xl-12">
                <div style={{backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '5px', padding: '40px'}}>
                                
                {Object.keys(report_childcare).length > 0 &&
                <>
                    <div className="row mb-5">

                        <div className="d-flex" style={{cursor: 'pointer'}} onClick={() => window.open(report_childcare.pdf_filename)}>
                            <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                                <i className="flaticon2-protected"></i>
                                <span className="pulse-ring"></span>
                            </a>
                            <p className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Resumo do cálculo, clique aqui para baixar.</p>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="d-flex" style={{cursor: 'pointer'}} onClick={() => window.open(`${process.env.REACT_APP_API_URL}/${report_childcare.pdf_complete_filename}`)}>
                            <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                                <i className="flaticon2-protected"></i>
                                <span className="pulse-ring"></span>
                            </a>
                            <p className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Cálculo detalhado, clique aqui para baixar.</p>
                        </div>
                    </div>


                    <div className="row">
                        <Link to="/peticoes/listagem/59/Execução%20de%20alimentos" target="_BLANK">
                            <div className="d-flex" style={{cursor: 'pointer'}}>
                                <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                                    <i className="flaticon2-document"></i>
                                    <span className="pulse-ring"></span>
                                </a>
                                <p className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Petições para execução de alimentos</p>
                            </div>
                        </Link>
                    </div>

                </>
                }
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-4 col-md-12">
                <button type="button" className="btn btn-cinza" style={{width: '150px'}} onClick={() => props.setStep(props.step-1)}>VOLTAR</button>
            </div>
        </div>
    </>);
}