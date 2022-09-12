import { DeleteFetch, GetFetch, PostFetch, UpdateFetch } from '../../utils/fetch-sevice';
import swal from 'sweetalert';


export const FETCH_CLIENTS_BEGIN = 'FETCH_CLIENTS_BEGIN';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';
export const CLEINT_LOADER = 'CLEINT_LOADER';
export const CLEINT_ACTION_FAIL = 'CLEINT_ACTION_FAIL';
export const CLEINT_UPDATED_SUCCESSFULLY = 'CLEINT_UPDATED_SUCCESSFULLY';
export const CLEINT_ADDED_SUCCESSFULLY = 'CLEINT_ADDED_SUCCESSFULLY';


export const GetAllClientsAction = () => (dispatch) => {
  dispatch({
    type: CLEINT_LOADER,
  });

  GetFetch("customer")
    .then((response) => {
      var data = response.data;
      console.log('response', response)
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_CLIENTS_SUCCESS,
          payload: data || [],
        });
      } else {
        dispatch({
          type: CLEINT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLEINT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const AddClientAction = (requestBody) => (dispatch) => {
  dispatch({
    type: CLEINT_LOADER,
  });

  PostFetch("customer", requestBody)
    .then((response) => {
      console.log('response', response)
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: CLEINT_ADDED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: CLEINT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
          showConfirmButton: false,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLEINT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const UpdateClientAction = (id, requestBody) => (dispatch) => {
  dispatch({
    type: CLEINT_LOADER,
  });

  UpdateFetch(`customer/update/${id}`, requestBody)
    .then((response) => {
      console.log('response', response)
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: CLEINT_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: CLEINT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
          showConfirmButton: false,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLEINT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const DeleteClientAction = (id) => (dispatch) => {
  dispatch({
    type: CLEINT_LOADER,
  });

  DeleteFetch(`customer/delete/${id}`)
    .then((response) => {
      console.log('response', response)
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: CLEINT_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: CLEINT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
          showConfirmButton: false,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CLEINT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};