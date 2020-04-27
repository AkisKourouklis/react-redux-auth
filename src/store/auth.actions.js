import axios from "axios";
import jwt from "jsonwebtoken";
import types from "./type";
import { api } from "../config/api";

const authFail = (data) => ({
  type: types.AUTH_FAIL,
  data,
});
const authStart = () => ({
  type: types.AUTH_START,
});
const authLogout = () => ({
  type: types.AUTH_LOGOUT,
});

export const logout = () => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common.Authorization = "";
      localStorage.removeItem("jwtToken");
      dispatch(authLogout());
    } catch (err) {
      console.error(err);
    }
  };
};

export const setCurrentUser = (token) => ({
  type: types.SET_CURRENT_USER,
  token,
});

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => {
  return async (dispatch) => {
    const fetchData = await axios.post(`${api}/subscribers/login`, data);
    try {
      const { token } = await fetchData.data;
      localStorage.setItem("jwtToken", token);
      dispatch(authStart());
      const details = { ...jwt.decode(token), token };
      dispatch(setCurrentUser(details));
    } catch (err) {
      console.error(err);
      dispatch(authFail(err));
    }
  };
};

export const authregister = (data) => {
  return async (dispatch) => {
    const fetchData = await axios.post(`${api}/subscribers/register`, {
      password: data.password,
      email: data.email,
      language: "el",
      name: data.name,
    });
    try {
      const { token } = await fetchData.data;
      localStorage.setItem("jwtToken", token);
      dispatch(authStart());
      const details = { ...jwt.decode(token), token };
      dispatch(setCurrentUser(details));
    } catch (err) {
      console.error(err);
      dispatch(authFail(err));
    }
  };
};
