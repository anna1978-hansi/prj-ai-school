import React from 'react';

const EmailModal = ({ isVisible = false }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-lg rounded-lg p-6 w-[400px] shadow-lg border border-blue-100">
                <h3 className="text-lg font-medium mb-4">修改邮箱</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">新邮箱地址</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="请输入新的邮箱地址" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">验证码</label>
                        <div className="flex space-x-2">
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="请输入验证码" />
                            <button className="px-4 py-2 !rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none hover:from-blue-600 hover:to-cyan-600">
                                获取验证码
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 !rounded-button whitespace-nowrap">取消</button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 !rounded-button whitespace-nowrap">
                            确认修改
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;
