import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import BlockUi from 'react-block-ui';
import FloatToCurrency from '../../../helpers/FloatToCurrency';
import { format, parseISO } from 'date-fns';
import * as auth from "../../../modules/Auth/_redux/authRedux";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide,
} from "@material-ui/core";

const Transition3 = React.forwardRef(function Transition5(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Financeiro(props) {
    const dispatch = useDispatch();
    const subscription_status = useSelector(state => state.subscription.subscription_status);
    const is_subscription_status_loading = useSelector(state => state.subscription.is_subscription_status_loading);
    const is_cancelling = useSelector(state => state.subscription.is_cancelling);
    const list_status = [
        { id: 'paid', text: 'Ativo' },
        { id: 'unpaid', text: 'Pagamento Pendente' },
        { id: 'canceled', text: 'Cancelado' },
        { id: 'trialing', text: 'Período de Teste' },
        { id: 'pending_payment', text: 'Pagamento Pendente' },
    ];
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    const upgradeModal = () => {
        let title;
        let subtitle;
        if (subscription_status.info.status == 'canceled') {
            title = 'Reativar plano';
            subtitle = 'Basta escolher um plano para reativar agora mesmo.';
        } else {
            title = 'Upgrade de plano';
            subtitle = 'Basta escolher um plano para realizar o upgrade agora mesmo.';
        }

        dispatch({
            type: 'SET_MODAL_SUBSCRIPTION',
            payload: {
                visible: true,
                title: title,
                subtitle: subtitle,
            }
        });

    }

    const cancelarModal = () => {
        setCancelModalOpen(true);
    }

    const confirmarCancelamento = () => {
        dispatch({
            type: 'CANCEL_SUBSCRIPTION', payload: {
                callback: () => {
                    setCancelModalOpen(false);
                }
            }
        });
    }

    return (
        <BlockUi tag="div" blocking={is_subscription_status_loading || is_cancelling}>
            {(Object.keys(subscription_status).length > 0 && subscription_status.info.has_error) &&
                <h1 className="azul-cabecalho">Não foi possível validar o seu cartão de crédito.</h1>
            }

            {(Object.keys(subscription_status).length > 0 && !subscription_status.info.has_error) &&
                <>
                    <div className="row mb-5">
                        <div className="col-3 oportunidade border">
                            <span className="title">PLANO CONTRATADO</span>
                            <p className="valueAction">{subscription_status.info.plan}</p>

                            <p className="value">Status: <strong>{list_status.find(status => status.id == subscription_status.info.status).text}</strong></p>
                            <p className="value">Valor: <strong>R$ {FloatToCurrency(subscription_status.info.plan_amount)}</strong></p>

                            <span className="title">INÍCIO DO PERÍODO</span>
                            <p className="value">{format(parseISO(subscription_status.info.current_period_start), 'dd/MM/yyyy HH:mm')}</p>

                            <span className="title">FIM DO PERÍODO</span>
                            <p className="value">{format(parseISO(subscription_status.info.current_period_end), 'dd/MM/yyyy HH:mm')}</p>
                            <hr />
                            <p className="fontBold">FORMA DE PAGAMENTO</p>
                            <p>
                                <i className="icon-md fas fa-credit-card"></i>
                                <span className="ml-1">{subscription_status.info.payment_method == 'credit_card' ? 'CARTÃO DE CRÉDITO' : 'BOLETO'}</span>
                            </p>
                            {subscription_status.info.payment_method == 'credit_card' &&
                                <>
                                    <p className="tipo-campo">BANDEIRA DO CARTÃO</p>
                                    <p className="campo">{subscription_status.info.card_brand.toUpperCase()} </p>
                                    <p className="tipo-campo">ÚLTIMOS DIGITOS DO CARTÃO</p>
                                    <p className="campo">{subscription_status.info.card_last_digits}</p>
                                </>
                            }
                            <hr />
                            {Object.keys(subscription_status).length > 0 &&
                                <button type="button" className="btn btn-secondary btnDefault" onClick={upgradeModal}>{(subscription_status.info.has_error || subscription_status.info.status == 'canceled') ? 'REATIVAR PLANO' : 'UPGRADE DE PLANO'}</button>
                            }
                            <br /><br />
                            {subscription_status.info.status != 'canceled' &&
                                <button type="button" className="btn btn-danger btnDefault" onClick={cancelarModal}>CANCELAR PLANO</button>
                            }
                            <br /><br /><br />
                        </div>
                    </div>


                    <Dialog
                        open={cancelModalOpen}
                        TransitionComponent={Transition3}
                        keepMounted
                        onClose={() => setCancelModalOpen(false)}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <BlockUi tag="div" blocking={is_subscription_status_loading || is_cancelling}>

                            <DialogTitle id="alert-dialog-slide-title">
                                {"Vai realmente nos deixar?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Esta ação é irreversível, confirme no botão abaixo se deseja cancelar.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <button type="button" className="btn btn-secondary" onClick={() => setCancelModalOpen(false)}>VOLTAR</button>
                                <button type="button" className="btn btn-danger" onClick={confirmarCancelamento}>SIM, DESEJO CANCELAR.</button>
                            </DialogActions>
                        </BlockUi>
                    </Dialog>
                </>
            }


        </BlockUi>
    );
}
