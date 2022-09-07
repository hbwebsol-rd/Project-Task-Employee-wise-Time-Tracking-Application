import cookie from "react-cookies"
import { FETCH_CLIENTS_BEGIN, FETCH_CLIENTS_FAILURE, FETCH_CLIENTS_SUCCESS } from "../actions/clientActions";

const initialState = {
    loading: false,
    error: null,
    clients: []
}

const client = (state = initialState, action) => {
    switch (action.type) {
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
                clients: action.payload.data
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