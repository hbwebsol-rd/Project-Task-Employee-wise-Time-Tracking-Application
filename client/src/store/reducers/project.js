import {
  PROJECT_FETCHED_SUCCESSFULLY,
  PROJECT_LOADER,
  PROJECT_ACTION_FAIL,
  PROJECT_UPDATED_SUCCESSFULLY,
  PROJECT_ADDED_SUCCESSFULLY,
} from "../actions/projectActions";

const initialState = {
  loading: false,
  error: null,
  updated: false,
  projects: [],
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_LOADER: {
      return {
        ...state,
        loading: true,
        updated: false,
      };
    }
    case PROJECT_ACTION_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case PROJECT_ADDED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case PROJECT_UPDATED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case PROJECT_FETCHED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        projects: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default project;
