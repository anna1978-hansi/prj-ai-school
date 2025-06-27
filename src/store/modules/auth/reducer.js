// src/store/modules/auth/reducer.js

import { SET_ACCESS_TOKEN, LOGOUT } from './types';

// 初始状态
const initialState = {
  accessToken: null,
};

// reducer 函数
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;