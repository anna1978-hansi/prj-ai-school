// src/store/modules/auth/reducer.js

import { SET_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN } from './types';

// 初始状态
const initialState = {
  accessToken: null,
};

// reducer 函数
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case REMOVE_ACCESS_TOKEN:
      return { ...state, accessToken: null };
    default:
      return state;
  }
}