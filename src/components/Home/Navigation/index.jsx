import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        navigate(`/home/${path}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // 如果有用sessionStorage也可以加上
        // sessionStorage.clear();
        navigate('/');
    };

    const navItems = [
        { id: 'courses', path: 'course', label: '课程', icon: 'fas fa-book' },
        // { id: 'repository', path: 'repository', label: '个人仓库', icon: 'fas fa-folder' },
        { id: 'tools', path: 'aiDialog', label: 'AI 教学工具', icon: 'fas fa-robot' },
        { id: 'community', path: 'resource', label: '资源社区', icon: 'fas fa-users' },
        // { id: 'message', path: 'message', label: '消息', icon: 'fas fa-comments' },
        // { id: 'chat', path: 'chat', label: '聊天', icon: 'fas fa-comments' },
    ];

    return (
        <header className="bg-white border-b border-gray-200/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-8 py-5">
                <nav className="flex items-center justify-between">
                    {/* 左侧Logo和导航 */}
                    <div className="flex items-center space-x-12">
                        {/* Logo */}
                        <button
                            onClick={() => navigate('/')}
                            className="group transition-all duration-300 hover:scale-105"
                        >
                            <img
                                src="../img/logo.png"
                                width="160"
                                alt="Logo"
                                className="drop-shadow-sm"
                            />
                        </button>

                        {/* 导航菜单 */}
                        <div className="flex space-x-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname.startsWith(`/home/${item.path}`);
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigate(item.path)}
                                        className={`relative px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-in-out group text-center
                                            ${isActive
                                                ? 'bg-white text-blue-600 shadow-lg shadow-blue-100/50 border border-blue-200/50'
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-white/70 hover:shadow-md'}`}
                                    >
                                        <div className="flex items-center ">
                                            <i className={`${item.icon} text-lg ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`}></i>
                                            <span>{item.label}</span>
                                        </div>
                                        {isActive && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 右侧功能区 */}
                    <div className="flex items-center space-x-6">
                        {/* 通知铃铛 */}
                        <div className="relative group">
                            <button className="relative p-4 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-200/50">
                                <i className="fas fa-bell text-gray-600 text-xl" />
                                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 text-white text-sm rounded-full flex items-center justify-center font-medium shadow-sm">
                                    3
                                </span>
                            </button>

                            {/* 通知下拉 */}
                            <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                                <div className="p-5 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900 text-lg">通知中心</h3>
                                    <p className="text-base text-gray-500 mt-2">您有 3 条未读消息</p>
                                </div>
                                <div className="p-3">
                                    <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                                            <div className="flex-1">
                                                <p className="text-base font-medium text-gray-900">新课程发布</p>
                                                <p className="text-sm text-gray-500 mt-1">《人工智能导论》课程已上线</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 个人中心按钮 */}
                        <button className="hidden md:flex items-center space-x-3 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-gray-200/50" onClick={() => navigate('/user-management')}>
                            <i className="fas fa-user-circle text-xl text-gray-600"></i>
                            <span className="font-medium text-base">个人中心</span>
                        </button>

                        {/* 头像下拉 */}
                        <div className="relative group">
                            <button className="relative">
                                <img
                                    src="https://ai-public.mastergo.com/ai/img_res/350557424808b797c2bfbc14cc0a722c.jpg"
                                    className="w-12 h-12 rounded-full cursor-pointer ring-2 ring-white shadow-md hover:ring-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                                    alt="用户头像"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                            </button>

                            {/* 用户下拉菜单 */}
                            <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                                {/* 用户信息 */}
                                <div className="p-5 border-b border-gray-100">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src="https://ai-public.mastergo.com/ai/img_res/350557424808b797c2bfbc14cc0a722c.jpg"
                                            className="w-14 h-14 rounded-full"
                                            alt="用户头像"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900 text-lg">张丽华</div>
                                            <div className="text-base text-gray-500">副教授</div>
                                            <div className="text-sm text-blue-600 mt-1">在线</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 菜单项 */}
                                <div className="p-3">
                                    <button className="w-full flex items-center space-x-4 px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200">
                                        <i className="fas fa-user-cog text-gray-400 text-lg"></i>
                                        <span>账号设置</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-4 px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200">
                                        <i className="fas fa-cog text-gray-400 text-lg"></i>
                                        <span>偏好设置</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-4 px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200">
                                        <i className="fas fa-question-circle text-gray-400 text-lg"></i>
                                        <span>帮助中心</span>
                                    </button>
                                    <div className="border-t border-gray-100 my-3"></div>
                                    <button className="w-full flex items-center space-x-4 px-4 py-3 text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" onClick={handleLogout}>
                                        <i className="fas fa-sign-out-alt text-lg"></i>
                                        <span>退出登录</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
