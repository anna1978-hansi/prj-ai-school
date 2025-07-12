import React, { useState, useRef, useEffect } from 'react';

import ChatHistorySidebar from "@/components/Home/AiDialog/TeachingAssistant/ChatHistorySidebar.jsx";
import ChatPanel from "@/components/Home/AiDialog/TeachingAssistant/ChatPanel.jsx";
import TeachingDesignPanel from "@/components/Home/AiDialog/TeachingAssistant/TeachingDesignPanel.jsx";
import { chatHistory, teachingDesignData } from "@/components/Home/AiDialog/TeachingAssistant/data.jsx";

const TeachingAssistant = () => {
    // 侧边栏展开状态
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    // 聊天消息状态
    const [messages, setMessages] = useState([
        {
            id: 1,
            isAI: true,
            avatarIcon: "fa-robot",
            content: "您好！我是AI智能助手",
            details: "我可以为您提供个性化的教学建议和资源。请问您需要什么帮助？",
            timestamp: new Date()
        }
    ]);

    // 教学设计表单数据
    const [designData, setDesignData] = useState(teachingDesignData);

    // 当前选中的聊天历史
    const [selectedChat, setSelectedChat] = useState(null);

    // 输入框状态
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // 教学设计面板显示状态
    const [showDesignPanel, setShowDesignPanel] = useState(true);

    // 聊天历史列表
    const [chatHistoryList, setChatHistoryList] = useState(chatHistory);

    // 自动滚动到底部
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 发送消息
    const handleSendMessage = async (message) => {
        if (!message.trim()) return;

        // 添加用户消息
        const userMessage = {
            id: Date.now(),
            isAI: false,
            content: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // 模拟AI回复
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                isAI: true,
                avatarIcon: "fa-robot",
                content: "我收到了您的消息",
                details: "正在为您分析并提供建议...",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000);
    };

    // 新建对话
    const handleCreateNewChat = () => {
        const newChat = {
            id: `chat${Date.now()}`,
            title: `新对话 ${new Date().toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        };

        setChatHistoryList(prev => [newChat, ...prev]);
        setSelectedChat(newChat.id);
        setMessages([
            {
                id: Date.now(),
                isAI: true,
                avatarIcon: "fa-robot",
                content: "您好！我是AI智能助手",
                details: "我可以为您提供个性化的教学建议和资源。请问您需要什么帮助？",
                timestamp: new Date()
            }
        ]);
    };

    // 选择聊天历史
    const handleSelectChat = (chatId) => {
        setSelectedChat(chatId);
        // 这里可以根据chatId加载对应的消息历史
        console.log('选择聊天:', chatId);
    };

    // 更新教学设计数据
    const handleDesignDataChange = (field, value) => {
        setDesignData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 保存教学设计
    const handleSaveDesign = () => {
        console.log('保存教学设计:', designData);
        // 这里可以添加保存到后端的逻辑
        alert('教学设计已保存！');
    };

    // 导出教学设计
    const handleExportDesign = () => {
        console.log('导出教学设计:', designData);
        // 这里可以添加导出逻辑
        alert('教学设计导出功能开发中...');
    };

    return (
        <div className="bg-gray-50">
            {/*<Header />*/}
            <main className="mx-auto max-w-screen-xl">
                <div className="flex h-[calc(100vh-6rem)] gap-4 py-4">
                    <ChatHistorySidebar
                        expanded={sidebarExpanded}
                        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
                        chatHistory={chatHistoryList}
                        selectedChat={selectedChat}
                        onSelectChat={handleSelectChat}
                        onCreateNewChat={handleCreateNewChat}
                    />
                    <div className="flex flex-1 gap-4">
                        <ChatPanel
                            messages={messages}
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            onSendMessage={handleSendMessage}
                            isTyping={isTyping}
                            chatEndRef={chatEndRef}
                        />
                        {showDesignPanel && (
                            <TeachingDesignPanel
                                data={designData}
                                onDataChange={handleDesignDataChange}
                                onSave={handleSaveDesign}
                                onExport={handleExportDesign}
                                onToggle={() => setShowDesignPanel(false)}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeachingAssistant;
