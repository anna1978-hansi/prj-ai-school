import React, { useState } from 'react';
import { sendVerificationCode, registerTeacher } from '../../../api/teachers';

const schoolOptions = [
    { id: 1, name: '清华大学' },
    { id: 2, name: '北京大学' },
    { id: 3, name: '复旦大学' },
    { id: 4, name: '浙江大学' },
    // 可根据实际情况添加
];

const Register = () => {
    const [form, setForm] = useState({
        jobId: '',
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
        schoolId: '',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    // 发送验证码
    const handleSendCode = async () => {
        if (!form.email) {
            alert('请先输入邮箱');
            return;
        }
        try {
            const res = await sendVerificationCode(form.email);
            console.log('验证码发送结果:', res);
        } catch (err) {
            console.error('发送验证码失败:', err);
        }
    };
    // 校验函数
    const validate = (field) => {
        const newErrors = { ...errors };
        // 工号校验：6-10位数字
        if (field === 'jobId' || !field) {
            if (!/^\d{6,10}$/.test(form.jobId)) {
                newErrors.jobId = '教职工号需为6-10位数字';
            } else {
                delete newErrors.jobId;
            }
        }
        // 邮箱校验
        if (field === 'email' || !field) {
            if (!/^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-])+\.[a-zA-Z0-9-.]+$/.test(form.email)) {
                newErrors.email = '请输入有效的邮箱地址';
            } else {
                delete newErrors.email;
            }
        }
        // 密码校验：8-20位，字母+数字
        if (field === 'password' || !field) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(form.password)) {
                newErrors.password = '密码需为8-20位字母和数字组合';
            } else {
                delete newErrors.password;
            }
        }
        // 确认密码
        if (field === 'confirmPassword' || !field) {
            if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = '两次输入的密码不一致';
            } else {
                delete newErrors.confirmPassword;
            }
        }
        setErrors(newErrors);
        return newErrors;
    };
    // 注册
    const handleRegister = async () => {
        setTouched({ jobId: true, email: true, code: true, password: true, confirmPassword: true, schoolId: true });
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) return;
        if (!form.code || !form.schoolId) {
            alert('请填写完整信息');
            return;
        }
        // 构造后端需要的对象
        const data = {
            facultyId: form.jobId,
            email: form.email,
            captcha: form.code,
            password: form.password,
            schoolId: Number(form.schoolId),
        };
        try {
            const res = await registerTeacher(data);
            if (res.code === 200) {
                alert('注册成功');
                // 可跳转到登录页
            } else {
                alert(res.msg || '注册失败');
            }
        } catch (err) {
            alert('注册失败');
            console.error('注册失败:', err);
        }
    };
    // 统一处理输入变化
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    // 失去焦点时校验
    const handleBlur = e => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/img/login.jpg')] bg-cover bg-center">
            <div className="bg-white bg-opacity-95 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-xl">
                {/* 顶部icon和标题 */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 rounded-full p-3 mb-2">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H7m5 0h5" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">欢迎加入智教云备</h2>
                    <div className="text-gray-500 text-sm">智慧教学，云端备课，让教育更出彩</div>
                </div>
                {/* 表单内容 */}
                <form className="space-y-5">
                    {/* 工号 */}
                    <div>
                        <label htmlFor="jobId" className="block text-gray-700 mb-1">教师工号<span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-id-badge"></i>
                            </span>
                            <input type="text" id="jobId" name="jobId" placeholder="请输入教师工号"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={form.jobId} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {touched.jobId && errors.jobId && <div className="text-xs text-red-500 mt-1">{errors.jobId}</div>}
                    </div>
                    {/* 邮箱 */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1">邮箱地址<span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input type="email" id="email" name="email" placeholder="请输入邮箱地址"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={form.email} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {touched.email && errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
                    </div>
                    {/* 验证码 */}
                    <div>
                        <label htmlFor="code" className="block text-gray-700 mb-1">输入验证码<span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-shield-alt"></i>
                                </span>
                                <input type="text" id="code" name="code" placeholder="请输入邮箱验证码"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                    value={form.code} onChange={handleChange} />
                            </div>
                            <button type="button" className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm whitespace-nowrap" onClick={handleSendCode}>邮箱验证码</button>
                        </div>
                    </div>
                    {/* 密码 */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-1">设置密码</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" id="password" name="password" placeholder="密码需包含字母和数字，长度8-20位"
                                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={form.password} onChange={handleChange} onBlur={handleBlur} />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">密码需包含字母和数字，长度8-20位</div>
                        {touched.password && errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
                    </div>
                    {/* 确认密码 */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">确认密码</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="请再次输入密码"
                                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required
                                value={form.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                <i className="fas fa-eye"></i>
                            </span>
                        </div>
                        {touched.confirmPassword && errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
                    </div>
                    {/* 所属学校 */}
                    <div>
                        <label htmlFor="school" className="block text-gray-700 mb-1">所属学校</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-university"></i>
                            </span>
                            <select id="school" name="schoolId" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white" required value={form.schoolId} onChange={handleChange}>
                                <option value="">请选择学校</option>
                                {schoolOptions.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* 注册按钮 */}
                    <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-base transition" onClick={handleRegister}>立即注册</button>
                </form>
                {/* 已有账号/去登录 */}
                <div className="text-center mt-6 text-sm text-gray-600">
                    已有账号？<a href="/login" className="text-blue-500 hover:underline ml-1">立即登录</a>
                </div>
                {/* 协议说明 */}
                <div className="text-center text-xs text-gray-400 mt-4">
                    注册即表示同意 <a href="#" className="text-blue-400 hover:underline">《用户协议》</a> 和 <a href="#" className="text-blue-400 hover:underline">《隐私政策》</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
