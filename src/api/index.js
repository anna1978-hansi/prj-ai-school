import axios from 'axios';
import store from '../store';
import { removeAccessToken } from '../store/modules/auth/actions';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 自动携带accessToken
    const state = store.getState();
    const accessToken = state.auth ? state.auth.accessToken : null;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      // 401未授权，清除accessToken
      store.dispatch(removeAccessToken());
      // 可选：跳转到登录页，或弹窗提示
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance; 