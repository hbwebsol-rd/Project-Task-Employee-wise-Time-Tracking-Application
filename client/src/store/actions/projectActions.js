import { DeleteFetch, GetFetch, PostFetch, UpdateFetch } from '../../utils/fetch-sevice';
import swal from 'sweetalert';


export const FETCH_PROJECTS_BEGIN = 'FETCH_PROJECTS_BEGIN';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';
export const PROJECT_LOADER = 'PROJECT_LOADER';
export const PROJECT_ACTION_FAIL = 'PROJECT_ACTION_FAIL';
export const PROJECT_UPDATED_SUCCESSFULLY = 'PROJECT_UPDATED_SUCCESSFULLY';
export const PROJECT_ADDED_SUCCESSFULLY = 'PROJECT_ADDED_SUCCESSFULLY';


export const GetAllProjectsAction = () => (dispatch) => {
  dispatch({
    type: PROJECT_LOADER,
  });

  GetFetch("getProjects")
    .then((response) => {
      var data = response.data;
      let { message } = response.data.data;
      if (response.status === 200) {
        dispatch({
          type: FETCH_PROJECTS_SUCCESS,
          payload: data || [],
        });
      } else {
        dispatch({
          type: PROJECT_ACTION_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: PROJECT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const AddProjectAction = (requestBody) => (dispatch) => {
  dispatch({
    type: PROJECT_LOADER,
  });

  PostFetch("addProject", requestBody)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: PROJECT_ADDED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: PROJECT_ACTION_FAIL,
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
        type: PROJECT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const UpdateProjectAction = (id, requestBody) => (dispatch) => {
  dispatch({
    type: PROJECT_LOADER,
  });

  UpdateFetch(`updateProject/${id}`, requestBody)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: PROJECT_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: PROJECT_ACTION_FAIL,
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
        type: PROJECT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};

export const DeleteProjectAction = (id) => (dispatch) => {
  dispatch({
    type: PROJECT_LOADER,
  });

  DeleteFetch(`deleteProject/${id}`)
    .then((response) => {
      let { message } = response.data;
      if (response.status === 200) {
        swal({
          title: message || "fsadfl; Added Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        dispatch({
          type: PROJECT_UPDATED_SUCCESSFULLY,
          payload: "",
        });
      } else {
        dispatch({
          type: PROJECT_ACTION_FAIL,
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
        type: PROJECT_ACTION_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
};