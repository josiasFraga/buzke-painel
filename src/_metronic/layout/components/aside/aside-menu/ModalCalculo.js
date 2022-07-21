import React from "react";
import { useSelector } from 'react-redux';
import { Modal } from "react-bootstrap";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers/AssetsHelpers";

const ButtonClose = styled.div`
    background: #41C78F; display: inline-block; padding: 10px 17px; position: absolute; top: -15px; right: -15px; color:#fff; font-weight: bold; border-radius: 50px;

    :hover {
        cursor: pointer; background: #3ab380;
    }
`;

const ResponsiveModal = styled(Modal)`
    .modal-body {
        padding: 40px !important;
    }

    .modal-content {
        border-radius: 10px !important;
    }

    .modal-dialog {
        max-width: 700px !important;
    }


    @media screen and (max-width: 767px) {
        .modal-content {
            width: 90% !important;
            margin: 0 auto !important;
        }
    }
`;

const Content = styled.div`
    img { margin-bottom: 5px }
    img.jusrevisional { width: 130px; }
    img.juscalc { width: 75px; }
`;

const ButtonContainer = styled.div`
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0px;

    button {
        width: 150px !important;
    }
`;

export default function ModalCalculo(props) {
    const user = useSelector((state) => state.auth.user);
    const unlocked_users = useSelector((state) => state.app.unlocked_users);
    

    return (
        <ResponsiveModal
            show={props.isOpen}
            onHide={props.close}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <ButtonClose onClick={props.close}>X</ButtonClose>

                <Content>
                    { user && user.email && unlocked_users.includes(user.email) &&
                    <>
                        <div className="row mb-5 tour-juscalc-prev">
                                <div className="col-md-8 col-6 d-flex flex-column">
                                    <Link to="/calculadora_cnis" onClick={props.close} style={{textDecoration: 'none'}}>
                                        <img src={toAbsoluteUrl('/media/logos/jusprev.svg')} className="juscalc" />
                                    </Link>
                                    
                                    <span><span className="text-danger" style={{fontWeight: 'bold', fontSize: '11px', lineHeight: '1'}}><i className="flaticon2-speaker text-danger"></i> &nbsp;&nbsp;Versão atualizada para a revisão da vida toda. 10/03/2022.</span></span>
                                    <span>Calculadora previdenciária.</span>
                                    
                                </div>
                                <ButtonContainer className="col-md-4 col-6">
                                    <Link to="/calculadora_cnis" onClick={props.close}>
                                        <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                                    </Link>
                                </ButtonContainer>
                            </div>
                            <div className="hr mb-5"></div>
                        </>
                    }

                    <div className="row mb-5 tour-revisional">
                        <div className="col-md-8 col-6 d-flex flex-column ">
                            <Link to="/revisional" onClick={props.close}>
                                <img className="jusrevisional" src={toAbsoluteUrl('/media/jusrevisional.svg')} />
                            </Link>
                            <span>Ferramenta de cálculo revisional, que automaticamente recalcula o contrato bancário com base na taxa média do BACEN. Além disso, gera automaticamente petição inicial e parecer do cálculo.</span>
                        </div>
                        <ButtonContainer className="col-md-4 col-6">
                            <Link to="/revisional" onClick={props.close}>
                                <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                            </Link>
                        </ButtonContainer>
                    </div>
                    <div className="hr mb-5"></div>
                    <div className="row mb-5 tour-juscalc-simples">
                        <div className="col-md-8 col-6 d-flex flex-column">
                            <Link to="/atualizacao" onClick={props.close}>
                                <img src={toAbsoluteUrl('/media/logos/juscalc.svg')} className="juscalc" />
                                <span style={{position: 'absolute', fontSize: '10px', marginLeft: '-29px', marginTop: '20px', fontWeight: 'bold', color: '#828cad'}}>FÁCIL</span>

                            </Link>
                            <span style={{paddingTop: '8px'}}>Calculadora rápida e simples de atualização e juros</span>
                        </div>
                        <ButtonContainer className="col-md-4 col-6">
                            <Link to="/atualizacao" onClick={props.close}>
                                <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                            </Link>
                        </ButtonContainer>
                    </div>
                    <div className="hr mb-5"></div>
                    <div className="row mb-5 tour-juscalc-completo">
                        <div className="col-md-8 col-6 d-flex flex-column">
                            <Link to="/atualizacao_completo" onClick={props.close}>
                                <img src={toAbsoluteUrl('/media/logos/juscalc.svg')} className="juscalc" />
                                <span style={{position: 'absolute', fontSize: '10px', marginLeft: '-55px', marginTop: '20px', fontWeight: 'bold', color: '#828cad'}}>COMPLETO</span>

                            </Link>
                            <span style={{paddingTop: '8px'}}>Calculadora completa para todo tipo de cálculo, com a possibilidade de aplicação de vários índices e juros. Exemplo: Liquidação de sentença </span>
                        </div>
                        <ButtonContainer className="col-md-4 col-6">
                            <Link to="/atualizacao_completo" onClick={props.close}>
                                <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                            </Link>
                        </ButtonContainer>
                    </div>
                    <div className="hr mb-5"></div>
                    <div className="row mb-5 tour-juscalc-fgts">
                        <div className="col-md-8 col-6 d-flex flex-column">
                            <Link to="/fgts" onClick={props.close} style={{textDecoration: 'none'}}>
                                <img src={toAbsoluteUrl('/media/logos/juscalc.svg')} className="juscalc" />
                                <span style={{position: 'absolute', fontSize: '10px', marginLeft: '-25px', marginTop: '20px', fontWeight: 'bold', color: '#828cad'}}>FGTS</span>

                            </Link>
                            <span style={{paddingTop: '8px'}}>Calculadora automática da revisão do FGTS. </span>
                        </div>
                        <ButtonContainer className="col-md-4 col-6">
                            <Link to="/fgts" onClick={props.close}>
                                <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                            </Link>
                        </ButtonContainer>
                    </div>

                    <div className="hr mb-5"></div>
                    <div className="row mb-5 tour-juscalc-pensao">
                        <div className="col-md-8 col-6 d-flex flex-column">
                            <Link to="/pensao" onClick={props.close} style={{textDecoration: 'none'}}>
                                <img src={toAbsoluteUrl('/media/logos/juscalc.svg')} className="juscalc" />
                                <span style={{position: 'absolute', fontSize: '10px', marginLeft: '-41px', marginTop: '20px', fontWeight: 'bold', color: '#828cad'}}>PENSÃO</span>

                            </Link>
                            <span style={{paddingTop: '8px'}}>Calculadora automática de pensão alimentícia. </span>
                        </div>
                        <ButtonContainer className="col-md-4 col-6">
                            <Link to="/pensao" onClick={props.close}>
                                <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                            </Link>
                        </ButtonContainer>
                    </div>

                    <div className="hr mb-5"></div>
                    <div className="row mb-5 tour-juscalc-aluguel">
                        <div className="col-md-8 col-6 d-flex flex-column">
                            <Link to="/aluguel" onClick={props.close} style={{textDecoration: 'none'}}>
                                <img src={toAbsoluteUrl('/media/logos/juscalc.svg')} className="juscalc" />
                                <span style={{position: 'absolute', fontSize: '10px', marginLeft: '-41px', marginTop: '20px', fontWeight: 'bold', color: '#828cad'}}>ALUGUEL</span>

                            </Link>
                            <span style={{paddingTop: '8px'}}>Calculadora automática de aluguel. </span>
                        </div>
                        <ButtonContainer className="col-md-4 col-6">
                            <Link to="/aluguel" onClick={props.close}>
                                <button type="button" className="btn btn-primary">NOVO CÁLCULO</button>
                            </Link>
                        </ButtonContainer>
                    </div>




                    <div className="hr"></div>
                    


                </Content>
          </Modal.Body>
          </ResponsiveModal>
    );
}
