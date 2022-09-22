import swal from "sweetalert";
import { GetFetch, UpdateFetch } from "../../utils/fetch-sevice";

export const PROFILE_LOADER = "PROFILE_LOADER";
export const FETCH_PROFILE = "FETCH_PROFILE";
export const PROFILE_ACTION_FAIL = "PROFILE_ACTION_FAIL";
export const PASSWORD_CHANGED = "PASSWORD_CHANGED";
export const PROFILE_UPDATED_SUCCESSFULLY = "PROFILE_UPDATED_SUCCESSFULLY";

export const GetUserProfile = () => (dispatch) => {
  dispatch({
    type: PROFILE_LOADER,
  });

  GetFetch("user/profile")
    .then((response) => {
      var data = response.data.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_PROFILE,
          payload: data || [],
        });
      } else {
        dispatch({
          type: PROFILE_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        
      });
    });
};

export const UpdateProfile = (requestDetails) => (dispatch) => {
  dispatch({
    type: PROFILE_LOADER,
  });

  UpdateFetch("user/updateProfile", requestDetails)
    .then((response) => {
      var data = response.data.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: PROFILE_UPDATED_SUCCESSFULLY,
        });
        swal({
          title: message || "Password Changed",
          icon: "success",
        });
        dispatch(GetUserProfile());
      } else {
        dispatch({
          type: PROFILE_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        
      });
    });
};

export const UpdatePassword = (requestDetails) => (dispatch) => {
  dispatch({
    type: PROFILE_LOADER,
  });

  UpdateFetch("user/updatePassword", requestDetails)
    .then((response) => {
      var data = response.data.data;
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: PASSWORD_CHANGED,
        });
        swal({
          title: message || "Password Changed",
          icon: "success",
        });
      } else {
        dispatch({
          type: PROFILE_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROFILE_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        
      });
    });
};
