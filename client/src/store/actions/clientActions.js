import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../../utils";


export const FETCH_CLIENTS_BEGIN = 'FETCH_CLIENTS_BEGIN';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';

export const fetchClientsBegin = () => ({
  type: FETCH_CLIENTS_BEGIN
});

export const fetchClientsSuccess = data => ({
  type: FETCH_CLIENTS_SUCCESS,
  payload: { data }
});

export const fetchClientsFailure = error => ({
  type: FETCH_CLIENTS_FAILURE,
  payload: { error }
});


export const GetFetch = (url) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    return dispatch => {
        dispatch(fetchClientsBegin());
        return axios
            .get(`${BASE_URL}${url}`, {
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then(json => {
                dispatch(fetchClientsSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchClientsFailure(error)));
    };
}