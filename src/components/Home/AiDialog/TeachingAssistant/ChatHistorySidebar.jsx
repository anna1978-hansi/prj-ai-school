// ChatHistorySidebar.js
import React from 'react';
import { chatHistory } from './data';

const ChatHistorySidebar = () => {
    // 在实际应用中，一个 state 会控制显示 mainPanel还是 miniPanel
    return (
        <div className="flex flex-col relative h-full transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm w-16 md:w-64">
            {/* 展开状态 (默认隐藏) */}
            <div className="hidden md:flex flex-1 flex-col p-4" id="mainPanel">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium truncate">对话历史</h2>
                    <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:text-primary"><i className="fas fa-plus"></i></button>
                        <button className="text-gray-500 hover:text-primary"><i className="fas fa-angle-double-left text-sm"></i></button>
                    </div>
                </div>
                <div className="space-y-2 overflow-y-auto flex-1">
                    {chatHistory.map(chat => (
                        <a key={chat.id} href="#" className="block p-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 truncate">
                            {chat.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* 折叠状态 */}
            <div className="flex flex-col items-center justify-between py-6 bg-white w-16" id="miniPanel">
                <div className="flex flex-col items-center space-y-8">
                    <button title="展开对话历史"><i className="fas fa-chevron-right text-gray-500 hover:text-primary text-lg"></i></button>
                </div>
                <div className="flex flex-col items-center space-y-8">
                    <button title="新对话"><i className="fas fa-plus text-gray-500 hover:text-primary text-lg"></i></button>
                    <button title="制作PPT"><i className="fas fa-file-powerpoint text-gray-500 hover:text-primary text-lg"></i></button>
                </div>
            </div>
        </div>
    );
};

export default ChatHistorySidebar;
