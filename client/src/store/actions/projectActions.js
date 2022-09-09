import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../../utils";


export const FETCH_PROJECTS_BEGIN = 'FETCH_PROJECTS_BEGIN';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export const fetchProjectsBegin = () => ({
  type: FETCH_PROJECTS_BEGIN
});

export const fetchProjectsSuccess = data => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: { data }
});

export const fetchProjectsFailure = error => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: { error }
});


export const GetFetch = (url) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    return dispatch => {
        dispatch(fetchProjectsBegin());
        return axios
            .get(`${BASE_URL}${url}`, {
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then(json => {
                dispatch(fetchProjectsSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchProjectsFailure(error)));
    };
}