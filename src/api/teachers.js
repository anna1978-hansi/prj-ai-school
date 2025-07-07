import request from './index';

export function sendVerificationCode(email) {
  return request.post(`/sendVerificationCode?email=${encodeURIComponent(email)}`);
}

// 教师注册
export function registerTeacher(data) {
  return request.post('/teachers/register', data);
}

// 获取图形验证码
export function getCaptcha() {
  return request.get('/teachers/code');
}

// 教师登录
export function loginTeacher(data) {
  return request.post('/teachers/login', data);
}
