import React from 'react';

const PasswordModal = ({ isVisible = false }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-lg rounded-lg p-6 w-[400px] shadow-lg border border-blue-100">
                <h3 className="text-lg font-medium mb-4">修改密码</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="请输入当前密码" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="请输入新密码" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="请再次输入新密码" />
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

export default PasswordModal;
