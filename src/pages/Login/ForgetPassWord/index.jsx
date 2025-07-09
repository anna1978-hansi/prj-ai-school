import React, { useState } from 'react';
import { sendVerificationCode, forgetPasswordUpdate } from '../../../api/teachers';

const ForgetPassWord = () => {
    const [email, setEmail] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleGetCaptcha = async () => {
        const emailTrimmed = email.trim();
        if (!emailTrimmed) {
            alert('请先输入邮箱地址');
            return;
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailTrimmed)) {
            alert('请输入正确的邮箱格式');
            return;
        }
        try {
            await sendVerificationCode(emailTrimmed);
            alert('验证码已发送，请查收邮箱！');
        } catch (error) {
            alert('获取验证码失败，请重试');
        }
    };

    // 校验密码规则
    const validatePassword = (pwd) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(pwd);
    };

    // 重置密码按钮点击
    const handleResetPassword = async () => {
        if (!email.trim()) {
            alert('请先输入邮箱地址');
            return;
        }
        if (!captcha.trim()) {
            alert('请先输入验证码');
            return;
        }
        if (!password.trim()) {
            alert('请先输入新密码');
            return;
        }
        if (!validatePassword(password)) {
            alert('密码需包含字母和数字，长度8-20位');
            return;
        }
        if (password !== confirmPassword) {
            alert('两次输入的新密码不一致');
            return;
        }
        try {
            await forgetPasswordUpdate({ email: email.trim(), captcha: captcha.trim(), password: password.trim() });
            alert('密码重置成功，请返回登录！');
            // 可选：跳转到登录页
        } catch (error) {
            alert('重置密码失败，请检查信息后重试');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/img/login.jpg')] bg-cover bg-center">
            <div className="bg-white bg-opacity-95 p-16 rounded-2xl shadow-2xl w-full max-w-xl mx-4 relative min-h-[700px]">
                {/* 顶部icon和标题 */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-100 rounded-full p-4 mb-3">
                        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H7m5 0h5" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">忘记密码</h2>
                    <div className="text-gray-500 text-base">请完成身份验证以重置密码</div>
                </div>
                {/* 表单内容 */}
                <form className="space-y-6">
                    {/* 邮箱 */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2 text-base">邮箱地址</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input type="email" id="email" name="email" placeholder="请输入邮箱地址"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                    {/* 验证码 */}
                    <div>
                        <label htmlFor="code" className="block text-gray-700 mb-2 text-base">验证码</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-shield-alt"></i>
                                </span>
                                <input type="text" id="code" name="code" placeholder="请输入验证码"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                    value={captcha} onChange={e => setCaptcha(e.target.value)} />
                            </div>
                            <button type="button" onClick={handleGetCaptcha} className="px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-base whitespace-nowrap">获取邮箱验证码</button>
                        </div>
                    </div>
                    {/* 新密码 */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-2 text-base">新密码</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" id="password" name="password" placeholder="请设置新密码"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-2">密码需包含字母和数字，长度8-20位</div>
                    </div>
                    {/* 确认新密码 */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 text-base">确认新密码</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="请再次输入新密码"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                    </div>
                    {/* 重置密码按钮 */}
                    <button type="button" onClick={handleResetPassword} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition mt-8">重置密码</button>
                </form>
                {/* 返回登录 */}
                <div className="text-center mt-8">
                    <a href="/login" className="text-blue-500 hover:underline text-base">返回登录</a>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassWord;
