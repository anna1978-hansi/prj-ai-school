import React from 'react';

const NavLink = ({ href = "#", icon, text, isActive = false }) => (
    <a href={href} className={`flex items-center px-4 py-2 rounded-md ${isActive ? 'text-primary bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
        <i className={`${icon} w-5 h-5 flex items-center justify-center mr-3`}></i>
        {text}
    </a>
);

const Sidebar = () => {
    const user = {
        name: '张丽华',
        school: '清华大学附属中学',
        avatar: 'https://ai-public.mastergo.com/ai/img_res/350557424808b797c2bfbc14cc0a722c.jpg',
    };

    return (
        <div className="w-[240px] border-r border-gray-200 bg-white/80 backdrop-blur-sm p-6">
            <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-primary/20">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-gray-900 font-medium">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.school}</p>
            </div>
            <nav className="space-y-2">
                <NavLink icon="fas fa-user-circle" text="账号管理" isActive={true} />
                <NavLink icon="fas fa-id-card" text="个人信息" />
                <NavLink icon="fas fa-bell" text="通知设置" />
            </nav>
        </div>
    );
};

export default Sidebar;
