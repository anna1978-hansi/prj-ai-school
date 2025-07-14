// ChatHistorySidebar.js
import React, { useState } from 'react';

const ChatHistorySidebar = ({
    expanded = false,
    onToggle,
    chatHistory = [],
    selectedChat = null,
    onSelectChat,
    onCreateNewChat,
    onDeleteChat,
    onRenameChat // 新增
}) => {
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleNewChat = () => {
        if (onCreateNewChat) {
            onCreateNewChat();
        }
    };
    const handleDeleteChat = (id, e) => {
        e.stopPropagation();
        if (onDeleteChat) onDeleteChat(id);
    };
    const handleEditChat = (id, title, e) => {
        e.stopPropagation();
        setEditingId(id);
        setEditValue(title);
    };
    const handleEditChange = (e) => setEditValue(e.target.value);
    const handleEditBlur = (id) => {
        if (onRenameChat && editValue.trim()) onRenameChat(id, editValue.trim());
        setEditingId(null);
    };
    const handleEditKeyDown = (id, e) => {
        if (e.key === 'Enter') {
            handleEditBlur(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
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
                        <div key={chat.id} className="relative group flex items-center">
                            {editingId === chat.id ? (
                                <input
                                    className="block w-full text-left p-3 rounded-lg text-sm border border-primary focus:ring-primary focus:border-primary outline-none"
                                    value={editValue}
                                    autoFocus
                                    onChange={handleEditChange}
                                    onBlur={() => handleEditBlur(chat.id)}
                                    onKeyDown={e => handleEditKeyDown(chat.id, e)}
                                />
                            ) : (
                                <button
                                    onClick={() => onSelectChat(chat.id)}
                                    className={`block w-full text-left p-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 truncate transition-colors ${selectedChat === chat.id ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
                                >
                                    {chat.title}
                                </button>
                            )}
                            {/* 编辑按钮 */}
                            {editingId !== chat.id && (
                                <button
                                    className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary p-1"
                                    title="重命名"
                                    onClick={e => handleEditChat(chat.id, chat.title, e)}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                            )}
                            {/* 删除按钮 */}
                            <button
                                className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1"
                                title="删除对话"
                                onClick={e => handleDeleteChat(chat.id, e)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
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
