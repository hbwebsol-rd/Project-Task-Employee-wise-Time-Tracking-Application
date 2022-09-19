import {
  EMPLOYEES_FETCHED_SUCCESSFULLY,
  EMPLOYEE_ACTION_FAIL,
  EMPLOYEE_UPDATED_SUCCESSFULLY,
  EMPLOYEE_ADDED_SUCCESSFULLY,
  EMPLOYEE_DELETED_SUCCESSFULLY,
} from "../actions/employeeActions";
import { EMPLOYEE_LOADER } from "../actions/employeeActions";

const initialState = {
  loading: false,
  error: null,
  updated: false,
  employees: [],
};

const client = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LOADER: {
      return {
        ...state,
        loading: true,
        updated: false,
      };
    }
    case EMPLOYEE_ACTION_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case EMPLOYEE_ADDED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case EMPLOYEE_UPDATED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case EMPLOYEE_DELETED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case EMPLOYEES_FETCHED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default client;
