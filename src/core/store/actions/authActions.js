import { LOGOUT, REMEMBER_ME, SET_LOGIN_DATA } from "./actionTypes";

export const setLoginUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN_DATA,
      payload: data
    });
  };
};

export const setRememberMe = (data) => {
  // console.log({ data });

  return (dispatch) => {
    dispatch({
      type: REMEMBER_ME,
      payload: data
    });
  };
};

export const logout = () => ({
  type: LOGOUT
});
