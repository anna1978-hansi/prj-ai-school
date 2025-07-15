// ChatInput.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faVideo, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
const ChatInput = ({
    value = '',
    onChange,
    onSend,
    selectedResources = []
}) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleSend = () => {
        if (value.trim() && onSend) {
            onSend(value.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setIsUploading(true);
                // 模拟上传过程
                setTimeout(() => {
                    console.log('图片上传:', file.name);
                    setIsUploading(false);
                }, 1000);
            }
        };
        input.click();
    };

    const handleVideoUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setIsUploading(true);
                // 模拟上传过程
                setTimeout(() => {
                    console.log('视频上传:', file.name);
                    setIsUploading(false);
                }, 1000);
            }
        };
        input.click();
    };

    return (
        <div className="border-t pt-4">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-sm">
                <textarea
                    className="w-full bg-transparent border-none outline-none px-3 py-2 text-gray-700 placeholder-gray-400 resize-none min-h-[96px] max-h-60"
                    placeholder="请输入您的问题，选中下方提问获取多媒体资源..."
                    rows="4"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                ></textarea>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={handleImageUpload}
                            disabled={isUploading}
                            title="上传图片"
                        >
                            <FontAwesomeIcon icon={faImage} className={`${isUploading ? 'opacity-50' : ''}`} />
                        </button>
                        <button
                            className="p-2 text-gray-500 hover:text-purple-600 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={handleVideoUpload}
                            disabled={isUploading}
                            title="上传视频"
                        >
                            <FontAwesomeIcon icon={faVideo} className={`${isUploading ? 'opacity-50' : ''}`} />
                        </button>
                    </div>
                    <div className="flex-1 mx-4 text-sm text-gray-500">
                        {selectedResources.length > 0
                            ? `已选择 ${selectedResources.length} 个文本资源`
                            : '未选择任何资源'
                        }
                    </div>
                    <button
                        className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${value.trim()
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        onClick={handleSend}
                        disabled={!value.trim()}
                    >
                        <span>发送</span>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
