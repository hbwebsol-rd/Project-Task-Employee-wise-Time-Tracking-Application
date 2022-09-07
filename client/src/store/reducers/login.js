import cookie from "react-cookies"
import { LOGGED_IN, LOGOUT } from "../actions/loginActions";

const initialState = {
    token: '',
    role: '',
    loggedIn: false,
    loading: false,
    error: null,
}

if (cookie.load("token")) {
    initialState.token = cookie.load("token");
    initialState.loggedIn = true;
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN: {  
            return {
                ...state,
                loading: false,
                loggedIn: true,
            }
        }
        case LOGOUT: {
            return{
                ...state,
                loading:false,
                loggedIn:false
            }
        }
        default: {
            return state
        }
    }
} 

export default login