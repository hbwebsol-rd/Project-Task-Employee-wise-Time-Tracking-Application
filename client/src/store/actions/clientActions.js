import { DeleteFetch, GetFetch, PostFetch, UpdateFetch } from '../../utils/fetch-sevice';
import swal from 'sweetalert';


export const FETCH_CLIENTS_BEGIN = 'FETCH_CLIENTS_BEGIN';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';
export const CLIENT_LOADER = 'CLIENT_LOADER';
export const CLIENT_ACTION_FAIL = 'CLIENT_ACTION_FAIL';
export const CLIENT_UPDATED_SUCCESSFULLY = 'CLIENT_UPDATED_SUCCESSFULLY';
export const CLIENT_ADDED_SUCCESSFULLY = 'CLIENT_ADDED_SUCCESSFULLY';


export const GetAllClientsAction = () => (dispatch) => {
  dispatch({
    type: CLIENT_LOADER,
  });

  GetFetch("getCustomers")
    .then((response) => {
      var data = response.data.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_CLIENTS_SUCCESS,
          payload: data || [],
        });
      } else {
        dispatch({
          type: CLIENT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLIENT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",

      });
    });
};

export const AddClientAction = (requestBody) => (dispatch) => {
  dispatch({
    type: CLIENT_LOADER,
  });

  PostFetch("addCustomer", requestBody)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",

        });
        dispatch({
          type: CLIENT_ADDED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: CLIENT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",

        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLIENT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",

      });
    });
};

export const UpdateClientAction = (id, requestBody) => (dispatch) => {
  dispatch({
    type: CLIENT_LOADER,
  });

  UpdateFetch(`updateCustomer/${id}`, requestBody)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",

        });
        dispatch({
          type: CLIENT_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: CLIENT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",

        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLIENT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",

      });
    });
};

export const DeleteClientAction = (id) => (dispatch) => {
  dispatch({
    type: CLIENT_LOADER,
  });

  DeleteFetch(`deleteCustomer/${id}`)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
        });
        dispatch({
          type: CLIENT_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: CLIENT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",

        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLIENT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
      });
    });
};