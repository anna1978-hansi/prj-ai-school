import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ 引入 useLocation

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ 当前路径信息

    const handleNavigate = (path) => {
        navigate(`/home/${path}`);
    };

    // 导航项数组
    const navItems = [
        { id: 'courses', path: 'course', label: '课程' },
        { id: 'repository', path: 'repository', label: '个人仓库' },
        { id: 'tools', path: 'aiDialog', label: 'AI 教学工具' },
        { id: 'community', path: 'resource', label: '资源社区' },
        { id: 'message', path: 'message', label: '消息' },
    ];

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                        {/* Logo */}
                        <button onClick={() => navigate('/')}>
                            <img src="../img/logo.png" width="150" alt="Logo" />
                        </button>

                        {/* ✅ 动态渲染导航按钮（已加当前路径判断） */}
                        <div className="flex space-x-8">
                            {navItems.map((item) => {
                                const isActive = location.pathname.startsWith(`/home/${item.path}`)
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigate(item.path)}
                                        className={`nav-item px-2 py-1 text-base transition-colors rounded 
                                            ${isActive
                                                ? 'text-primary font-semibold border-b-2 border-primary'
                                                : 'text-gray-300 hover:text-primary'}`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 右侧通知铃铛 */}
                    <div className="relative group">
                        <button
                            id="messageAlert"
                            className="!rounded-button relative p-3 hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            <i className="fas fa-bell text-gray-600 text-lg" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>

                        <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg p-3 z-20 opacity-0 transform scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100">
                            <p className="text-sm text-gray-600">您有 3 条未读取通知</p>
                        </div>
                    </div>

                    {/* 个人中心 */}
                    <button className="rounded-full px-5 py-3 text-base text-gray-600 bg-white hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md flex items-center space-x-2">
                        <a id="jumpPersonalCenter" className="flex items-center space-x-2">
                            <i className="fas fa-user text-xl text-gray-600 hover:text-gray-800"></i>
                            <span>个人中心</span>
                        </a>
                    </button>

                    {/* 头像下拉 */}
                    <div className="relative group">
                        <button>
                            <a id="jumpPersonalCenter">
                                <img
                                    src="https://ai-public.mastergo.com/ai/img_res/350557424808b797c2bfbc14cc0a722c.jpg"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    alt="用户头像"
                                />
                            </a>
                        </button>

                        <div
                            id="dropdown-menu"
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-20 opacity-0 transform scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                        >
                            <div className="p-3 border-b border-gray-100">
                                <div className="font-medium text-gray-900">张丽华</div>
                                <div className="text-xs text-gray-500">副教授</div>
                            </div>

                            <button
                                id="jumpAccountManagement"
                                className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition duration-200 ease-in-out"
                            >
                                账号设置
                            </button>

                            <button
                                id="logoutLink"
                                className="block px-3 py-2 text-sm text-red-600 hover:bg-gray-50 rounded transition duration-200 ease-in-out"
                            >
                                退出登录
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
