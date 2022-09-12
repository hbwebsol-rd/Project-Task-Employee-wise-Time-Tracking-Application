import { FETCH_CLIENTS_BEGIN, FETCH_CLIENTS_FAILURE, FETCH_CLIENTS_SUCCESS, CLEINT_LOADER, CLEINT_ACTION_FAIL, CLEINT_UPDATED_SUCCESSFULLY, CLEINT_ADDED_SUCCESSFULLY } from "../actions/clientActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    clients: []
}

const client = (state = initialState, action) => {
    switch (action.type) {
        case CLEINT_LOADER: {
            return {
                ...state,
                loading: true,
                updated: false
            }
        }
        case CLEINT_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case CLEINT_ADDED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true,
                clients: action.payload
            }
        }
        case CLEINT_UPDATED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true
            }
        }
        case FETCH_CLIENTS_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_CLIENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                clients: action.payload
            };
        }
        case FETCH_CLIENTS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        default: {
            return state
        }
    }
}

export default client