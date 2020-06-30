import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  firstname: null,
  lastname: null,
  email: null,
  userId: null,
  profile: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    username: action.user.username,
    firstname: action.user.firstname,
    lastname: action.user.lastname,
    email: action.user.email,
    userId: action.user.userId,
    profile: action.user.profile,
    loading: false,
  });
};

const authSignupSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    userId: null,
    profile: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return authSignupSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
