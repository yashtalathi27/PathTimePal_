import React, { useState } from 'react';
import { Bell, ChevronDown, Search, ArrowLeft, Send, Paperclip, MoreHorizontal, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MessagesRoute = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('messages');

  const contacts = [
    {
      id: 1,
      name: 'Local Cafe',
      avatar: 'LC',
      avatarColor: 'bg-orange-100 text-orange-600',
      lastMessage: 'Thanks for your application. Would you be available for an interview this week?',
      time: '10:30 AM',
      unread: true
    },
    {
      id: 2,
      name: 'Retail Store HR',
      avatar: 'RS',
      avatarColor: 'bg-blue-100 text-blue-600',
      lastMessage: 'We received your application and would like to schedule a phone screening.',
      time: 'Yesterday',
      unread: false
    },
    {
      id: 3,
      name: 'Tech Solutions Inc.',
      avatar: 'TS',
      avatarColor: 'bg-purple-100 text-purple-600',
      lastMessage: 'Your application status has been updated. Please check your dashboard.',
      time: 'Mar 30',
      unread: false
    }
  ];

  const messageHistory = {
    1: [
      {
        id: 1,
        sender: 'Local Cafe',
        text: 'Hi Jamie, thank you for your application for the Barista position.',
        time: '10:15 AM',
        isUser: false
      },
      {
        id: 2,
        sender: 'Local Cafe',
        text: 'Thanks for your application. Would you be available for an interview this week?',
        time: '10:30 AM',
        isUser: false
      }
    ],
    2: [
      {
        id: 1,
        sender: 'Retail Store HR',
        text: 'Hello Jamie, we received your application for the Sales Associate position.',
        time: 'Yesterday at 2:15 PM',
        isUser: false
      },
      {
        id: 2,
        sender: 'Retail Store HR',
        text: 'We received your application and would like to schedule a phone screening.',
        time: 'Yesterday at 2:20 PM',
        isUser: false
      }
    ],
    3: [
      {
        id: 1,
        sender: 'Tech Solutions Inc.',
        text: 'Thanks for your interest in the Administrative Assistant position.',
        time: 'Mar 30 at 9:45 AM',
        isUser: false
      },
      {
        id: 2,
        sender: 'You',
        text: "Thank you for considering my application. I'm very interested in the position.",
        time: 'Mar 30 at 10:30 AM',
        isUser: true
      },
      {
        id: 3,
        sender: 'Tech Solutions Inc.',
        text: 'Your application status has been updated. Please check your dashboard.',
        time: 'Mar 30 at 4:15 PM',
        isUser: false
      }
    ]
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    // In a real app, you would send this message to your backend
    // For now, we'll just clear the input
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="text-indigo-600 font-bold text-xl">FlexWork</div>
              </div>
              <div className="hidden sm:ml-8 sm:flex space-x-8">
                <a 
                  href="#" 
                  onClick={() => {
                    setActiveTab('dashboard');
                    navigate('/');
                  }}
                  className={`${activeTab === 'dashboard' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Dashboard
                </a>
                <a 
                  href="#"
                  onClick={() => {
                    setActiveTab('jobs');
                    navigate('/findjobs');
                  }}
                  className={`${activeTab === 'jobs' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Find Jobs
                </a>
                <a 
                  href="#"
                  onClick={() => {
                    setActiveTab('applications');
                    navigate('/applications');
                  }}
                  className={`${activeTab === 'applications' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Applications
                </a>
                <a 
                  href="#"
                  onClick={() => setActiveTab('messages')}
                  className={`${activeTab === 'messages' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Messages
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell size={20} />
              </button>
              <div className="ml-4 relative flex-shrink-0">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    JS
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Jamie Smith</span>
                  <ChevronDown size={16} className="ml-1 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Messages Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communicate with employers and recruiters</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Contact List */}
            <div className={`border-r border-gray-200 ${activeChat && 'hidden md:block'}`}>
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search messages"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-96 md:h-[calc(100vh-250px)]">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id}
                    onClick={() => setActiveChat(contact.id)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${activeChat === contact.id ? 'bg-indigo-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`h-10 w-10 rounded-full ${contact.avatarColor} flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0`}>
                        {contact.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                        <p className={`text-xs ${contact.unread ? 'font-medium text-gray-900' : 'text-gray-500'} truncate mt-1`}>
                          {contact.lastMessage}
                        </p>
                        {contact.unread && (
                          <span className="inline-block h-2 w-2 bg-indigo-600 rounded-full mt-1"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`md:col-span-2 ${!activeChat && 'hidden md:block'}`}>
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <button 
                      className="md:hidden mr-2 text-gray-500" 
                      onClick={() => setActiveChat(null)}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className={`h-10 w-10 rounded-full ${contacts.find(c => c.id === activeChat)?.avatarColor} flex items-center justify-center text-sm font-medium mr-3`}>
                      {contacts.find(c => c.id === activeChat)?.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{contacts.find(c => c.id === activeChat)?.name}</h3>
                    </div>
                    <button className="ml-auto text-gray-400">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="p-4 overflow-y-auto h-96 md:h-[calc(100vh-350px)]">
                    <div className="space-y-4">
                      {messageHistory[activeChat]?.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className="flex max-w-xs md:max-w-md">
                            {!msg.isUser && (
                              <div className={`h-8 w-8 rounded-full ${contacts.find(c => c.id === activeChat)?.avatarColor} flex items-center justify-center text-xs font-medium mr-2 mt-1 flex-shrink-0`}>
                                {contacts.find(c => c.id === activeChat)?.avatar}
                              </div>
                            )}
                            <div>
                              <div className={`p-3 rounded-lg ${msg.isUser ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-800'}`}>
                                {msg.text}
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                {msg.isUser ? 'You' : msg.sender} • {msg.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <button className="text-gray-400 mr-2">
                        <Paperclip size={20} />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button 
                        className="ml-2 p-2 bg-indigo-600 text-white rounded-md" 
                        onClick={sendMessage}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 md:h-[calc(100vh-250px)]">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <User size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Your Messages</h3>
                  <p className="text-sm text-gray-500 text-center mt-2 max-w-sm">
                    Select a conversation from the list to view messages, or start a new conversation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesRoute;