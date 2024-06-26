import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from "axios";
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    dashboard: {},
    modal_subscription: {
        visible: false,
        title: '',
        subtitle: ''
    },
    is_dashboard_loading: false,

    person_types: [
        {id: 'pf', name: 'Pessoa Física'},
        {id: 'pj', name: 'Pessoa Jurídica'}
    ],

    notifications: [],
    notifications_not_read: 0,
    is_notifications_loading: false,

    customers: [],
    is_customers_loading: false,
    is_customer_deleting: true,
    customers_list: [],
    is_customers_list_loading: false,

    ufs: [],
    is_ufs_loading: false,

    cities: [],
    is_cities_loading: false,

    address_by_postal_code: [],
    is_address_by_postal_code_loading: false,

    courts_services: [],
    is_courts_services_loading: false,

    schedules: [],
    is_schedules_loading: false,

    available_schedules: [],
    is_available_schedules_loading: false,

    business_configs: {},
    is_business_configs_loading: false,

    scheduling_data: {},
    is_scheduling_data_loading: false,

    tournaments: [],
    is_tournaments_loading: false,

    padel_categories: [],
    is_padel_categories_loading: false,

    is_canceling_tournament: false,

    products_categories: [],
    is_products_categories_loading: false,

    products: [],
    is_products_loading: false,

    product_aditionals: [],
    is_product_aditionals_loading: false,

    tables: [],
    is_tables_loading: false,
    table: [],

    bills: [],
    is_bills_loading: false,

    pos: [],
    is_pos_loading: false,

    service_data_to_scheduling: {},
    is_service_data_to_scheduling_loading: false,

    professionals: [],
    is_professionals_loading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
                
        case 'LOAD_DASHBOARD':
            return { ...state, dashboard: INITIAL_STATE.dashboard, is_dashboard_loading: true }
        case 'LOAD_DASHBOARD_SUCCESS':
            return { ...state, dashboard: action.payload, is_dashboard_loading: false }
        case 'LOAD_DASHBOARD_FAILED':
            return { ...state, dashboard: INITIAL_STATE.dashboard, is_dashboard_loading: false }
            
        case 'SET_NOTIFICATIONS_LOADING':
            return { ...state, is_notifications_loading: action.payload  }
        case 'LOAD_NOTIFICATIONS_SUCCESS':
            return { ...state, notifications: action.payload.notifications, is_notifications_loading: false, notifications_not_read: action.payload.n_not_read }
        case 'LOAD_NOTIFICATIONS_FAILED':
            return { ...state, notifications: [], is_notifications_loading: false, notifications_not_read: 0 }
        case 'SET_RENT_INSTALLMENTS':
            return { ...state, rent_installments: action.payload.installments, rent_contract_indexes: action.payload.indexes }

        case 'LOAD_CUSTOMERS':
            return { ...state, customers: INITIAL_STATE.customers, is_customers_loading: true }
        case 'LOAD_CUSTOMERS_SUCCESS':
            return { ...state, customers: action.payload, is_customers_loading: false }
        case 'LOAD_CUSTOMERS_FAILED':
            return { ...state, customers: INITIAL_STATE.customers, is_customers_loading: false }
        case 'LOAD_CUSTOMERS_LIST':
            return { ...state, customers_list: INITIAL_STATE.customers, is_customers_list_loading: true }
        case 'LOAD_CUSTOMERS_LIST_SUCCESS':
            return { ...state, customers_list: action.payload, is_customers_list_loading: false }
        case 'LOAD_CUSTOMERS_LIST_FAILED':
            return { ...state, customers_list: INITIAL_STATE.customers_list, is_customers_list_loading: false }
        case 'LOAD_UFS':
            return { ...state, ufs: INITIAL_STATE.ufs, is_ufs_loading: true }
        case 'LOAD_UFS_SUCCESS':
            return { ...state, ufs: action.payload, is_ufs_loading: false }
        case 'LOAD_UFS_FAILED':
            return { ...state, ufs: INITIAL_STATE.ufs, is_ufs_loading: false }
        case 'LOAD_CITIES':
            return { ...state, cities: INITIAL_STATE.cities, is_cities_loading: true }
        case 'LOAD_CITIES_SUCCESS':
            return { ...state, cities: action.payload, is_cities_loading: false }
        case 'LOAD_CITIES_FAILED':
            return { ...state, cities: INITIAL_STATE.cities, is_cities_loading: false }
        case 'LOAD_ADDRESS_BY_POSTAL_CODE':
            return { ...state, address_by_postal_code: INITIAL_STATE.address_by_postal_code, is_address_by_postal_code_loading: true }
        case 'LOAD_ADDRESS_BY_POSTAL_CODE_SUCCESS':
            return { ...state, address_by_postal_code: action.payload, is_address_by_postal_code_loading: false }
        case 'LOAD_ADDRESS_BY_POSTAL_CODE_FAILED':
            return { ...state, address_by_postal_code: INITIAL_STATE.cities, is_address_by_postal_code_loading: false }
        case 'LOAD_COURTS_SERVICES':
            return { ...state, courts_services: INITIAL_STATE.courts_services, is_courts_services_loading: true }
        case 'LOAD_COURTS_SERVICES_SUCCESS':
            return { ...state, courts_services: action.payload, is_courts_services_loading: false }
        case 'LOAD_COURTS_SERVICES_FAILED':
            return { ...state, courts_services: INITIAL_STATE.cities, is_courts_services_loading: false }
        case 'DELETE_CUSTOMER':
            return { ...state, is_customer_deleting: true }
        case 'DELETE_CUSTOMER_SUCCESS':
            return { ...state, is_customer_deleting: false }
        case 'DELETE_CUSTOMER_FAILED':
            return { ...state, is_customer_deleting: false }
        case 'LOAD_SCHEDULES':
            return { ...state, schedules: INITIAL_STATE.schedules, is_schedules_loading: true }
        case 'LOAD_SCHEDULES_SUCCESS':
            return { ...state, schedules: action.payload, is_schedules_loading: false }
        case 'LOAD_SCHEDULES_FAILED':
            return { ...state, schedules: INITIAL_STATE.cities, is_schedules_loading: false }

        case 'LOAD_AVAILABLE_SCHEDULES':
            return { ...state, available_schedules: INITIAL_STATE.schedules, is_available_schedules_loading: true }
        case 'LOAD_AVAILABLE_SCHEDULES_SUCCESS':
            return { ...state, available_schedules: action.payload, is_available_schedules_loading: false }
        case 'LOAD_AVAILABLE_SCHEDULES_FAILED':
            return { ...state, available_schedules: INITIAL_STATE.cities, is_available_schedules_loading: false }

        case 'LOAD_BUSINESS_CONFIGS':
            return { ...state, business_configs: INITIAL_STATE.business_configs, is_business_configs_loading: true }
        case 'LOAD_BUSINESS_CONFIGS_SUCCESS':
            return { ...state, business_configs: action.payload, is_business_configs_loading: false }
        case 'LOAD_BUSINESS_CONFIGS_FAILED':
            return { ...state, business_configs: INITIAL_STATE.business_configs, is_business_configs_loading: false }

        case 'LOAD_SCHEDULING_DATA':
            return { ...state, scheduling_data: INITIAL_STATE.scheduling_data, is_scheduling_data_loading: true }
        case 'LOAD_SCHEDULING_DATA_SUCCESS':
            return { ...state, scheduling_data: action.payload, is_scheduling_data_loading: false }
        case 'LOAD_SCHEDULING_DATA_FAILED':
            return { ...state, scheduling_data: action.payload, is_scheduling_data_loading: false }

        case 'LOAD_TOURNAMENTS':
            return { ...state, tournaments: INITIAL_STATE.tournaments, is_tournaments_loading: true }
        case 'LOAD_TOURNAMENTS_SUCCESS':
            return { ...state, tournaments: action.payload, is_tournaments_loading: false }
        case 'LOAD_TOURNAMENTS_FAILED':
            return { ...state, tournaments: INITIAL_STATE.tournaments, is_tournaments_loading: false }

        case 'LOAD_PADEL_CATEGORIES':
            return { ...state, padel_categories: INITIAL_STATE.padel_categories, is_padel_categories_loading: true }
        case 'LOAD_PADEL_CATEGORIES_SUCCESS':
            return { ...state, padel_categories: action.payload, is_padel_categories_loading: false }
        case 'LOAD_PADEL_CATEGORIES_FAILED':
            return { ...state, padel_categories: INITIAL_STATE.padel_categories, is_padel_categories_loading: false }

        case 'GET_SERVICE_DATA_TO_SCHEDULING':
            return {...state, service_data_to_scheduling: {}, is_service_data_to_scheduling_loading: true};
        case 'GET_SERVICE_DATA_TO_SCHEDULING_SUCCESS':
            return {...state, service_data_to_scheduling: action.payload, is_service_data_to_scheduling_loading: false};
        case 'GET_SERVICE_DATA_TO_SCHEDULING_FAILED':
            return {...state, service_data_to_scheduling: {}, is_service_data_to_scheduling_loading: false};

        case 'CANCEL_TOURNAMENT':
            return { ...state, is_canceling_tournament: true }
        case 'CANCEL_TOURNAMENT_SUCCES':
            return { ...state, is_canceling_tournament: false }
        case 'CANCEL_TOURNAMENT_FAILED':
            return { ...state, is_canceling_tournament: false }

        case 'LOAD_PRODUCTS_CATEGORIES':
            return { ...state, is_products_categories_loading: true }
        case 'LOAD_PRODUCTS_CATEGORIES_SUCCESS':
            return { ...state, products_categories: action.payload, is_products_categories_loading: false }
        case 'LOAD_PRODUCTS_CATEGORIES_FAILED':
            return { ...state, is_products_categories_loading: false }

        case 'LOAD_PRODUCTS':
            return { ...state, is_products_loading: true }
        case 'LOAD_PRODUCTS_SUCCESS':
            return { ...state, products: action.payload, is_products_loading: false }
        case 'LOAD_PRODUCTS_FAILED':
            return { ...state, is_products_loading: false }

        case 'LOAD_PRODUCTS_ADITIONALS':
            return { ...state, product_aditionals: [], is_product_aditionals_loading: true }
        case 'LOAD_PRODUCTS_ADITIONALS_SUCCESS':
            return { ...state, product_aditionals: action.payload, is_product_aditionals_loading: false }
        case 'LOAD_PRODUCTS_ADITIONALS_FAILED':
            return { ...state, product_aditionals: [], is_product_aditionals_loading: false }

        case 'LOAD_TABLES':
            return { ...state, is_tables_loading: true }
        case 'LOAD_TABLES_SUCCESS':
            return { ...state, tables: action.payload, is_tables_loading: false }
        case 'LOAD_TABLES_FAILED':
            return { ...state, is_tables_loading: false }

        case 'LOAD_TABLE':
            return { ...state, table: [], is_tables_loading: true }

        case 'LOAD_BILLS':
            return { ...state, is_bill_loading: true }
        case 'LOAD_BILLS_SUCCESS':
            return { ...state, bills: action.payload, is_bills_loading: false }
        case 'LOAD_BILLS_FAILED':
            return { ...state, is_bills_loading: false }

        case 'LOAD_POS':
            return { ...state, is_pos_loading: true }
        case 'LOAD_POS_SUCCESS':
            return { ...state, pos: action.payload, is_pos_loading: false }
        case 'LOAD_POS_FAILED':
            return { ...state, is_pos_loading: false }

        case 'GET_PROFESSIONALS':
            return {...state, professionals: [], is_professionals_loading: true};
        case 'GET_PROFESSIONALS_SUCCESS':
            return {...state, professionals: action.payload, is_professionals_loading: false};
        case 'GET_PROFESSIONALS_FAILED':
            return {...state, professionals: [], is_professionals_loading: false};

        default:
            return state;
    }
}


function* loadDashboard({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/dashboard`, {});
        yield put({type: 'LOAD_DASHBOARD_SUCCESS', payload: response.data.data});
    } catch (err) {
        yield put({type: 'LOAD_DASHBOARD_FAILED'});
    }
}


//Josias

function* loadNotifications({payload}) {
    yield put({type: 'SET_NOTIFICATIONS_LOADING', payload: true});
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/notifications/`);
        yield put({type: 'LOAD_NOTIFICATIONS_SUCCESS', payload: {notifications: response.data.notifications, n_not_read: response.data.n_not_read}});
    } catch {
        yield put({type: 'LOAD_NOTIFICATIONS_FAILED', payload: {notifications: [], n_not_read: 0}});
    }
}

function* setNotificationRead({payload}) {
    try {
        yield axios.post(process.env.REACT_APP_API_URL + `/notifications/saveRead/`, payload);
    } catch {
        yield put({type: 'LOAD_NOTIFICATIONS_FAILED', payload: {notifications: [], n_not_read: 0}});
    }
}

function* loadCustomers({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/clientes`, payload);
        
        yield put({type: 'LOAD_CUSTOMERS_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_CUSTOMERS_FAILED'});
    }
}

function* loadCustomersList({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/clientes_list`, payload);
        
        yield put({type: 'LOAD_CUSTOMERS_LIST_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_CUSTOMERS_LIST_FAILED'});
    }
}

function* loadUfs({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/estados/index`, payload);
        
        yield put({type: 'LOAD_UFS_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_UFS_FAILED'});
    }
}

function* loadCities({payload}) {
    try {
        if (payload.uf == '' || payload.uf == null) {
            yield put({type: 'LOAD_CITIES_SUCCESS', payload: []});
            return true;
        }
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/cidades/index/${payload.uf}/`, {});

        yield put({type: 'LOAD_CITIES_SUCCESS', payload: response.data.dados});
        if (payload.callback !== undefined) payload.callback(response.data.dados);
    } catch {
        yield put({type: 'LOAD_CITIES_FAILED'});
    }
}

function* loadAddressByPostalCode({payload}) {
    try {

        if ( payload == null ) {
            yield put({type: 'LOAD_ADDRESS_BY_POSTAL_CODE_SUCCESS', payload: []});
            return true;
        }

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/enderecos/buscaDadosCep/`, {params: {
            cep: payload
        }});

        yield put({type: 'LOAD_ADDRESS_BY_POSTAL_CODE_SUCCESS', payload: response.data.dados});
        if (payload.callback !== undefined) payload.callback(response.data.dados);
    } catch {
        yield put({type: 'LOAD_ADDRESS_BY_POSTAL_CODE_FAILED'});
    }
}

function* saveCustomer({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/ClientesClientes/cadastrar`;
        let msg_success = "Cliente salvo com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/ClientesClientes/alterar`;
            msg_success = "Cliente atualizado com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });
        payload.setSubmitting(false);
        toast.success(msg_success);
        payload.callback();
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar o cliente, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteCustomer({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/ClientesClientes/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });
        yield put({type: 'DELETE_CUSTOMER_SUCCESS', payload: []});
        toast.success("Cliente excluido com sucesso!");
        payload.callback();
    } catch {
        toast.error("Ocorreu um erro ao excluir o cliente, tente novamente.");
        yield put({type: 'DELETE_CUSTOMER_FAILED', payload: []});
    }
}

function* loadCourtServices({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/servicos/index`, payload);
        
        yield put({type: 'LOAD_COURTS_SERVICES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_COURTS_SERVICES_FAILED'});
    }
}

function* loadSchedules({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/agendamentos/empresa`, payload);
        
        yield put({type: 'LOAD_SCHEDULES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_SCHEDULES_FAILED'});
    }
}

function* loadAvailableSchedules({payload}) {
    try {
        if ( !payload.params.data || payload.params.data == "" ) {
            yield put({type: 'LOAD_AVAILABLE_SCHEDULES_SUCCESS', payload: []});
            return false;
        }
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/horariosDisponiveis`, payload);
        yield put({type: 'LOAD_AVAILABLE_SCHEDULES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_AVAILABLE_SCHEDULES_FAILED'});
    }
}

function* loadBusinessConfigs({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/dados`, payload);
        yield put({type: 'LOAD_BUSINESS_CONFIGS_SUCCESS', payload: response.data.dados.ClienteConfiguracao});
    } catch (e) {
        yield put({type: 'LOAD_BUSINESS_CONFIGS_FAILED'});
    }
}

function* saveScheduling({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/agendamentos/add`;
        let msg_success = "Agendamento salvo com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/agendamentos/alterar`;
            msg_success = "Agendamento atualizado com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        payload.setSubmitting(false);
        toast.success(msg_success);
        payload.callback();

    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar o agendamento, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* loadSchedulingData({payload}) {
    try {
        if ( payload.reset ) {
            yield put({type: 'LOAD_SCHEDULING_DATA_SUCCESS', payload: {}});
            return false;
        }
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/agendamentos/index`, payload);
        yield put({type: 'LOAD_SCHEDULING_DATA_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_SCHEDULING_DATA_FAILED'});
    }
}

function* cancelScheduling({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/agendamentos/excluir`;
        let msg_success = "Agendamento cancelado com sucesso!";


        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });


        toast.success(msg_success);
        payload.callback();

    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao cancelar o agendamento, tente novamente.");
    }
}

function* loadTournaments({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/torneios/index`, payload);
        
        yield put({type: 'LOAD_TOURNAMENTS_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_TOURNAMENTS_FAILED'});
    }
}

function* loadPadelCategories({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/padel/categorias`, payload);
        
        yield put({type: 'LOAD_PADEL_CATEGORIES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_PADEL_CATEGORIES_FAILED'});
    }
}

function* saveTournament({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/torneios/cadastrar`;
        let msg_success = "Torneio salvo com sucesso!";

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        payload.setSubmitting(false);
        toast.success(msg_success);
        payload.callback();

    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar o torneio, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* cancelTournament({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/torneios/cancela`;
        let msg_success = "Torneio cancelado com sucesso!";

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        toast.success(msg_success);
        payload.callback();

    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao cancelar o torneio, tente novamente.");
    }
}

function* loadProductsCategories({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/produtos-categorias/index`, payload);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'LOAD_PRODUCTS_CATEGORIES_SUCCESS', payload: response.data.data});
            } else {
                yield put({type: 'LOAD_PRODUCTS_CATEGORIES_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'LOAD_PRODUCTS_CATEGORIES_FAILED'});
            toast.error("Ocorreu um erro ao buscar as categorias dos produtos, tente novamente.");
        }
        
    } catch (e) {
        yield put({type: 'LOAD_PRODUCTS_CATEGORIES_FAILED'});
        toast.error("Ocorreu um erro ao buscar as categorias dos produtos, tente novamente.");
    }
}

function* saveProductCategory({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/produtos-categorias/cadastrar`;
        let msg_success = "Categoria salva com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/produtos-categorias/alterar`;
            msg_success = "Categoria atualizada com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(msg_success);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao salvar a categoria, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar a categoria, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteProductCategory({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/produtos-categorias/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(response.data.message);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Ocorreu um erro ao excluir a categoria, tente novamente.");
        }
    } catch {
        toast.error("Ocorreu um erro ao excluir a categoria, tente novamente.");
    }
}

function* loadProducts({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/produtos/index`, payload);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'LOAD_PRODUCTS_SUCCESS', payload: response.data.data});
            } else {
                yield put({type: 'LOAD_PRODUCTS_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'LOAD_PRODUCTS_FAILED'});
            toast.error("Ocorreu um erro ao buscar os produtos, tente novamente.");
        }
        
    } catch (e) {
        yield put({type: 'LOAD_PRODUCTS_FAILED'});
        toast.error("Ocorreu um erro ao buscar os produtos, tente novamente.");
    }
}

function* saveProduct({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/produtos/cadastrar`;
        let msg_success = "Produto salvo com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/produtos/alterar`;
            msg_success = "Produto atualizado com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {
                toast.success(msg_success);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao salvar o produto, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar o produto, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteProduct({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/produtos/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(response.data.message);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Ocorreu um erro ao excluir o produto, tente novamente.");
        }
    } catch {
        toast.error("Ocorreu um erro ao excluir o produto, tente novamente.");
    }
}

function* loadProductAditionals({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/produtos-adicionais/index`, payload);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'LOAD_PRODUCTS_ADITIONALS_SUCCESS', payload: response.data.data});
            } else {
                yield put({type: 'LOAD_PRODUCTS_ADITIONALS_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'LOAD_PRODUCTS_ADITIONALS_FAILED'});
            toast.error("Ocorreu um erro ao buscar os adicionais, tente novamente.");
        }
        
    } catch (e) {
        yield put({type: 'LOAD_PRODUCT_ADITIONALS_FAILED'});
        toast.error("Ocorreu um erro ao buscar os adicionais, tente novamente.");
    }
}

function* saveProductAditional({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/produtos-adicionais/cadastrar`;
        let msg_success = "Adicional salvo com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/produtos-adicionais/alterar`;
            msg_success = "Adicional atualizada com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {
                toast.success(msg_success);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao salvar o adicional, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar o adicional, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteProductAditional({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/produtos-adicionais/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(response.data.message);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Ocorreu um erro ao excluir o adicional, tente novamente.");
        }
    } catch {
        toast.error("Ocorreu um erro ao excluir o adicional, tente novamente.");
    }
}

function* loadTables({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/mesas/index`, payload);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'LOAD_TABLES_SUCCESS', payload: response.data.data});
            } else {
                yield put({type: 'LOAD_TABLES_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'LOAD_TABLES_FAILED'});
            toast.error("Ocorreu um erro ao buscar as mesas, tente novamente.");
        }
        
    } catch (e) {
        yield put({type: 'LOAD_TABLES_FAILED'});
        toast.error("Ocorreu um erro ao buscar as mesas, tente novamente.");
    }
}

function* loadTable({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/mesas/index`, payload.submitValues);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                if (  response.data.data.length == 0 ) {
                    toast.error("Mesa não cadastrada.");
                    payload.callbackNotFound();
                } else {
                    payload.callbackSuccess();
                }
            } else {
                toast.error(response.data.message);
                payload.callbackNotFound();
            }
        } else {
            toast.error("Ocorreu um erro ao buscar os dados da mesa, tente novamente.");
            payload.callbackNotFound();
        }
        
    } catch (e) {
        toast.error("Ocorreu um erro ao buscar os dados da mesa, tente novamente.");
        payload.callbackNotFound();
    }
}

function* saveTable({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/mesas/cadastrar`;
        let msg_success = "Mesa salva com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/mesas/alterar`;
            msg_success = "Mesa atualizada com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(msg_success);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao salvar a mesa, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar a mesa, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteTable({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/mesas/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(response.data.message);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Ocorreu um erro ao excluir a mesa, tente novamente.");
        }
    } catch {
        toast.error("Ocorreu um erro ao excluir a mesa, tente novamente.");
    }
}

function* loadBills({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/comandas/index`, payload);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'LOAD_BILLS_SUCCESS', payload: response.data.data});
            } else {
                yield put({type: 'LOAD_BILLS_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'LOAD_BILLS_FAILED'});
            toast.error("Ocorreu um erro ao buscar as comandas, tente novamente.");
        }
        
    } catch (e) {
        yield put({type: 'LOAD_BILLS_FAILED'});
        toast.error("Ocorreu um erro ao buscar as comandas, tente novamente.");
    }
}

function* saveBill({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/comandas/cadastrar`;
        let msg_success = "Comanda salva com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/comandas/alterar`;
            msg_success = "Comanda atualizada com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(msg_success);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao salvar a comanda, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar a comanda, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteBill({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/comandas/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                toast.success(response.data.message);
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Ocorreu um erro ao excluir a comanda, tente novamente.");
        }
    } catch {
        toast.error("Ocorreu um erro ao excluir a comanda, tente novamente.");
    }
}

function* checkOpenBill({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/comandas/verifica-aberta`, payload.submitValues);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                if (  response.data.reponse == 'comanda_fechada' ) {
                    payload.callbackIsClosed();
                } else if (  response.data.reponse == 'comanda_aberta' ) {
                    payload.callbackIsOpened(response.data.cliente, response.data.comanda, response.data.endereco);
                }
            } else {
                toast.error(response.data.message);
                payload.callbackError();
            }
        } else {
            toast.error("Ocorreu um erro ao buscar os dados da comanda, tente novamente.");
            payload.callbackError();
        }
        
    } catch (e) {
        toast.error("Ocorreu um erro ao buscar os dados da comanda, tente novamente.");
        payload.callbackError();
    }
}

function* loadPos({payload}) {

    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/pdvs/index`, payload);

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'LOAD_POS_SUCCESS', payload: response.data.data});
            } else {
                yield put({type: 'LOAD_POS_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'LOAD_POS_FAILED'});
            toast.error("Ocorreu um erro ao buscar os PDVs, tente novamente.");
        }
        
    } catch (e) {
        if (e.response && e.response.status === 401) {
            toast.error("Sua autenticação expirou, por favor, logue novamente!");
            return;
        }
   
        yield put({type: 'LOAD_BILLS_FAILED'});
        toast.error("Ocorreu um erro ao buscar os PDVs, tente novamente.");
         
    }
}

function* startOrder({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/comandas/iniciar-pedido`;

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                //toast.success();
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao iniciar o pedido, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        toast.error("Ocorreu um erro ao iniciar o pedido, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* addProductToOrder({payload}) {

    try {

        let url = process.env.REACT_APP_API_URL + `/consumo/adicionar`;

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });

        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                //toast.success();
                payload.callback();
            } else {
                toast.error(response.data.message);
            }
            payload.setSubmitting(false);
        } else {
            toast.error("Ocorreu um erro ao iniciar o pedido, tente novamente.");
            payload.setSubmitting(false);
        }
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao iniciar o pedido, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* gServiceDataToScheduling({payload}) {

    if ( payload.params.servico_id === "" || payload.params.day === "" ) {
        
        yield put({
            type: 'GET_SERVICE_DATA_TO_SCHEDULING_SUCCESS',
            payload: {}
        });

        return false;
    }

	try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/servicos/dados_para_agendamento`, payload);

		if (response.data.status == 'ok') {
			let dados = response.data.dados;
			yield put({
				type: 'GET_SERVICE_DATA_TO_SCHEDULING_SUCCESS',
				payload: dados
			});
		} else if (response.data.status == 'warning') {
		    toast.warn(response.data.msg);
			yield put({
				type: 'GET_SERVICE_DATA_TO_SCHEDULING_FAILED',
				payload: {}
			});
		} else if (response.data.status == 'info') {
		    toast.info(response.data.msg);
			yield put({
				type: 'GET_SERVICE_DATA_TO_SCHEDULING_FAILED',
				payload: {}
			});
		}else{

		    toast.error(response.data.msg);
			yield put({
				type: 'GET_SERVICE_DATA_TO_SCHEDULING_FAILED',
				payload: {}
			});
		}
	} catch ({message, response}) {
		console.warn('[ERROR : BUSCA SERVICE DATA]', { message, response });
		toast.error(response.data.message);

		yield put({
			type: 'GET_SERVICE_HOURS_FAILED',
			payload: false
		});
	}

}

function* gProfessionals({payload}){
	
	try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/usuarios/index`, payload);
        
        if (response.status == 200) {
            if (response.data.status == 'ok') {   
                yield put({type: 'GET_PROFESSIONALS_SUCCESS', payload: response.data.dados});
            } else {
                yield put({type: 'GET_PROFESSIONALS_FAILED'});
                toast.error(response.data.message);
            }
        } else {
            yield put({type: 'GET_PROFESSIONALS_FAILED'});
            toast.error("Ocorreu um erro ao buscar os PDVs, tente novamente.");
        }


	} catch ({message, response}) {
        if (e.response && e.response.status === 401) {
            toast.error("Sua autenticação expirou, por favor, logue novamente!");
            return;
        }
   
        yield put({type: 'GET_PROFESSIONALS_FAILED'});
        toast.error("Ocorreu um erro ao buscar os profissionais, tente novamente.");
	}

}

export function* saga() {
    yield takeLatest('LOAD_NOTIFICATIONS', loadNotifications);
    yield takeLatest('SET_NOTIFICATIONS_READ', setNotificationRead);

    yield takeLatest('LOAD_CUSTOMERS', loadCustomers);
    yield takeLatest('LOAD_CUSTOMERS_LIST', loadCustomersList);
    yield takeLatest('LOAD_UFS', loadUfs);
    yield takeLatest('LOAD_CITIES', loadCities);
    yield takeLatest('LOAD_ADDRESS_BY_POSTAL_CODE', loadAddressByPostalCode);
    yield takeLatest('SAVE_CUSTOMER', saveCustomer);
    yield takeLatest('DELETE_CUSTOMER', deleteCustomer);
    yield takeLatest('CANCEL_SCHEDULING', cancelScheduling);

    yield takeLatest('LOAD_COURTS_SERVICES', loadCourtServices);
    yield takeLatest('LOAD_AVAILABLE_SCHEDULES', loadAvailableSchedules);
    yield takeLatest('LOAD_BUSINESS_CONFIGS', loadBusinessConfigs);

    yield takeLatest('LOAD_SCHEDULES', loadSchedules);
    yield takeLatest('LOAD_SCHEDULING_DATA', loadSchedulingData);
    yield takeLatest('SAVE_SCHEDULING', saveScheduling);

    yield takeLatest('LOAD_TOURNAMENTS', loadTournaments);
    yield takeLatest('LOAD_PADEL_CATEGORIES', loadPadelCategories);
    yield takeLatest('SAVE_TOURNAMENT', saveTournament);

    yield takeLatest('LOAD_PRODUCTS_CATEGORIES', loadProductsCategories);
    yield takeLatest('SAVE_PRODUCT_CATEGORY', saveProductCategory);
    yield takeLatest('DELETE_PRODUCT_CATEGORY', deleteProductCategory);

    yield takeLatest('LOAD_PRODUCTS', loadProducts);
    yield takeLatest('SAVE_PRODUCT', saveProduct); 
    yield takeLatest('DELETE_PRODUCT', deleteProduct);

    yield takeLatest('LOAD_PRODUCT_ADITIONALS', loadProductAditionals);
    yield takeLatest('SAVE_PRODUCT_ADITIONAL', saveProductAditional);
    yield takeLatest('DELETE_PRODUCT_ADITIONAL', deleteProductAditional);

    yield takeLatest('LOAD_TABLES', loadTables);
    yield takeLatest('SAVE_TABLE', saveTable);
    yield takeLatest('DELETE_TABLE', deleteTable);
    yield takeLatest('LOAD_TABLE', loadTable);

    yield takeLatest('LOAD_BILLS', loadBills);
    yield takeLatest('SAVE_BILL', saveBill);
    yield takeLatest('DELETE_BILL', deleteBill);
    yield takeLatest('CHECK_OPEN_BILL', checkOpenBill);

    yield takeLatest('LOAD_POS', loadPos);
    yield takeLatest('START_ORDER', startOrder);
    
    yield takeLatest('CANCEL_TOURNAMENT', cancelTournament);
    yield takeLatest('ADD_PRODUCT_DO_ORDER', addProductToOrder);
    yield takeLatest('GET_PROFESSIONALS', gProfessionals);    

	yield takeLatest('GET_SERVICE_DATA_TO_SCHEDULING', gServiceDataToScheduling);
    
}
