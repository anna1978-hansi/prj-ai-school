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
            timestamp: new Date()
        }
    ]);

    // 让 ChatPanel 能通过 window.setMessagesFromChatPanel 更新消息
    useEffect(() => {
        window.setMessagesFromChatPanel = setMessages;
        return () => { window.setMessagesFromChatPanel = undefined; };
    }, []);

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

    // AI流式生成中断控制
    const aiAbortController = useRef(null);
    const [generatingAIId, setGeneratingAIId] = useState(null); // 当前流式生成的AI消息id
    const [aiInterruptedId, setAiInterruptedId] = useState(null); // 记录被中断的AI消息id

    // 发送消息到通义千问API（支持中断）
    const handleSendMessage = async (message, aiMsgIdToOverwrite = null) => {
        if (!message.trim()) return;

        // 用同一个时间戳生成id，确保唯一且配对
        const baseId = Date.now();

        // 添加用户消息（仅在非覆盖模式下）
        let userMessageId = baseId;
        if (!aiMsgIdToOverwrite) {
            const userMessage = {
                id: baseId,
                isAI: false,
                content: message,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMessage]);
            setInputValue('');
        } else {
            // 覆盖模式下，直接更新用户消息内容
            setMessages(prev => prev.map(msg =>
                msg.id === aiMsgIdToOverwrite.userId ? { ...msg, content: message } : msg
            ));
            userMessageId = aiMsgIdToOverwrite.userId;
        }
        setIsTyping(true);

        // AI消息：如果是覆盖模式，直接覆盖原AI消息，否则插入新AI消息
        const aiMessageId = aiMsgIdToOverwrite ? aiMsgIdToOverwrite.aiId : baseId + 1;
        if (!aiMsgIdToOverwrite) {
            const aiMessage = {
                id: aiMessageId,
                isAI: true,
                avatarIcon: "fa-robot",
                content: "",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } else {
            setMessages(prev => prev.map(msg =>
                msg.id === aiMsgIdToOverwrite.aiId ? { ...msg, content: "" } : msg
            ));
        }
        setGeneratingAIId(aiMessageId);
        setAiInterruptedId(null);

        // 支持中断
        if (aiAbortController.current) aiAbortController.current.abort();
        aiAbortController.current = new AbortController();
        const signal = aiAbortController.current.signal;

        try {
            const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer sk-26017e0b3b2a444e951243e4f9d6ea6e"
                },
                body: JSON.stringify({
                    model: "qwen-plus",
                    stream: true,
                    messages: [
                        {
                            role: "system",
                            content: "你是一个专业的教学助手，可以为教师提供教学建议、课程设计、教学方法等方面的帮助。请用中文回答，回答要专业、实用、有条理。"
                        },
                        { role: "user", content: message }
                    ]
                }),
                signal
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk
                    .split("\n")
                    .filter(line => line.trim().startsWith("data: "))
                    .map(line => line.replace("data: ", "").trim());

                for (const line of lines) {
                    if (line === "[DONE]") break;

                    try {
                        const json = JSON.parse(line);
                        const delta = json.choices?.[0]?.delta?.content;
                        if (delta) {
                            fullContent += delta;
                            // 覆盖AI消息内容
                            setMessages(prev => prev.map(msg =>
                                msg.id === aiMessageId
                                    ? { ...msg, content: fullContent }
                                    : msg
                            ));
                        }
                    } catch (e) {
                        console.error("解析API响应出错：", line, e);
                    }
                }
            }
        } catch (error) {
            if (signal.aborted) {
                // 只保留已生成内容，不追加提示
                setAiInterruptedId(aiMessageId);
            } else {
                setMessages(prev => prev.map(msg =>
                    msg.id === aiMessageId
                        ? { ...msg, content: "抱歉，服务暂时不可用" }
                        : msg
                ));
            }
        } finally {
            setIsTyping(false);
            setGeneratingAIId(null);
        }
    };

    // 用户消息修改：直接覆盖用户消息和AI回复
    const handleEditUserMessage = async (userMsgId, newContent) => {
        // 找到紧跟其后的AI消息id
        const userIdx = messages.findIndex(msg => msg.id === userMsgId);
        let aiId = null;
        for (let i = userIdx + 1; i < messages.length; i++) {
            if (messages[i].isAI) { aiId = messages[i].id; break; }
        }
        if (aiId) {
            await handleSendMessage(newContent, { userId: userMsgId, aiId });
        }
    };

    // 停止AI回复
    const handleStopAIResponse = () => {
        if (aiAbortController.current) aiAbortController.current.abort();
    };

    // 新建对话
    const handleCreateNewChat = () => {
        const newChat = {
            id: `chat${Date.now()}`,
            title: `新对话 ${new Date().toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        };

        setChatHistoryList(prev => [newChat, ...prev]);
        setSelectedChat(newChat.id);
        // 只插入欢迎语
        setMessages([
            {
                id: Date.now(),
                isAI: true,
                avatarIcon: "fa-robot",
                content: "您好！我是AI智能助手",
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

    // 删除对话历史
    const handleDeleteChat = (chatId) => {
        setChatHistoryList(prev => {
            const idx = prev.findIndex(c => c.id === chatId);
            const newList = prev.filter(c => c.id !== chatId);
            // 自动切换到下一个或第一个对话
            if (selectedChat === chatId) {
                if (newList.length > 0) {
                    setSelectedChat(newList[Math.min(idx, newList.length - 1)].id);
                } else {
                    setSelectedChat(null);
                }
            }
            return newList;
        });
    };

    // 重命名对话历史
    const handleRenameChat = (chatId, newTitle) => {
        setChatHistoryList(prev => prev.map(chat =>
            chat.id === chatId ? { ...chat, title: newTitle } : chat
        ));
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
        <div className="bg-gray-50 w-full">
            {/*<Header />*/}
            <main className="mx-auto ">
                <div className="flex h-[calc(100vh-6rem)] gap-4 py-4">
                    <ChatHistorySidebar
                        expanded={sidebarExpanded}
                        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
                        chatHistory={chatHistoryList}
                        selectedChat={selectedChat}
                        onSelectChat={handleSelectChat}
                        onCreateNewChat={handleCreateNewChat}
                        onDeleteChat={handleDeleteChat}
                        onRenameChat={handleRenameChat}
                    />
                    <div className="flex flex-1 gap-4">
                        <ChatPanel
                            messages={messages}
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            onSendMessage={handleSendMessage}
                            isTyping={isTyping}
                            chatEndRef={chatEndRef}
                            onEditUserMessage={handleEditUserMessage}
                            generatingAIId={generatingAIId}
                            onStopAIResponse={handleStopAIResponse}
                            aiInterruptedId={aiInterruptedId}
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
