import { SET_ACCESS_TOKEN, LOGOUT } from './types';

export const setAccessToken = (token) => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});