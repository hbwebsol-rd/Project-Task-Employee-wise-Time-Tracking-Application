import {
  CLIENTS_FETCHED_SUCCESSFULLY,
  CLIENT_LOADER,
  CLIENT_ACTION_FAIL,
  CLIENT_UPDATED_SUCCESSFULLY,
  CLIENT_ADDED_SUCCESSFULLY,
  CLIENT_DELETED_SUCCESSFULLY,
} from "../actions/clientActions";

const initialState = {
  loading: false,
  error: null,
  updated: false,
  clients: [],
};

const client = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_LOADER: {
      return {
        ...state,
        loading: true,
        updated: false,
      };
    }
    case CLIENT_ACTION_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case CLIENT_ADDED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case CLIENT_UPDATED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case CLIENT_DELETED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }
    case CLIENTS_FETCHED_SUCCESSFULLY: {
      return {
        ...state,
        loading: false,
        clients: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default client;
