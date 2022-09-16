import {
  DeleteFetch,
  GetFetch,
  PostFetch,
  UpdateFetch,
} from "../../utils/fetch-sevice";
import swal from "sweetalert";

export const EMPLOYEES_FETCHED_SUCCESSFULLY = "EMPLOYEES_FETCHED_SUCCESSFULLY";
export const EMPLOYEE_LOADER = "EMPLOYEE_LOADER";
export const EMPLOYEE_ACTION_FAIL = "EMPLOYEE_ACTION_FAIL";
export const EMPLOYEE_UPDATED_SUCCESSFULLY = "EMPLOYEE_UPDATED_SUCCESSFULLY";
export const EMPLOYEE_ADDED_SUCCESSFULLY = "EMPLOYEE_ADDED_SUCCESSFULLY";
export const EMPLOYEE_DELETED_SUCCESSFULLY = "EMPLOYEE_DELETED_SUCCESSFULLY";

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
          type: EMPLOYEES_FETCHED_SUCCESSFULLY,
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
        });
        dispatch({
          type: EMPLOYEE_ADDED_SUCCESSFULLY,
          payload: "",
        });
        dispatch(GetAllEmployeesAction());
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
        });
        dispatch({
          type: EMPLOYEE_UPDATED_SUCCESSFULLY,
          payload: "",
        });
        dispatch(GetAllEmployeesAction());
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
        });
        dispatch({
          type: EMPLOYEE_DELETED_SUCCESSFULLY,
          payload: "",
        });
        dispatch(GetAllEmployeesAction());
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
      });
    });
};
