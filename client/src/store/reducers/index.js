import { combineReducers } from "redux";
import  login  from "./login";
import employee from "./employee";
import client from "./client";
import task from "./task";
import project from "./project";

const rootReducer = combineReducers({
    login,
    employee,
    client,
    task,
    project
})

export default rootReducer;