import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../../utils";


export const FETCH_TASKS_BEGIN = 'FETCH_TASKS_BEGIN';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const fetchTasksBegin = () => ({
  type: FETCH_TASKS_BEGIN
});

export const fetchTasksSuccess = data => ({
  type: FETCH_TASKS_SUCCESS,
  payload: { data }
});

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  payload: { error }
});


export const GetFetch = (url) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    return dispatch => {
        dispatch(fetchTasksBegin());
        return axios
            .get(`${BASE_URL}${url}`, {
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then(json => {
                dispatch(fetchTasksSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchTasksFailure(error)));
    };
}