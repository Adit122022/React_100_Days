import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {  User, Bot, Copy } from "lucide-react";



const MessageBubble = ({ message, isStreaming = false }) => {
    const isBot = message.sender === "bot" || isStreaming;
      const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
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

  export default MessageBubble 