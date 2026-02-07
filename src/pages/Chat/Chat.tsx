import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Image,
  File,
  Smile
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockChatRooms, mockMessages, formatTime, formatDate } from '../../data/mockData';
import type { Message, ChatRoom } from '../../types';
import './Chat.css';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(mockChatRooms[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: `m${Date.now()}`,
      chatRoomId: selectedChat.id,
      senderId: user?.id || '',
      content: newMessage,
      type: 'text',
      createdAt: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = mockChatRooms.filter(chat => 
    chat.project?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chatMessages = messages.filter(m => m.chatRoomId === selectedChat?.id);

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <h2>Messages</h2>
          <div className="chat-search">
            <Search size={18} />
            <input 
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="chat-list">
          {filteredChats.map(chat => (
            <div 
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-avatar">
                {chat.project?.thumbnail ? (
                  <img src={chat.project.thumbnail} alt={chat.project.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {chat.project?.name.charAt(0)}
                  </div>
                )}
                <span className="online-status"></span>
              </div>
              <div className="chat-info">
                <div className="chat-header">
                  <span className="chat-name">{chat.project?.name}</span>
                  <span className="chat-time">
                    {chat.lastMessage && formatTime(chat.lastMessage.createdAt)}
                  </span>
                </div>
                <div className="chat-preview">
                  <p>{chat.lastMessage?.content}</p>
                  {chat.unreadCount > 0 && (
                    <span className="unread-badge">{chat.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredChats.length === 0 && (
            <div className="no-chats">
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-main-header">
              <div className="header-info">
                <div className="header-avatar">
                  {selectedChat.project?.thumbnail ? (
                    <img src={selectedChat.project.thumbnail} alt={selectedChat.project.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {selectedChat.project?.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="header-details">
                  <h3>{selectedChat.project?.name}</h3>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="header-actions">
                <button className="action-btn">
                  <Phone size={20} />
                </button>
                <button className="action-btn">
                  <Video size={20} />
                </button>
                <button className="action-btn">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="messages-container">
              <div className="messages-date">
                <span>{formatDate(chatMessages[0]?.createdAt || new Date().toISOString())}</span>
              </div>

              {chatMessages.map((message, index) => {
                const isOwn = message.senderId === user?.id || message.senderId === 'e1';
                const showAvatar = index === 0 || 
                  chatMessages[index - 1].senderId !== message.senderId;

                return (
                  <div 
                    key={message.id} 
                    className={`message ${isOwn ? 'own' : 'other'}`}
                  >
                    {!isOwn && showAvatar && (
                      <div className="message-avatar">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                          alt="User"
                        />
                      </div>
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        <p>{message.content}</p>
                      </div>
                      <span className="message-time">
                        {formatTime(message.createdAt)}
                        {isOwn && message.read && <span className="read-status">✓✓</span>}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <div className="input-actions">
                <button className="input-action-btn">
                  <Paperclip size={20} />
                </button>
                <button className="input-action-btn">
                  <Image size={20} />
                </button>
              </div>
              <div className="message-input-wrapper">
                <textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                />
                <button className="emoji-btn">
                  <Smile size={20} />
                </button>
              </div>
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-icon">💬</div>
            <h3>Select a conversation</h3>
            <p>Choose a chat from the sidebar to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
