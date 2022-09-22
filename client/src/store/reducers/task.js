import { TASK_FETCHED_SUCCESSFULLY, TASK_LOADER, TASK_ACTION_FAIL, TASK_UPDATED_SUCCESSFULLY, TASK_ADDED_SUCCESSFULLY, EMPLOYEE_TASKS_FETCHED_SUCCESSFULLY } from "../actions/taskActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    tasks: [],
    employeeTasks: []
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
        case TASK_FETCHED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                tasks: action.payload.data
            };
        }
        case EMPLOYEE_TASKS_FETCHED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                employeeTasks: action.payload.data
            };
        }

        default: {
            return state
        }
    }
}

export default task