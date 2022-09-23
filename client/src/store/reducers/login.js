import cookie from "react-cookies"
import { LOGIN, LOGIN_FAIL, LOGIN_LOADER, LOGOUT } from "../actions/loginActions";

const initialState = {
    token: '',
    role: 1,
    loggedIn: false,
    loading: false,
    error: null,
}

if (cookie.load("token")) {
    initialState.token = cookie.load("token");
    initialState.loggedIn = true
}
const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_LOADER: {
            return {
                ...state,
                loading: true,
            }
        }
        case LOGIN: {
            return {
                ...state,
                loading: false,
                loggedIn: true,
                role:action.payload.role
            }
        }
        case LOGOUT: {
            cookie.remove('token',{ path: '/' })
            return {
                ...state,
                loading: false,
                loggedIn: false
            }
        }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
            };
        default: {
            return state
        }
    }
}

export default login