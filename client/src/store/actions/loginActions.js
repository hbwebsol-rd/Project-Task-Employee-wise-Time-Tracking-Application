import swal from "sweetalert";
import { PostUser } from "../../utils/fetch-sevice";
import cookie from "react-cookies";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_LOADER = 'LOGIN_LOADER';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const logout = () => ({
  type: LOGOUT
})

export const LoginAction = (requestBody) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADER,
  });
  PostUser('user/login', requestBody)
    .then((response) => {
      var data = response.data;
      var token = data.token;
      if (token) {
        cookie.save('token', token, { path: '/' })
      }
      console.log(data)
      let { message } = response.data;
      if (response.status === 200) {
        dispatch({
          type: LOGIN,
          payload: { token },
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        swal({
          title: message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: "Something went wrong. Please try again later.",
      });
      swal({
        title: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
      });
    });
}