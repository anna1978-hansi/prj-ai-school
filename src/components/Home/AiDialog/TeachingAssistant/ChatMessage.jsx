// ChatMessage.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({
    isAI,
    avatarIcon,
    content,
    timestamp,
    children,
    onCopy,
    onEdit,
    isEditable,
    isEditing,
    onEditChange,
    onEditSave,
    onEditCancel
}) => {
    const [copied, setCopied] = useState(false);
    const [editValue, setEditValue] = useState(content);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        }
        if (onCopy) onCopy(content);
    };

    const handleEdit = () => {
        setEditValue(content);
        if (onEdit) onEdit();
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
        if (onEditChange) onEditChange(e.target.value);
    };

    const handleEditSave = () => {
        if (onEditSave) onEditSave(editValue);
    };

    const handleEditCancel = () => {
        setEditValue(content);
        if (onEditCancel) onEditCancel();
    };

    if (isAI) {
        return (
            <div className="flex items-start group relative">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center shadow-md">
                    <i className={`fas ${avatarIcon} text-white text-lg`}></i>
                </div>
                <div className="ml-4 mb-4 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl chat-message shadow-sm border border-indigo-100 relative">
                    <div>
                        {content && (
                            <div className="text-gray-800 text-lg font-medium">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        )}
                        {timestamp && (
                            <div className="mt-2 text-xs text-gray-500">
                                {formatTime(timestamp)}
                            </div>
                        )}
                    </div>
                    {/* 复制按钮，绝对定位右下角，hover气泡时渐显 */}
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
                            onClick={handleCopy}
                            title="复制"
                        >
                            <i className="fas fa-copy text-base"></i>
                        </button>
                    </div>
                    {copied && (
                        <span className="absolute bottom-2 right-12 text-xs text-primary bg-white px-2 py-1 rounded shadow z-20">已复制</span>
                    )}
                </div>
            </div>
        );
    }

    // 用户消息
    return (
        <div className="flex items-start justify-end group relative">
            <div className="mr-4 mb-4 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl chat-message shadow-sm border border-blue-200 max-w-[80%] relative">
                {isEditing ? (
                    <div>
                        <textarea
                            className="w-full border rounded p-2 text-gray-800 text-lg font-medium mb-2"
                            value={editValue}
                            onChange={handleEditChange}
                            rows={Math.max(3, editValue.split('\n').length)}
                        />
                        <div className="flex gap-2 mt-1">
                            <button
                                className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 text-xs"
                                onClick={handleEditSave}
                            >保存</button>
                            <button
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                                onClick={handleEditCancel}
                            >取消</button>
                        </div>
                    </div>
                ) : (
                    <>
                        {content && (
                            <div className="text-gray-800 text-lg font-medium">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        )}
                        {/* 时间靠下，按钮组右下但有间距 */}
                        <div className="flex items-end justify-between mt-2">
                            <div className="text-xs text-gray-500 text-right select-none" style={{ minWidth: 48 }}>
                                {timestamp && formatTime(timestamp)}
                            </div>
                            <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
                                    onClick={handleCopy}
                                    title="复制"
                                >
                                    <i className="fas fa-copy text-sm"></i>
                                </button>
                                {!isAI && isEditable && !isEditing && (
                                    <button
                                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
                                        onClick={handleEdit}
                                        title="修改"
                                    >
                                        <i className="fas fa-pen text-sm"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                        {copied && (
                            <span className="absolute bottom-2 right-16 text-xs text-primary bg-white px-2 py-1 rounded shadow z-20">已复制</span>
                        )}
                    </>
                )}
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center shadow-md">
                <i className="fas fa-user text-white text-lg"></i>
            </div>
        </div>
    );
};

export default ChatMessage;
