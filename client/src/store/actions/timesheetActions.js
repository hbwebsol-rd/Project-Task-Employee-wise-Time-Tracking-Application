import {
  DeleteFetch,
  GetFetch,
  PostFetch,
  UpdateFetch,
} from "../../utils/fetch-sevice";
import swal from "sweetalert";

export const TIMESHEET_FETCHED_SUCCESSFULLY = "TIMESHEET_FETCHED_SUCCESSFULLY";
export const TIMESHEET_LOADER = "TIMESHEET_LOADER";
export const TIMESHEET_ACTION_FAIL = "TIMESHEET_ACTION_FAIL";
export const TIMESHEET_UPDATED_SUCCESSFULLY = "TIMESHEET_UPDATED_SUCCESSFULLY";
export const TIMESHEET_ADDED_SUCCESSFULLY = "TIMESHEET_ADDED_SUCCESSFULLY";
export const TIMESHEET_DELETED_SUCCESSFULLY = "TIMESHEET_DELETED_SUCCESSFULLY";

export const GetAllTimesheetAction = () => (dispatch) => {
  dispatch({
    type: TIMESHEET_LOADER,
  });

  GetFetch("getEmployees")
    .then((response) => {
      var data = response.data.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: TIMESHEET_FETCHED_SUCCESSFULLY,
          payload: data || [],
        });
      } else {
        dispatch({
          type: TIMESHEET_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TIMESHEET_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
      });
    });
};

export const AddTimesheetAction = (requestBody) => (dispatch) => {
  dispatch({
    type: TIMESHEET_LOADER,
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
          type: TIMESHEET_ADDED_SUCCESSFULLY,
          payload: "",
        });
        dispatch(GetAllTimesheetAction());
      } else {
        dispatch({
          type: TIMESHEET_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TIMESHEET_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
      });
    });
};

export const UpdateTimesheetAction = (id, requestBody) => (dispatch) => {
  dispatch({
    type: TIMESHEET_LOADER,
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
          type: TIMESHEET_UPDATED_SUCCESSFULLY,
          payload: "",
        });
        dispatch(GetAllTimesheetAction());
      } else {
        dispatch({
          type: TIMESHEET_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TIMESHEET_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
      });
    });
};

export const DeleteTimesheetAction = (id) => (dispatch) => {
  dispatch({
    type: TIMESHEET_LOADER,
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
          type: TIMESHEET_DELETED_SUCCESSFULLY,
          payload: "",
        });
        
        dispatch(GetAllTimesheetAction());
      } else {
        dispatch({
          type: TIMESHEET_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: TIMESHEET_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
      });
    });
};
