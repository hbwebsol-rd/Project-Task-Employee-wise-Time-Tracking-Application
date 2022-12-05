import { combineReducers } from "redux";
import login from "./login";
import employee from "./employee";
import client from "./client";
import task from "./task";
import project from "./project";
import dashboard from "./dashboard";
import profile from "./profile";
import timesheet from "./timesheet";

const rootReducer = combineReducers({
  login,
  employee,
  client,
  task,
  project,
  dashboard,
  profile,
  timesheet,
});

export default rootReducer;
