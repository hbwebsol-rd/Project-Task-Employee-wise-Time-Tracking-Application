import axios from "axios";
import cookie from "react-cookies";
import { LOGGED_IN } from "../store/actions/loginActions";
import { BASE_URL } from "./index";


export const PostData = (url, details) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    
    return dispatch => {
        return axios
            .post(`${BASE_URL}${url}`, details,  { headers: {
                'x-auth-token': `${token}`
            }} )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                }
                else {
                    console.log('Error');
                }
            })
            .catch(error => console.log(error));
    }
}

export const UpdateData = (url, details) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    
    return dispatch => {
        return axios
            .put(`${BASE_URL}${url}`, details,  { headers: {
                'x-auth-token': `${token}`
            }} )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                }
                else {
                    console.log('Error');
                }
            })
            .catch(error => console.log(error));
    }
}

export const DeleteData = (url) => {
    var token = ''
    if (cookie.load("token")) {
        token = cookie.load("token");
    }
    return dispatch => {
        return axios
            .delete(`${BASE_URL}${url}`, { headers: {
                'x-auth-token': `${token}`
            }} )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                }
                else {
                    console.log('Error');
                }
            })
            .catch(error => console.log(error));
    }
}

export const PostUser = (url, details) => {
    return dispatch => {
        return axios
            .post(`${BASE_URL}${url}`, details)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data
                    var token = data.token
                    if (token) {
                        cookie.save('token', token, { path: '/' })
                    }
                    dispatch({
                        type: LOGGED_IN,
                        payload: { token },
                    });
                }
                else {
                    console.log('Error');
                }
            })
            .catch(error => console.log(error));
    }
}