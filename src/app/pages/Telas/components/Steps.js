import React from 'react';
import styled from 'styled-components';

const StepsContainer = styled.div`
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0px 13px 0px 13px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-bottom: 10px;
        justify-content: normal;

    }
`;

const Step = styled.div`
    display: flex;
    width: 20%;
    @media screen and (max-width: 768px) {
        margin-bottom: 10px;
        width: 100%;
    }
`;

export default function Steps(props) {
    return (
        <StepsContainer className="row">
            <Step className={(props.step == 0 ? '' : 'opacity-50')}>
                <div className="pointer" onClick={() => props.goToStep(0)}>
                    <div
                        className={"step " + ((props.step == 0 || props.step == 1 || props.step == 2 || props.step == 3 || props.step == 4) ? 'active' : '')}
                    >
                        <span>1</span>
                    </div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 1</span>
                    <span className="step-description">revisão dos dados</span>
                </div>
            </Step>

            <Step className={(props.step == 1 ? '' : 'opacity-50')}>
                <div className="pointer" onClick={() => props.goToStep(1)}>
                    <div
                        className={"step " + ((props.step == 1 || props.step == 2 || props.step == 3 || props.step == 4) ? 'active' : '')}
                    >
                        <span>2</span>
                    </div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 2</span>
                    <span className="step-description">calcular</span>
                </div>
            </Step>

            <Step className={(props.step == 2 ? '' : 'opacity-50')}>
                <div className="pointer" onClick={() => props.goToStep(2)}>
                    <div
                        className={"step " + ((props.step == 2 || props.step == 3 || props.step == 4) ? 'active' : '')}
                    >
                        <span>3</span>
                    </div>
                </div>
                <div className="step-info d-flex flex-column">
                    <span className="step-title">Passo 3</span>
                    <span className="step-description">relatórios</span>
                </div>
            </Step>
        </StepsContainer>
    );
}