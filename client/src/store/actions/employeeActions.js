import { DeleteFetch, GetFetch, PostFetch, UpdateFetch } from '../../utils/fetch-sevice';
import swal from 'sweetalert';


export const FETCH_EMPLOYEES_BEGIN = 'FETCH_EMPLOYEES_BEGIN';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
export const EMPLOYEE_LOADER = 'EMPLOYEE_LOADER';
export const EMPLOYEE_ACTION_FAIL = 'EMPLOYEE_ACTION_FAIL';
export const EMPLOYEE_UPDATED_SUCCESSFULLY = 'EMPLOYEE_UPDATED_SUCCESSFULLY';
export const EMPLOYEE_ADDED_SUCCESSFULLY = 'EMPLOYEE_ADDED_SUCCESSFULLY';


export const GetAllEmployeesAction = () => (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOADER,
  });

  GetFetch("getEmployees")
    .then((response) => {
      var data = response.data.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_EMPLOYEES_SUCCESS,
          payload: data || [],
        });
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: EMPLOYEE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const AddEmployeeAction = (requestBody) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOADER,
  });

  PostFetch("addEmployee", requestBody)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: EMPLOYEE_ADDED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_FAIL,
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
        type: EMPLOYEE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const UpdateEmployeeAction = (id, requestBody) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOADER,
  });

  UpdateFetch(`updateEmployee/${id}`, requestBody)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: EMPLOYEE_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_FAIL,
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
        type: EMPLOYEE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const DeleteEmployeeAction = (id) => (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOADER,
  });

  DeleteFetch(`deleteEmployee/${id}`)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: EMPLOYEE_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: EMPLOYEE_ACTION_FAIL,
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
        type: EMPLOYEE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

