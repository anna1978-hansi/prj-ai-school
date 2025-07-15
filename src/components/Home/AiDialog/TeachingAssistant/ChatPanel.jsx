// ChatPanel.js
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatPanel = ({
    messages = [],
    inputValue = '',
    onInputChange,
    onSendMessage,
    isTyping = false,
    chatEndRef,
    onEditUserMessage,
    generatingAIId,
    onStopAIResponse,
    aiInterruptedId
}) => {
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // 找到最后一条用户消息的id
    const lastUserMsgIndex = [...messages].reverse().findIndex(m => !m.isAI);
    const lastUserMsgId = lastUserMsgIndex !== -1 ? messages[messages.length - 1 - lastUserMsgIndex].id : null;

    // 复制功能（可扩展为提示）
    const handleCopy = (content) => { };

    // 修改功能（仅限用户消息）
    const handleEdit = (id, content) => {
        setEditingId(id);
        setEditingValue(content);
    };
    const handleEditChange = (val) => {
        setEditingValue(val);
    };
    const handleEditSave = async (id) => {
        if (editingValue.trim() && typeof onEditUserMessage === 'function') {
            await onEditUserMessage(id, editingValue);
        }
        setEditingId(null);
        setEditingValue('');
    };
    const handleEditCancel = () => {
        setEditingId(null);
        setEditingValue('');
    };

    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4" id="chatbox">
                <div className="flex flex-col space-y-4">
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            isAI={message.isAI}
                            avatarIcon={message.avatarIcon}
                            content={message.content}
                            timestamp={message.timestamp}
                            isEditable={
                                (!message.isAI && message.id === lastUserMsgId) ||
                                (message.isAI && message.id === aiInterruptedId)
                            }
                            isEditing={editingId === message.id}
                            onCopy={handleCopy}
                            onEdit={() => handleEdit(message.id, message.content)}
                            onEditChange={handleEditChange}
                            onEditSave={() => handleEditSave(message.id)}
                            onEditCancel={handleEditCancel}
                        />
                    ))}
                    {/* 滚动到底部的锚点 */}
                    <div ref={chatEndRef} />
                </div>
                {/* AI流式生成时显示“停止生成”按钮 */}
                {generatingAIId && (
                    <div className="flex justify-center mt-2">
                        <button
                            className="px-4 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-sm shadow"
                            onClick={onStopAIResponse}
                        >
                            <FontAwesomeIcon icon={faStop} className="mr-1" />停止生成
                        </button>
                    </div>
                )}
            </div>
            <ChatInput
                value={inputValue}
                onChange={onInputChange}
                onSend={onSendMessage}
            />
        </div>
    );
};

export default ChatPanel;
