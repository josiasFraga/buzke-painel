import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from "axios";
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    loading_request_reset: false,
    request_reset_data: {},
    loading_reset_password: false,
    reset_password_data: {},
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REQUEST_RESET_PASSWORD_SUCCESS':
            return { ...state, request_reset_data: action.payload, loading_request_reset: false }
        case 'REQUEST_RESET_PASSWORD_FAILED':
            return { ...state, request_reset_data: {}, loading_request_reset: false }
        case 'REQUEST_RESET_PASSWORD':
            return { ...state, request_reset_data: {}, loading_request_reset: true }
        case 'RESET_PASSWORD_SUCCESS':
            return { ...state, reset_password_data: action.payload, loading_reset_password: false }
        case 'RESET_PASSWORD_FAILED':
            return { ...state, reset_password_data: {}, loading_reset_password: false }
        case 'RESET_PASSWORD':
            return { ...state, reset_password_data: {}, loading_reset_password: true }
        default:
            return state;
    }
}

function* requestResetPassword({payload}) { 
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/auth/request_reset`, payload.data);
        yield put({type: 'REQUEST_RESET_PASSWORD_SUCCESS', payload: response.data});
        payload.callback();
    } catch {
        yield put({type: 'REQUEST_RESET_PASSWORD_FAILED'});
        toast.error('Ocorreu um erro ao tentar resetar sua senha.');
    }
}

function* resetPassword({payload}) { 
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/auth/reset_password`, payload.data);
        yield put({type: 'RESET_PASSWORD_SUCCESS', payload: response.data});
    } catch {
        yield put({type: 'RESET_PASSWORD_FAILED'});
        toast.error('Ocorreu um erro ao tentar resetar sua senha.');
    }
}

export function* saga() {
    yield takeLatest('REQUEST_RESET_PASSWORD', requestResetPassword);
    yield takeLatest('RESET_PASSWORD', resetPassword);
}