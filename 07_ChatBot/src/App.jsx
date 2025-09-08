import { useState, useRef, useEffect } from "react";
import { Send,  Bot,  RotateCcw, X, DockIcon } from "lucide-react";
import GenAi from "./GenAi";
import MessageBubble from "./MessageBubble";



const App = () => {
  const [messages, setMessages] = useState([]);
  const [Instruction ,SetSystemInstruction] =useState('')
  const [showSystemSettings , setShowSystemSettings ] = useState(false)
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
        setIsLoading ,
        Instruction
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


  const clearChat = () => {
    setMessages([]);
    setStreamingReply(null);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, streamingReply]);

 

  return (
    <div className="flex flex-col text-gray-500 h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full space-x-3">
           <div className="">
             <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Orion AI</h1>
              <p className="text-xs text-gray-500">Powered by Gemini 2.0 Flash</p>
            </div>
           </div>
            
          </div>
          
          <DockIcon onClick={()=>setShowSystemSettings(!showSystemSettings)} className="text-black mr-4"/>
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
          {/* System Instruction Panel */}
        {showSystemSettings && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">System Instructions</h3>
              <button
                onClick={() => setShowSystemSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <textarea
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter custom instructions for the AI (e.g., 'You are a helpful coding assistant', 'Always respond in bullet points', etc.)"
              value={Instruction}
              onChange={(e) => SetSystemInstruction(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-2">
              System instructions help customize the AI's behavior and response style.
            </p>
          </div>
        )}
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



















