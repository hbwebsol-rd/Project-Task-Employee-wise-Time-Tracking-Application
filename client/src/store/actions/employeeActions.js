import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../../utils";

export const FETCH_EMPLOYEES_BEGIN = 'FETCH_EMPLOYEES_BEGIN';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

export const fetchEmployeesBegin = () => ({
  type: FETCH_EMPLOYEES_BEGIN
});

export const fetchEmployeesSuccess = data => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: { data }
});

export const fetchEmployeesFailure = error => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: { error }
});


export const GetFetch = (url) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    return dispatch => {
        dispatch(fetchEmployeesBegin());
        return axios
            .get(`${BASE_URL}${url}`, {
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then(json => {
                dispatch(fetchEmployeesSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchEmployeesFailure(error)));
    };
}