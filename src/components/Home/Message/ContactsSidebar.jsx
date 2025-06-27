import React from 'react';

const contacts = [
  {
    id: 1,
    name: '张雨晴',
    avatar: 'https://mastergo.com/ai/api/search-image?query=A professional portrait photo of a young Asian woman with a gentle smile, wearing business attire, high-quality headshot style&width=80&height=80&orientation=squarish',
    lastMessage: '好的，那我们下午 3 点会议室见',
    time: '14:30',
    online: true,
    pinned: true,
  },
  {
    id: 2,
    name: '李明宇',
    avatar: 'https://ai-public.mastergo.com/ai/img_res/55660ae4530cfcaacbea7d7f11a7d8c1.jpg',
    lastMessage: '项目进度报告已经发送到您的邮箱',
    time: '昨天',
    online: false,
    pinned: false,
  },
  {
    id: 3,
    name: '王思琪',
    avatar: 'https://ai-public.mastergo.com/ai/img_res/50b52d4b5d7f1b695bef24cc968e03af.jpg',
    lastMessage: '设计稿已经更新，麻烦查看一下',
    time: '昨天',
    online: true,
    pinned: false,
  },
];

const ContactsSidebar = () => {
  return (
    <div className="w-[320px] border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        {/* 顶部tab */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg mb-4 w-full">
          <button className="flex-1 py-2 text-sm font-medium focus:outline-none !rounded-button" data-active="true">
            <div className="relative">
              消息
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
            </div>
          </button>
          <button className="flex-1 py-2 text-sm text-gray-500 font-medium focus:outline-none hover:text-gray-900 !rounded-button">
            <div className="relative">收到的赞</div>
          </button>
          <button className="flex-1 py-2 text-sm text-gray-500 font-medium focus:outline-none hover:text-gray-900 !rounded-button">
            <div className="relative">回复我的</div>
          </button>
        </div>
        {/* 搜索框 */}
        <div className="relative">
          <input type="text" placeholder="搜索联系人" className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg text-sm" />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      {/* 联系人列表 */}
      <div className="contacts-list flex-1 overflow-y-auto" id="contactsList">
        {contacts.map((c) => (
          <div key={c.id} className={`contact-item p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 relative ${c.pinned ? 'bg-yellow-50' : ''}`} data-pinned={c.pinned}>
            {c.pinned && <span className="absolute top-2 right-2 text-xs">📌</span>}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={c.avatar} className="w-12 h-12 rounded-full object-cover" alt={c.name} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${c.online ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{c.name}</h3>
                  <span className="text-xs text-gray-500">{c.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{c.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsSidebar; 