import { FETCH_TASKS_BEGIN, FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS, TASK_LOADER, TASK_ACTION_FAIL, TASK_UPDATED_SUCCESSFULLY, TASK_ADDED_SUCCESSFULLY } from "../actions/taskActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    tasks: []
}

const task = (state = initialState, action) => {
    switch (action.type) {
        case TASK_LOADER: {
            return {
                ...state,
                loading: true,
                updated: false
            }
        }
        case TASK_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case TASK_ADDED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true,
            }
        }
        case TASK_UPDATED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true
            }
        }
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