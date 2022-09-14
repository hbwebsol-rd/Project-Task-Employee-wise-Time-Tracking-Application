import { FETCH_EMPLOYEES_BEGIN, FETCH_EMPLOYEES_FAILURE, FETCH_EMPLOYEES_SUCCESS, EMPLOYEE_ACTION_FAIL, EMPLOYEE_UPDATED_SUCCESSFULLY, EMPLOYEE_ADDED_SUCCESSFULLY } from "../actions/employeeActions";
import { EMPLOYEE_LOADER } from "../actions/employeeActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    employees: []
}

const client = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_LOADER: {
            return {
                ...state,
                loading: true,
                updated: false
            }
        }
        case EMPLOYEE_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case EMPLOYEE_ADDED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true,
                employees: action.payload.data
            }
        }
        case EMPLOYEE_UPDATED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true
            }
        }
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
                employees: action.payload
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

export default client