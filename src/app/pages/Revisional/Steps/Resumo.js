import React from 'react';
import {toAbsoluteUrl, FloatToCurrency} from "../../../../_metronic/_helpers";
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Report = styled.div`
    cursor: pointer;
`;
const ReportIcon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background-color: #7D89AB;
    text-align: center;

    i {
        color: #FFF !important;
        position: relative;
        top: calc(50% - 19px);
    }
`;

const ReportTitle = styled.p`
    font-size: 13px;
    color: #7D89AB;
    opacity: 0.8;
    font-weight: bold;
    margin-bottom: 0px;
`;

const ReportSubtitle = styled.p`
    font-size: 11px;
    color: #2E3F75;
    opacity: 0.6;
`;

const ReportDetails = styled.div`
    margin-left: 10px;
    padding-top: 16px;
`;

export default function Resumo(props) {
    const reportData = useSelector(state => state.app.report_review);

    const openReportPdf = () => {
        window.open(reportData.pdf_filename);
    }

    const openPetition = () => {
        window.open(`${process.env.REACT_APP_API_URL}/${reportData.petition_filename}`);
    }

    const openExpertReport = () => {
        window.open(reportData.expert_report_filename);
    }

    return (
        <CSSTransition
        in={true}
        appear={true}
        classNames="fade"
        timeout={1500}
    >
    <div>
        <div className="row mt-20 mb-5">
            <div className="col-xl-8">
                <h2 className="azul-cabecalho" style={{fontWeight: 'bold'}}>Resumo</h2>
                <p className="mb-10" style={{color: '#2e3f75', opacity: 0.6, fontSize: '14px'}}>Veja os principais dados apurados no cálculo.</p>
                <div className="row">
                    <div style={{width: '300px', paddingLeft: '12.5px', borderRight: '1px solid rgba(125,137,171,0.17)'}}>
                        <p className="resumo-item mb-10">Cliente</p>
                        <p className="resumo-item mb-10">Modalidade Contrato</p>
                        <p className="resumo-item mb-10">Nº de parcelas</p>
                        <p className="resumo-item mb-10">Valor Financiado</p>
                        <p className="resumo-item mb-10">Taxa média BACEN</p>
                        <p className="resumo-item mb-10">Taxa praticada</p>
                        <p className="resumo-item mb-10">Valor da 1ª parcela original</p>
                        <p className="resumo-item mb-10">Valor da 1ª parcela revisada</p>
                    </div>

                {Object.keys(reportData).length > 0 &&
                    <div className="col-xl-6" style={{paddingLeft: '75px'}}>
                        <p className="resumo-valor mb-10">&nbsp;{((props.formik.values.contract_customer && props.formik.values.contract_customer.name) ? props.formik.values.contract_customer.name : '')}</p>
                        <p className="resumo-valor mb-10">{((props.formik.values.contract_type && props.formik.values.contract_type.name) ? props.formik.values.contract_type.name : '')}</p>
                        <p className="resumo-valor mb-10">{props.formik.values.contract_installments}</p>
                        <p className="resumo-valor mb-10">R$ {FloatToCurrency(props.formik.values.contract_value)}</p>
                        <p className="resumo-valor mb-10">{reportData.bacen_average_interest_monthly}%</p>
                                    
                        <p className="resumo-valor mb-10">{reportData.contract_interest_rate_monthly}%
                        { reportData.contract_interest_rate_monthly < reportData.bacen_average_interest_monthly &&
                            <span class="ml-3 label label-inline label-danger font-weight-bold">Contrato abaixo da taxa média BACEN</span>
                        }
                        { reportData.contract_interest_rate_monthly > reportData.bacen_average_interest_monthly &&
                            <span class="ml-3 label label-inline label-success font-weight-bold">Contrato acima da taxa média BACEN</span>
                        }
                        { reportData.contract_interest_rate_monthly == reportData.bacen_average_interest_monthly &&
                            <span class="ml-3 label label-inline label-dark-primary font-weight-bold">Contrato igual à taxa média BACEN</span>
                        }
                        </p> 
                        <p className="resumo-valor mb-10">R$ {FloatToCurrency(reportData.contract_installment_amount)}</p>
                        <p className="resumo-valor mb-10">R$ {FloatToCurrency(reportData.calculation_installment_adjusted)}</p>        
                    </div>
                }
                </div>
            </div>
            <div className="col-xl-4">
                

                    <div className="card-success d-flex flex-column">
                        <p className="font-semibold opacity-70" style={{marginBottom: '4px'}}>TIPO DA AÇÃO</p>
                        <h2 className="font-bold">{reportData.type == 'receivable' ? 'A RECEBER' : 'A PAGAR'}</h2>
                    { reportData.type == 'receivable' &&
                        <p className="subtitulo font-medium mb-0">Neste caso, com o recálculo do contrato com a { props.formik.values.own_average_interest ? 'taxa de juros informada' : 'taxa média BACEN' }, o cliente terá direito a parar de pagar as parcelas e terá direito a receber o valor de R$ {FloatToCurrency(Math.abs(reportData.calculation_difference))}.</p>
                    }
                    { reportData.type == 'payable' &&
                        <p className="subtitulo font-medium mb-0">Neste caso, o cliente ainda não quitou o saldo recalculado pela { props.formik.values.own_average_interest ? 'taxa de juros informada' : 'taxa média BACEN' }, necessitando pagar o montante de R$ {FloatToCurrency(Math.abs(reportData.calculation_difference))}, podendo ser dividido em até {reportData.calculation_remaining_installments} parcelas.</p>
                    }
                
                </div>
                
                
            </div>
        </div>
        <button type="button" onClick={() => props.setStep(props.step-1)} className="btn btn-cinza mb-10" style={{width: '200px'}}>VOLTAR</button>


        <div className="hr mb-10"></div>
       
        <h3 className="primary font-bold">Escolha alguns relatórios disponíveis</h3>
        <p className="mb-10" style={{color: '#2e3f75', opacity: 0.6, fontSize: '14px'}}>Clique nos ícones abaixo para escolher um relatório e realizar o download.</p>

        <div className="row">
            <Report className="col-xl-3 d-flex" onClick={openReportPdf}>
                <ReportIcon>
                    <i className="icon-2x text-dark-50 flaticon2-percentage"></i>
                </ReportIcon>
                <ReportDetails className="d-flex flex-column">
                    <ReportTitle>CÁLCULO COMPLETO</ReportTitle>
                </ReportDetails>
            </Report>
        { ((reportData.contract_interest_rate_monthly > reportData.bacen_average_interest_monthly) && !props.formik.values.own_average_interest) &&
        <>
            <Report className="col-xl-3 d-flex" onClick={openPetition}>
                <ReportIcon>
                    <i className="icon-2x text-dark-50 flaticon2-document"></i>
                </ReportIcon>
                <ReportDetails className="d-flex flex-column">
                    <ReportTitle>PETIÇÃO COMPLETA</ReportTitle>
                </ReportDetails>                
            </Report>
            <Report className="col-xl-3 d-flex" onClick={openExpertReport}>
                <ReportIcon>
                    <i className="icon-2x text-dark-50 flaticon2-paper"></i>
                </ReportIcon>
                <ReportDetails className="d-flex flex-column">
                    <ReportTitle>PARECER TÉCNICO</ReportTitle>
                </ReportDetails>
            </Report>
        </>
        }
        </div>
    </div>
        
    </CSSTransition>
    );
}