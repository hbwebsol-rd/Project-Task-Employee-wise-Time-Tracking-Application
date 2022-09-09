import { FETCH_PROJECTS_BEGIN, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_SUCCESS } from "../actions/projectActions";


const initialState = {
    loading: false,
    error: null,
    projects: []
}

const project = (state = initialState, action) => {
    switch (action.type) {
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