// ChatInput.js
import React from 'react';

const ChatInput = () => {
    return (
        <div className="border-t pt-4">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-sm">
        <textarea
            className="w-full bg-transparent border-none outline-none px-3 py-2 text-gray-700 placeholder-gray-400 resize-none"
            placeholder="请输入您的问题，选中下方提问获取多媒体资源..."
            rows="2"
        ></textarea>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-gray-100"><i className="fas fa-image"></i></button>
                        <button className="p-2 text-gray-500 hover:text-purple-600 rounded-lg hover:bg-gray-100"><i className="fas fa-video"></i></button>
                    </div>
                    <div className="flex-1 mx-4 text-sm text-gray-500">已选择文本资源</div>
                    <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <span>发送</span>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
