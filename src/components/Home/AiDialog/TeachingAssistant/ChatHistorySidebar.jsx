// ChatHistorySidebar.js
import React from 'react';

const ChatHistorySidebar = ({
    expanded = false,
    onToggle,
    chatHistory = [],
    selectedChat = null,
    onSelectChat,
    onCreateNewChat
}) => {
    const handleNewChat = () => {
        if (onCreateNewChat) {
            onCreateNewChat();
        }
    };

    const handleCreatePPT = () => {
        console.log('创建PPT功能');
        // 这里可以添加创建PPT的逻辑
    };

    return (
        <div className={`flex flex-col relative h-full transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm ${expanded ? 'w-64' : 'w-16'}`}>
            {/* 展开状态 */}
            <div className={`${expanded ? 'flex' : 'hidden'} flex-1 flex-col p-4`} id="mainPanel">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium truncate">对话历史</h2>
                    <div className="flex items-center gap-2">
                        <button
                            className="text-gray-500 hover:text-primary"
                            onClick={handleNewChat}
                            title="新建对话"
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                        <button
                            className="text-gray-500 hover:text-primary"
                            onClick={onToggle}
                            title="收起侧边栏"
                        >
                            <i className="fas fa-angle-double-left text-sm"></i>
                        </button>
                    </div>
                </div>
                <div className="space-y-2 overflow-y-auto flex-1">
                    {chatHistory.map(chat => (
                        <button
                            key={chat.id}
                            onClick={() => onSelectChat(chat.id)}
                            className={`block w-full text-left p-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 truncate transition-colors ${selectedChat === chat.id ? 'bg-primary/10 text-primary border border-primary/20' : ''
                                }`}
                        >
                            {chat.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* 折叠状态 */}
            <div className={`${!expanded ? 'flex' : 'hidden'} flex-col items-center justify-between py-6 bg-white w-16`} id="miniPanel">
                <div className="flex flex-col items-center space-y-8">
                    <button
                        title="展开对话历史"
                        onClick={onToggle}
                        className="text-gray-500 hover:text-primary transition-colors"
                    >
                        <i className="fas fa-chevron-right text-lg"></i>
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-8">
                    <button
                        title="新对话"
                        onClick={handleNewChat}
                        className="text-gray-500 hover:text-primary transition-colors"
                    >
                        <i className="fas fa-plus text-lg"></i>
                    </button>
                    <button
                        title="制作PPT"
                        onClick={handleCreatePPT}
                        className="text-gray-500 hover:text-primary transition-colors"
                    >
                        <i className="fas fa-file-powerpoint text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatHistorySidebar;
