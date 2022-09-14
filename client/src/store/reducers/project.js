import { FETCH_PROJECTS_BEGIN, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_SUCCESS, PROJECT_LOADER, PROJECT_ACTION_FAIL, PROJECT_UPDATED_SUCCESSFULLY, PROJECT_ADDED_SUCCESSFULLY } from "../actions/projectActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    projects: []
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_LOADER: {
            return {
                ...state,
                loading: true,
                updated: false
            }
        }
        case PROJECT_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case PROJECT_ADDED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true,
                projects: action.payload.data
            }
        }
        case PROJECT_UPDATED_SUCCESSFULLY: {
            return {
                ...state,
                loading: false,
                updated: true
            }
        }
        case FETCH_PROJECTS_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_PROJECTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                projects: action.payload.data
            };
        }
        case FETCH_PROJECTS_FAILURE: {
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

export default project