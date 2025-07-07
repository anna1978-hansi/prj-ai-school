import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可在此添加token等通用逻辑
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default instance; 