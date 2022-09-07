import { FETCH_TASKS_BEGIN, FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS } from "../actions/taskActions";

const initialState = {
    loading: false,
    error: null,
    tasks: []
}

const task = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_TASKS_SUCCESS: {
            return {
                ...state,
                loading: false,
                tasks: action.payload.data
            };
        }
        case FETCH_TASKS_FAILURE: {
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

export default task