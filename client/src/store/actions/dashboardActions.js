import { GetFetch } from '../../utils/fetch-sevice';
import swal from 'sweetalert';

export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const DASHBOARD_LOADER = 'DASHBOARD_LOADER';
export const DASHBOARD_ACTION_FAIL = 'DASHBOARD_ACTION_FAIL';


export const GetAllDashboardAction = () => (dispatch) => {
  dispatch({
    type: DASHBOARD_LOADER,
  });

  GetFetch("user/dashboard")
    .then((response) => {
      var data = response.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_DASHBOARD_SUCCESS,
          payload: data || [],
        });
      } else {
        dispatch({
          type: DASHBOARD_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const GetEmployeeDashboardAction = () => (dispatch) => {
  dispatch({
    type: DASHBOARD_LOADER,
  });

  GetFetch("employee/dashboard")
    .then((response) => {
      var data = response.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_DASHBOARD_SUCCESS,
          payload: data || [],
        });
      } else {
        dispatch({
          type: DASHBOARD_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DASHBOARD_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};