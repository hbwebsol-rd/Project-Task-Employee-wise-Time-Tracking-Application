import { FETCH_PROFILE, PASSWORD_CHANGED, PROFILE_ACTION_FAIL, PROFILE_LOADER, PROFILE_UPDATED_SUCCESSFULLY } from "../actions/profileActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    userProfile: []
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADER: {
            return {
                ...state,
                loading: true,
            }
        }
        case PROFILE_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case FETCH_PROFILE: {
            return {
                ...state,
                loading: false,
                userProfile: action.payload
            };
        }
        case PROFILE_UPDATED_SUCCESSFULLY: {
          return {
            ...state,
            loading: false,
            updated: true,
          };
        }
        case PASSWORD_CHANGED: {
            return {
                ...state,
                loading: false,
                updated:true
            }
        }
        default: {
            return state
        }
    }
}

export default profile