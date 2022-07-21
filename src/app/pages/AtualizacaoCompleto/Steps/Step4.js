import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Step4(props) {
    const dispatch = useDispatch();

    const reportCorrection = useSelector(state => state.app.report_correction_complete);

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
                                
                {Object.keys(reportCorrection).length > 0 &&
                <>
                    <div className="row mb-5">

                        <div className="d-flex" style={{cursor: 'pointer'}} onClick={() => window.open(reportCorrection.pdf_filename)}>
                            <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                                <i className="flaticon2-protected"></i>
                                <span className="pulse-ring"></span>
                            </a>
                            <p className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Resumo do cálculo, clique aqui para baixar.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex" style={{cursor: 'pointer'}} onClick={() => window.open(`${process.env.REACT_APP_API_URL}/${reportCorrection.pdf_complete_filename}`)}>
                            <a href="#" className="btn btn-icon btn-light-success pulse pulse-success mr-5" style={{color: '#41C78F !important'}}>
                                <i className="flaticon2-protected"></i>
                                <span className="pulse-ring"></span>
                            </a>
                            <p className="azul-cabecalho" style={{opacity: 0.7, marginTop: '9px'}}>Cálculo detalhado, clique aqui para baixar.</p>
                        </div>
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