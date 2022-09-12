import axios from "axios";
import cookie from "react-cookies";
import { LOGGED_IN } from "../store/actions/loginActions";
import { BASE_URL } from "./index";


export const GetFetch = (url) => {
    var token = "";
    if (cookie.load("token")) {
        token = cookie.load("token");
    }

    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", `${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    try {
        const response = fetch(`${BASE_URL}${url}`, requestOptions).then((res) => {
            return new Promise((resolve) => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    res.json().then((json) =>
                        resolve({
                            status: res.status,
                            data: json,
                        })
                    );
                } else {
                    throw "Something went wrong";
                }
            });
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log("er", error);
        return Promise.reject(error);
    }
};

export const PostFetch = (url, updateDetails) => {
    var token = "";
    if (cookie.load("token")) {
        token = cookie.load("token");
    }

    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(updateDetails);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = fetch(`${BASE_URL}${url}`, requestOptions).then((res) => {
            return new Promise((resolve) => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    res.json().then((json) =>
                        resolve({
                            status: res.status,
                            data: json,
                        })
                    );
                } else {
                    throw "Something went wrong";
                }
            });
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log("er", error);
        return Promise.reject(error);
    }
};

export const UpdateFetch = (url, updateDetails) => {
    var token = "";
    if (cookie.load("token")) {
        token = cookie.load("token");
    }

    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(updateDetails);

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = fetch(`${BASE_URL}${url}`, requestOptions).then((res) => {
            return new Promise((resolve) => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    res.json().then((json) =>
                        resolve({
                            status: res.status,
                            data: json,
                        })
                    );
                } else {
                    throw "Something went wrong";
                }
            });
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log("er", error);
        return Promise.reject(error);
    }
};

export const DeleteFetch = (url) => {
    var token = "";
    if (cookie.load("token")) {
        token = cookie.load("token");
    }

    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = fetch(`${BASE_URL}${url}`, requestOptions).then((res) => {
            return new Promise((resolve) => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    res.json().then((json) =>
                        resolve({
                            status: res.status,
                            data: json,
                        })
                    );
                } else {
                    throw "Something went wrong";
                }
            });
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log("er", error);
        return Promise.reject(error);
    }
};



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