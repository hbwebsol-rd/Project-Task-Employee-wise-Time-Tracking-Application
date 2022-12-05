import {
  TIMESHEET_FETCHED_SUCCESSFULLY,
  TIMESHEET_ACTION_FAIL,
  TIMESHEET_UPDATED_SUCCESSFULLY,
  TIMESHEET_ADDED_SUCCESSFULLY,
  TIMESHEET_DELETED_SUCCESSFULLY,
  TIMESHEET_LOADER,
} from "../actions/timesheetActions";

const initialState = {
  loading: false,
  error: null,
  updated: false,
  timesheet: [],
};

const client = (state = initialState, action) => {
  switch (action.type) {
    case TIMESHEET_LOADER: {
      return {
        ...state,
        loading: true,
        updated: false,
      };
    }
    case TIMESHEET_ACTION_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case TIMESHEET_ADDED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case TIMESHEET_UPDATED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case TIMESHEET_DELETED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case TIMESHEET_FETCHED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        timesheet: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default client;
