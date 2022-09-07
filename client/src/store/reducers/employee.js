import cookie from "react-cookies"
import { FETCH_EMPLOYEES_BEGIN, FETCH_EMPLOYEES_FAILURE, FETCH_EMPLOYEES_SUCCESS } from "../actions/employeeActions";

const initialState = {
    token: '',
    loading: false,
    error: null,
    emp: []
}

if (cookie.load("token")) {
    initialState.token = cookie.load("token");
    initialState.loggedIn = true;
}
const employee = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_EMPLOYEES_SUCCESS: {
            return {
                ...state,
                loading: false,
                emp: action.payload.data
            };
        }
        case FETCH_EMPLOYEES_FAILURE: {
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

export default employee