import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCaptcha, loginTeacher } from '../../../api/teachers';

const Hero = () => {
  const navigate = useNavigate();
  const [captchaImg, setCaptchaImg] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginTeacher({
        email,
        password,
        captcha: captchaValue,
        key: captchaKey,
      });
      if (res.code === 200) {
        alert('登录成功');
        console.log(res.data);
        navigate('/home');
        // 这里可以处理res.data，比如保存token、跳转等
      } else {
        alert(res.msg || '登录失败');
        fetchCaptcha(); // 登录失败刷新验证码
      }
    } catch (err) {
      alert('登录失败');
      fetchCaptcha();
    }
  };

  // 获取验证码
  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();
      setCaptchaImg(res.data.img);
      setCaptchaKey(res.data.key);
    } catch (err) {
      setCaptchaImg('');
      setCaptchaKey('');
    }
  };

  const handleCaptchaChange = (e) => {
    setCaptchaValue(e.target.value);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <div className="relative">
          <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="required w-full pl-12 pr-4 py-3 border border-gray-200 rounded-button focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <p id="email-validation" className="mt-1 text-xs text-red-500 hidden">请输入有效邮箱</p>
      </div>

      <div>
        <div className="relative">
          <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="required w-full pl-12 pr-4 py-3 border border-gray-200 rounded-button focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <p id="password-validation" className="mt-1 text-xs text-red-500 hidden">请输入有效密码</p>
      </div>

      <div>
        <div className="relative flex space-x-2">
          <div className="relative flex-1">
            <i className="fas fa-shield-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="图形验证码"
              id="captcha"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-button focus:outline-none focus:border-blue-500 text-sm"
              value={captchaValue}
              onChange={handleCaptchaChange}
            />
          </div>
          <div
            className="captcha-container h-[46px] w-[140px] bg-gray-100 rounded-button overflow-hidden flex flex-col items-center justify-center relative cursor-pointer"
            id="captcha-container"
            onClick={fetchCaptcha}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Backend generated captcha image */}
            {captchaImg ? (
              <img
                id="captcha-image"
                src={captchaImg}
                alt="验证码"
                className="w-full h-full object-cover captcha-image"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-gray-400 animate-pulse text-base font-medium">
                <svg className="animate-spin h-5 w-5 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                加载中...
              </span>
            )}
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-30 rounded-lg transition duration-200">
                <div className="w-[120px] h-[38px] flex items-center justify-center font-medium text-blue-500 text-base" id="captcha-tooltip">
                  看不清？换一张
                </div>
              </div>
            )}
          </div>
        </div>
        <p id="captcha-validation" className="mt-1 text-xs text-red-500 hidden">请输入验证码</p>
        {/* Hidden input for captcha key */}
        <input type="hidden" id="captcha-key" name="captcha-key" value={captchaKey} />
      </div>


      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            className="w-4 h-4 border-2 border-gray-300 rounded text-primary focus:ring-0"
          />
          <span className="ml-2 text-sm text-gray-600">记住密码</span>
        </label>
        <Link to="/forget-password" className="text-sm text-primary hover:text-secondary">忘记密码？</Link>
      </div>
      <button
        type="submit"
        id="loginButton"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition "
      >
        登 录
      </button>

      <div className="text-center text-sm text-gray-600">
        还没有账号？<Link to="/register" className="text-primary hover:text-secondary">立即注册</Link>
      </div>
    </form>
  );
};

export default Hero;
