// NotificationModal.js
import React from 'react';
import { notifications } from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const NotificationModal = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-50 flex opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out modal hidden">
            <div className="bg-white rounded-xl w-[480px] shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">消息列表</h2>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
                        <FontAwesomeIcon icon={faTimes} className="text-sm" />
                    </button>
                </div>
                <div className="max-h-[480px] overflow-y-auto">
                    {notifications.map(msg => (
                        <div key={msg.id} className="flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50">
                            <div className="flex items-center space-x-4 flex-1">
                                {!msg.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                                <img src={msg.avatar} alt="用户头像" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{msg.title}</p>
                                    <p className="text-sm text-gray-500 mt-1">{msg.content}</p>
                                    <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-6 py-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <span className="text-sm text-gray-500">共 {notifications.filter(n => !n.isRead).length} 条未读消息</span>
                    <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-button hover:bg-primary/90">
                        <FontAwesomeIcon icon={faCheck} className="text-xs mr-2" />
                        <span>全部已读</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
