import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <div className="relative">
          <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="邮箱"
            id="email"
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
            id="password"
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
            />
          </div>
          <div className="captcha-container h-[46px] w-[140px] bg-gray-100 rounded-button overflow-hidden flex flex-col items-center justify-center relative cursor-pointer" id="captcha-container">
            {/* Backend generated captcha image */}
            <img id="captcha-image" src="#" alt="验证码" className="w-full h-full object-cover captcha-image" />
            {/* Tooltip */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[120px] h-[38px] bg-gradient-to-c from-black via-transparent to-transparent bg-opacity-50 rounded-lg flex items-center justify-center text-white font-medium" id="captcha-tooltip">
                看不清？换一张
              </div>
            </div>
          </div>
        </div>
        <p id="captcha-validation" className="mt-1 text-xs text-red-500 hidden">请输入验证码</p>
        {/* Hidden input for captcha key */}
        <input type="hidden" id="captcha-key" name="captcha-key" />
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
        className="w-full bg-blue-500 rounded-md hover:bg-secondary text-white py-3 rounded-button transition duration-300 whitespace-nowrap"
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
