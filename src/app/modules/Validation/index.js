import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlockUi from 'react-block-ui';
import styled from 'styled-components';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SvgSuccess from '../../../app/components/SvgAnimations/Success.js';
import SvgError from '../../../app/components/SvgAnimations/Error.js';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 100vh;
    width: 80%;
    margin: 0 auto;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    padding-top: 60px;

    img {
        width: 100px;
        margin: 0 auto;
    }
`;

const Waiting = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 92vh;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    @media only screen and (max-height:599px) {
        height: 90vh;
    }
`;

function _SvgComponent() {
    const response = useSelector(state => state.app.account_activation_response);

    if (response.success) {
        return <SvgSuccess />;
    }
    return <SvgError />
}

export default function Validation(props) {
    const dispatch = useDispatch();
    const is_activating_account = useSelector(state => state.app.is_activating_account);
    const account_activation_response = useSelector(state => state.app.account_activation_response);
    useEffect(() => {
        dispatch({type: 'ACTIVATE_ACCOUNT', payload: {token: props.match.params.token}});
    }, []);

    return (
        <BlockUi tag="div" blocking={is_activating_account}>
            <Container>
                <Logo>
                    <img src={toAbsoluteUrl("/media/logo-jusfy.svg")} />
                </Logo>

            { Object.keys(account_activation_response).length > 0 &&
            <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <_SvgComponent />
                { account_activation_response.success &&
                    <>
                    <h1 style={{marginBottom: '20px', color: '#41C78F'}}>Sua conta foi ativada com sucesso!</h1>
                    <Link to="/">
                        <button style={{width: '400px'}} className="btn btn-primary">ACESSAR A PLATAFORMA</button>
                    </Link>

                    </>
                }
                { !account_activation_response.success &&
                    <h1 style={{color: '#F64E60'}}>{account_activation_response.msg}</h1>
                }
            </div>
            }
            { Object.keys(account_activation_response).length == 0 &&
                <Waiting>
                    <h1>Estamos ativando a sua conta..</h1>
                </Waiting>

            }
            </Container>
        
        </BlockUi>
        
    );
}