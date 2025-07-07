import request from './index';

export function sendVerificationCode(email) {
  return request.post(`/sendVerificationCode?email=${encodeURIComponent(email)}`);
}

// 教师注册
export function registerTeacher(data) {
  return request.post('/teachers/register', data);
}
