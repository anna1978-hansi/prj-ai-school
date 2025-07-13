import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    name: '张老师',
    avatar: '/img/userpicture.jpg',
    role: 'teacher',
    subject: '数学'
  });
  const [chatRooms, setChatRooms] = useState([
    { id: 'general', name: '通用备课室', active: true },
    { id: 'math', name: '数学备课室', active: false },
    { id: 'chinese', name: '语文备课室', active: false },
    { id: 'english', name: '英语备课室', active: false }
  ]);
  const [activeRoom, setActiveRoom] = useState('general');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 连接WebSocket
  useEffect(() => {
    const connectWebSocket = () => {
      // 模拟WebSocket连接（实际项目中应该连接到真实的WebSocket服务器）
      const mockWs = {
        send: (data) => {
          console.log('发送消息:', data);
          // 模拟消息发送和接收
          setTimeout(() => {
            const message = JSON.parse(data);
            if (message.type === 'message') {
              handleIncomingMessage(message);
            } else if (message.type === 'join') {
              handleUserJoined(message);
            } else if (message.type === 'typing') {
              handleTypingIndicator(message);
            }
          }, 100);
        },
        close: () => {
          console.log('WebSocket连接已关闭');
          setIsConnected(false);
        }
      };

      setWs(mockWs);
      setIsConnected(true);

      // 模拟用户加入
      mockWs.send(JSON.stringify({
        type: 'join',
        user: currentUser,
        room: activeRoom
      }));
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [activeRoom]);

  // 处理接收到的消息
  const handleIncomingMessage = (message) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: message.text,
      user: message.user,
      timestamp: new Date().toLocaleTimeString(),
      type: message.messageType || 'text',
      file: message.file
    }]);
  };

  // 处理用户加入
  const handleUserJoined = (message) => {
    setOnlineUsers(prev => {
      const existing = prev.find(user => user.id === message.user.id);
      if (!existing) {
        return [...prev, message.user];
      }
      return prev;
    });
  };

  // 处理打字指示器
  const handleTypingIndicator = (message) => {
    if (message.isTyping) {
      setTypingUsers(prev => {
        const existing = prev.find(user => user.id === message.user.id);
        if (!existing) {
          return [...prev, message.user];
        }
        return prev;
      });
    } else {
      setTypingUsers(prev => prev.filter(user => user.id !== message.user.id));
    }
  };

  // 发送消息
  const sendMessage = () => {
    if (!messageText.trim() && !selectedFile) return;

    const message = {
      type: 'message',
      text: messageText,
      user: currentUser,
      room: activeRoom,
      messageType: selectedFile ? 'file' : 'text',
      file: selectedFile
    };

    ws.send(JSON.stringify(message));
    setMessageText('');
    setSelectedFile(null);
  };

  // 处理文件选择
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      });
    }
  };

  // 处理打字状态
  const handleTyping = (e) => {
    setMessageText(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      ws.send(JSON.stringify({
        type: 'typing',
        user: currentUser,
        room: activeRoom,
        isTyping: true
      }));
    }

    // 清除之前的定时器
    clearTimeout(window.typingTimer);
    window.typingTimer = setTimeout(() => {
      setIsTyping(false);
      ws.send(JSON.stringify({
        type: 'typing',
        user: currentUser,
        room: activeRoom,
        isTyping: false
      }));
    }, 1000);
  };

  // 切换聊天室
  const switchRoom = (roomId) => {
    setActiveRoom(roomId);
    setChatRooms(prev => prev.map(room => ({
      ...room,
      active: room.id === roomId
    })));
    setMessages([]); // 清空消息，实际项目中应该加载对应房间的消息
  };

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧聊天室列表 */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">备课聊天室</h2>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            {isConnected ? '在线' : '离线'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatRooms.map(room => (
            <div
              key={room.id}
              className={`p-4 cursor-pointer transition-colors ${room.active ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                }`}
              onClick={() => switchRoom(room.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{room.name}</h3>
                  <p className="text-sm text-gray-500">在线 {Math.floor(Math.random() * 20) + 5} 人</p>
                </div>
                {room.active && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 在线用户 */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">在线教师</h3>
          <div className="space-y-2">
            {onlineUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-2">
                <img src={user.avatar} className="w-6 h-6 rounded-full" alt={user.name} />
                <span className="text-sm text-gray-600">{user.name}</span>
                <span className="text-xs text-gray-400">({user.subject})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天头部 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {chatRooms.find(room => room.id === activeRoom)?.name}
              </h2>
              <p className="text-sm text-gray-500">
                在线 {onlineUsers.length} 人 • 实时交流备课经验
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-video"></i>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-phone"></i>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.user.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${message.user.id === currentUser.id ? 'order-2' : 'order-1'}`}>
                {message.user.id !== currentUser.id && (
                  <div className="flex items-center space-x-2 mb-1">
                    <img src={message.user.avatar} className="w-6 h-6 rounded-full" alt={message.user.name} />
                    <span className="text-xs text-gray-500">{message.user.name}</span>
                  </div>
                )}
                <div className={`rounded-lg p-3 ${message.user.id === currentUser.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  {message.type === 'file' ? (
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-file text-lg"></i>
                      <div>
                        <p className="font-medium">{message.file.name}</p>
                        <p className="text-xs opacity-75">{formatFileSize(message.file.size)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm break-words">{message.text}</p>
                  )}
                  <p className={`text-xs mt-1 ${message.user.id === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* 打字指示器 */}
          {typingUsers.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {typingUsers.map(u => u.name).join(', ')} 正在输入...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* 文件预览 */}
          {selectedFile && (
            <div className="mb-3 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-file text-blue-500"></i>
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <span className="text-xs text-gray-500">({formatFileSize(selectedFile.size)})</span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={messageText}
                onChange={handleTyping}
                placeholder="输入消息..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="发送文件"
              >
                <i className="fas fa-paperclip"></i>
              </button>
              <button
                onClick={sendMessage}
                disabled={!messageText.trim() && !selectedFile}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
