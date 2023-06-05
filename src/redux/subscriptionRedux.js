import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from "axios";
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    subscription_status: {},
    is_subscription_status_loading: false,
    is_cancelling: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_SUBSCRIPTION_STATUS_SUCCESS':
            return { ...state, subscription_status: action.payload, is_subscription_status_loading: false }
        case 'LOAD_SUBSCRIPTION_STATUS_FAILED':
            return { ...state, subscription_status: INITIAL_STATE.subscription_status, is_subscription_status_loading: false }
        case 'LOAD_SUBSCRIPTION_STATUS':
            return { ...state, subscription_status: INITIAL_STATE.subscription_status }
        case 'CANCEL_SUBSCRIPTION':
            return { ...state, is_cancelling: true }
        case 'CANCEL_SUBSCRIPTION_SUCCESS':
            return { ...state, is_cancelling: false }
        case 'CANCEL_SUBSCRIPTION_FAILED':
            return { ...state, is_cancelling: false }
    
        default:
            return state;
    }
}

function* cancelSubscription({payload}) { 
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/subscription/cancel`, payload);
        if (!response.data.success) {
            yield put({type: 'CANCEL_SUBSCRIPTION_FAILED'});
            return;
        }
        yield put({type: 'CANCEL_SUBSCRIPTION_SUCCESS', payload: response.data.data});
        yield put({type: 'LOAD_SUBSCRIPTION_STATUS'});
        toast.success('Seu plano foi cancelado com sucesso.');
    } catch {
        yield put({type: 'CANCEL_SUBSCRIPTION_FAILED'});
        toast.error('Ocorreu um erro ao cancelar o seu plano, por favor, tente novamente mais tarde.');
    }
    payload.callback();
}

function* loadSubscriptionStatus({payload}) { 
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/subscription`, payload);
        if (!response.data.success) {
            yield put({type: 'LOAD_SUBSCRIPTION_STATUS_FAILED'});
            return;
        }
        yield put({type: 'LOAD_SUBSCRIPTION_STATUS_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_SUBSCRIPTION_STATUS_FAILED'});
        toast.error('Ocorreu um erro ao carregar os seus dados.');
    }
}


function* createSubscription({payload}) { 
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/subscription/create`, payload.values);
        if (!response.data.success) {
            toast.error(response.data.msg);
            payload.setSubmitting(false);
            return;
        }
        toast.success('Assinatura realizada com sucesso!');
        payload.callback();
        payload.setSubmitting(false);
        // yield put({type: 'LOAD_SUBSCRIPTION_STATUS_SUCCESS', payload: response.data.data});
    } catch {
        // yield put({type: 'LOAD_SUBSCRIPTION_STATUS_FAILED'});
        toast.error('Ocorreu um erro, por favor, tente novamente.');
        payload.setSubmitting(false);
    }
}


export function* saga() {
    yield takeLatest('LOAD_SUBSCRIPTION_STATUS', loadSubscriptionStatus);
    yield takeLatest('CREATE_SUBSCRIPTION', createSubscription);
    yield takeLatest('CANCEL_SUBSCRIPTION', cancelSubscription);
}