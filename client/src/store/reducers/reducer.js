import { loggedIn, LOGGED_IN } from "../actions/action"
const initialState = {
    loggedIn: false,
    role: ''
}
if(localStorage.getItem('token')){
    initialState.loggedIn = true
}
export const reducer = (state = initialState, action) =>{
    switch(action.type){
        case LOGGED_IN:
            localStorage.setItem('token', true)
            return {
                loggedIn: true,
                role: 'employee'
            }
            default:{
                return  initialState
            }
    }
} 