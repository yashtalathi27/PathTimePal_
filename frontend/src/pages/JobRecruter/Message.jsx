import { Bell, ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // <-- Add this line
import { useState, useEffect, useCallback, useRef } from "react";
import { useChatstore } from "../../store/useChatstore";
import { useAuthstore } from "../../store/useAuthstore";

const MessagesRoute = () => {
  const navigate = useNavigate();
  const {
    getuser,
    users = [],
    selectedUser,
    isuserloading,
    setSelecteduser,
    getmessages,
    sendMessage,
    listentoMessages,
    removeMessages,
    messages = [],
  } = useChatstore();

  const { authuser } = useAuthstore();

  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState('messages');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await sendMessage(text);
      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const fetchUsers = useCallback(() => {
    getuser();
  }, [getuser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (selectedUser?._id) {
      getmessages(selectedUser._id);
      listentoMessages();
    }
    return () => removeMessages();
  }, [selectedUser, getmessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
console.log(users)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-indigo-600 font-bold text-xl">FlexWork</span>
              <div className="hidden sm:flex ml-8 space-x-6">
                {["dashboard", "jobs", "applications", "messages"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      navigate(tab === "dashboard" ? "/" : `/${tab}`);
                    }}
                    className={`${
                      activeTab === tab
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    } border-b-2 text-sm font-medium pb-1`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Bell size={20} className="text-gray-400" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex justify-center items-center font-medium text-indigo-600">
                  {authuser?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm text-gray-700 hidden md:block">
                  {authuser?.username || "User"}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with employers and recruiters</p>
        </div>

        <div className="bg-white border rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3">
          {/* Sidebar: Users */}
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search users"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-250px)]">
              {users.length > 0 ? (
                [...users]
                  .filter((user) =>
                    (user.name || user.first_name || user.username || "")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((user) => {
                    const displayName = user.first_name || user.name || user.username || "Unknown";

                    return (
                      <div
                        key={user._id}
                        onClick={() => setSelecteduser(user)}
                        className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                          selectedUser?._id === user._id ? "bg-indigo-50" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                            {displayName[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {displayName}
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="p-4 text-gray-400 text-sm">No users found</div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="md:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
              {selectedUser ? (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-200 rounded-full flex items-center justify-center text-sm font-medium">
                    {selectedUser?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h2 className="text-md font-semibold text-gray-900">
                      {selectedUser.first_name || selectedUser.name || selectedUser.username}
                    </h2>
                  </div>
                </div>
              ) : (
                <h2 className="text-lg font-semibold">Select a user to chat</h2>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-[500px]">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
                      msg.senderid === authuser?._id
                        ? "bg-indigo-100 ml-auto self-end"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs text-right text-gray-500 mt-1">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString([], {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "Just now"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No messages yet</p>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input Box */}
            <div className="border-t px-4 py-3 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 outline-none"
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesRoute;
