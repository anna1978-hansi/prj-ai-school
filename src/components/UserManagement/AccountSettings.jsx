import React from 'react';
import SettingsCard from './SettingsCard';

const AccountSettings = () => {
    const userEmail = 'zhanglihua@example.com';

    return (
        <div className="flex-1 p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-8">
                <button className="text-gray-600 hover:text-primary mr-4">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                账号管理
            </h2>

            <div className="space-y-8">
                {/* Email Binding Card */}
                <SettingsCard title="邮箱绑定">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 mb-1">当前绑定邮箱</p>
                            <p className="text-gray-900">{userEmail}</p>
                        </div>
                        <button className="px-4 py-2 !rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none hover:from-blue-600 hover:to-cyan-600">
                            修改邮箱
                        </button>
                    </div>
                </SettingsCard>

                {/* Password Settings Card */}
                <SettingsCard title="密码设置">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">建议您定期修改密码，保证账号安全</p>
                        </div>
                        <button className="px-4 py-2 !rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none hover:from-blue-600 hover:to-cyan-600">
                            修改密码
                        </button>
                    </div>
                </SettingsCard>

                {/* Account Deactivation Card */}
                <SettingsCard title="账号注销">
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 text-red-600 p-4 rounded-md border border-red-100">
                            <p className="font-medium mb-2">注意：账号注销后将无法恢复</p>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>您的所有数据将被永久删除</li>
                                <li>您将无法使用此账号登录</li>
                                <li>与此账号相关的所有服务将终止</li>
                            </ul>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 !rounded-button whitespace-nowrap">
                            注销账号
                        </button>
                    </div>
                </SettingsCard>
            </div>
        </div>
    );
};

export default AccountSettings;
