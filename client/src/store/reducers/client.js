import { FETCH_CLIENTS_BEGIN, FETCH_CLIENTS_FAILURE, FETCH_CLIENTS_SUCCESS, CLIENT_LOADER, CLIENT_ACTION_FAIL, CLIENT_UPDATED_SUCCESSFULLY, CLIENT_ADDED_SUCCESSFULLY } from "../actions/clientActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    clients: []
}

const client = (state = initialState, action) => {
    switch (action.type) {
        case CLIENT_LOADER: {
            return {
                ...state,
                loading: true,
                updated: false
            }
        }
        case CLIENT_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case CLIENT_ADDED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true,
                clients: action.payload.data
            }
        }
        case CLIENT_UPDATED_SUCCESSFULLY: {
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