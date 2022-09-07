import { combineReducers } from "redux";
import  login  from "./login";
import  reducer  from "./reducer";
import employee from "./employee";
import client from "./client";
import task from "./task";

const rootReducer = combineReducers({
    reducer,
    login,
    employee,
    client,
    task
})

export default rootReducer;