import { useState, useRef, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, User, Bot, Copy, RotateCcw } from "lucide-react";
import GenAi from "./GenAi";



const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [streamingReply, setStreamingReply] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const sendMessage = () => {
    if (inputValue.trim() !== "" && !isLoading) {
      const newMessage = { text: inputValue.trim(), sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      GenAi({ 
        messages: [...messages, newMessage], 
        setMessages, 
        setStreamingReply, 
        setIsLoading 
      });
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingReply(null);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, streamingReply]);

  const MessageBubble = ({ message, isStreaming = false }) => {
    const isBot = message.sender === "bot" || isStreaming;
    
    return (
      <div className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-6`}>
        <div className={`flex max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"} items-start gap-3`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isBot ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
          }`}>
            {isBot ? <Bot size={16} /> : <User size={16} />}
          </div>
          
          {/* Message Content */}
          <div className={`relative group ${
            isBot ? "bg-white border border-gray-200" : "bg-gray-400 text-white"
          } rounded-2xl px-4 py-3 shadow-sm`}>
            {isBot ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom styling for better readability
                    p: ({children}) => <p className="mb-3 last:mb-0 leading-relaxed text-gray-800">{children}</p>,
                    h1: ({children}) => <h1 className="text-xl font-semibold mb-3 text-gray-900 border-b pb-2">{children}</h1>,
                    h2: ({children}) => <h2 className="text-lg font-semibold mb-3 text-gray-900">{children}</h2>,
                    h3: ({children}) => <h3 className="text-base font-semibold mb-2 text-gray-900">{children}</h3>,
                    ul: ({children}) => <ul className="mb-3 ml-4 space-y-1">{children}</ul>,
                    ol: ({children}) => <ol className="mb-3 ml-4 space-y-1">{children}</ol>,
                    li: ({children}) => <li className="text-gray-800 leading-relaxed">{children}</li>,
                    code: ({children, className}) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-gray-100 text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    pre: ({children}) => (
                      <pre className="bg-gray-50 border rounded-lg p-3 text-slate-800 overflow-x-auto mb-3">
                        {children}
                      </pre>
                    ),
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-800 mb-3">
                        {children}
                      </blockquote>
                    ),
                    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
                
                {/* Copy button for bot messages */}
                {!isStreaming && (
                  <button
                    onClick={() => copyToClipboard(message.text)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-gray-100"
                    title="Copy message"
                  >
                    <Copy size={14} className="text-gray-500" />
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            )}
            
            {/* Streaming indicator */}
            {isStreaming && (
              <div className="flex items-center gap-1 mt-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
                </div>
                <span className="text-xs text-gray-500 ml-1">Orion is thinking...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Orion AI</h1>
              <p className="text-xs text-gray-500">Powered by Gemini 2.0 Flash</p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Clear chat
            </button>
          )}
        </div>
      </header>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
              <Bot size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Orion AI</h2>
            <p className="text-gray-600 max-w-md">
              Start a conversation with your AI assistant. Ask questions, get help with tasks, or just chat!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-2xl">
              <button
                onClick={() => setInputValue("Explain quantum computing in simple terms")}
                className="p-3 text-left text-sm bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <strong className="text-gray-900">Explain concepts</strong>
                <p className="text-gray-600">Help me understand complex topics</p>
              </button>
              <button
                onClick={() => setInputValue("Write a Python function to sort a list")}
                className="p-3 text-left text-sm bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <strong className="text-gray-900">Write code</strong>
                <p className="text-gray-600">Help with programming tasks</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            
            {/* Streaming message */}
            {streamingReply && (
              <MessageBubble 
                message={{ text: streamingReply, sender: "bot" }} 
                isStreaming={true} 
              />
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 text-gray-500"
                placeholder="Type your message... (Shift+Enter for new line)"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Orion AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;