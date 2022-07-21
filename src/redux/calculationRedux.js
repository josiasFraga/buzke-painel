import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from "axios";
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    calculation: {},
    calculation_loading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_CALCULATION_FAILED':
            return { ...state, calculation: INITIAL_STATE.calculation, calculation_loading: false }
        case 'LOAD_CALCULATION_SUCCESS':
            return { ...state, calculation: action.payload, calculation_loading: false }
        case 'LOAD_CALCULATION':
            return { ...state, calculation: INITIAL_STATE.calculation, calculation_loading: true }
        default:
            return state;
    }
}

function* loadCalculation({payload}) {
    if (payload.id == '') {
        yield put({type: 'LOAD_CALCULATION_SUCCESS', payload: {}});
        return;
    }

    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/calculations/${payload.id}`, payload);
        if (!response.data.success) {
            yield put({type: 'LOAD_CALCULATION_FAILED'});
            return;
        }
        yield put({type: 'LOAD_CALCULATION_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_CALCULATION_FAILED'});
        toast.error('Ocorreu um erro ao carregar este cálculo, tente novamente.');
    }
}

export function* saga() {
    yield takeLatest('LOAD_CALCULATION', loadCalculation);
}