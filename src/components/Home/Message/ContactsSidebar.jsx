import React from 'react';

const ContactsSidebar = ({
  contacts,
  selectedContact,
  onContactSelect,
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'messages', label: '消息' },
    { id: 'likes', label: '收到的赞' },
    { id: 'replies', label: '回复我的' }
  ];

  const handleContactClick = (contact) => {
    onContactSelect(contact);
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
  };

  return (
    <div className="w-[320px] border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        {/* 顶部tab */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg mb-4 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-2 text-sm font-medium focus:outline-none !rounded-button ${activeTab === tab.id
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
                }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="relative">
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
        {/* 搜索框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索联系人"
            className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg text-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      {/* 联系人列表 */}
      <div className="contacts-list flex-1 overflow-y-auto" id="contactsList">
        {contacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? '没有找到匹配的联系人' : '暂无联系人'}
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 relative transition-colors ${contact.pinned ? 'bg-yellow-50' : ''
                } ${selectedContact?.id === contact.id ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                }`}
              data-pinned={contact.pinned}
              onClick={() => handleContactClick(contact)}
            >
              {contact.pinned && <span className="absolute top-2 right-2 text-xs">📌</span>}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover" alt={contact.name} />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.online ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsSidebar; 