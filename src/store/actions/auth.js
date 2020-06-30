import axios from "axios";
import * as actionTypes from "./actionTypes";
import { message } from "antd";
import { endpoint } from "../utility";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
  };
};

export const authSignupSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
  };
};

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authProfileUpdate = () => {
  return {
    type: actionTypes.AUTH_PROFILE_UPDATE,
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${endpoint}/rest-auth/login/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log();
        const user = {
          token: res.data.token,
          userId: res.data.user.id,
          expirationDate: new Date(new Date().getTime() + 3600 * 24 * 1000),
          username: res.data.user.username,
          firstname: res.data.user.first_name,
          lastname: res.data.user.last_name,
          email: res.data.user.email,
          profile: res.data.user.profile,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600 * 24));
        message.success("You are login as " + user.username.toUpperCase());
      })
      .catch((err) => {
        dispatch(authFail());
        console.log(err.response);
        if (err.response === undefined) message.error("Connection Error");
        else if (err.response.data.non_field_errors)
          message.error(err.response.data.non_field_errors);
        else if (err.response.data.email)
          message.error(err.response.data.email);
        else if (err.response.data.password)
          message.error(err.response.data.password);
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      email: email,
      username: username,
      password1: password1,
      password2: password2,
    };
    axios
      .post(`${endpoint}/rest-auth/registration/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(authSignupSuccess());
        message.success("You are registered and " + res.data.detail);
      })
      .catch((err) => {
        dispatch(authFail());
        if (err.response === undefined) message.error("Connection Error");
        if (err.response.data.username)
          message.error(err.response.data.username);
        else if (err.response.data.email)
          message.error(err.response.data.email);
        else if (err.response.data.password1)
          message.error(err.response.data.password1);
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        message.info("You are logout");
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const profileUpdate = (
  firstname,
  lastname,
  username,
  email,
  imageUrl
) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    //formData.append("id", user.userId);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profile", imageUrl);

    axios
      .put(`${endpoint}/rest-auth/user/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${data.token}`,
        },
      })
      .then((res) => {
        const data = JSON.parse(localStorage.getItem("user"));
        const user = {
          ...data,
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          profile: res.data.profile,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        message.success("You have update for profile successfully");
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail());
      });
  };
};
