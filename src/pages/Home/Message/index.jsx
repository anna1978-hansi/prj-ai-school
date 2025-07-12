import React, { useState, useEffect } from 'react';
import ContactsSidebar from '@/components/Home/Message/ContactsSidebar';
import ChatPanel from '@/components/Home/Message/ChatPanel';

const Message = () => {
  // 状态管理
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: '张雨晴',
      avatar: 'https://mastergo.com/ai/api/search-image?query=A professional portrait photo of a young Asian woman with a gentle smile, wearing business attire, high-quality headshot style&width=80&height=80&orientation=squarish',
      lastMessage: '好的，那我们下午 3 点会议室见',
      time: '14:30',
      online: true,
      pinned: true,
      messages: [
        { id: 1, fromMe: false, text: '你好，关于下午的会议，我们需要讨论一下议程安排', time: '10:15' },
        { id: 2, fromMe: true, text: '好的，我已经准备好相关材料了', time: '10:16' },
        { id: 3, fromMe: false, text: '我们 3 点在三楼会议室见面吧', time: '10:18' },
        { id: 4, fromMe: true, text: '好的，那我们下午 3 点会议室见', time: '10:20' },
      ]
    },
    {
      id: 2,
      name: '李明宇',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/55660ae4530cfcaacbea7d7f11a7d8c1.jpg',
      lastMessage: '项目进度报告已经发送到您的邮箱',
      time: '昨天',
      online: false,
      pinned: false,
      messages: [
        { id: 1, fromMe: false, text: '项目进度报告已经发送到您的邮箱', time: '昨天 15:30' },
        { id: 2, fromMe: true, text: '收到了，我会尽快查看', time: '昨天 16:00' },
      ]
    },
    {
      id: 3,
      name: '王思琪',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/50b52d4b5d7f1b695bef24cc968e03af.jpg',
      lastMessage: '设计稿已经更新，麻烦查看一下',
      time: '昨天',
      online: true,
      pinned: false,
      messages: [
        { id: 1, fromMe: false, text: '设计稿已经更新，麻烦查看一下', time: '昨天 14:20' },
        { id: 2, fromMe: true, text: '好的，我马上查看', time: '昨天 14:25' },
        { id: 3, fromMe: false, text: '有什么问题随时联系我', time: '昨天 14:30' },
      ]
    },
  ]);

  // 过滤联系人
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 选择联系人
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  // 发送消息
  const handleSendMessage = (messageText) => {
    if (!selectedContact || !messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      fromMe: true,
      text: messageText,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === selectedContact.id
          ? {
            ...contact,
            messages: [...contact.messages, newMessage],
            lastMessage: messageText,
            time: '刚刚'
          }
          : contact
      )
    );

    // 更新选中的联系人
    setSelectedContact(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: messageText,
      time: '刚刚'
    }));
  };

  // 切换标签
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 初始化时选择第一个联系人
  useEffect(() => {
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts]);

  return (
    <div className="flex justify-center items-start py-8 px-4">
      <div className="chat-container w-[75vw] h-[80vh] flex rounded-xl overflow-hidden bg-white shadow-lg">
        <ContactsSidebar
          contacts={filteredContacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <ChatPanel
          selectedContact={selectedContact}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Message; 