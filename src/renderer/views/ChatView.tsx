import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Trash2, Download, RefreshCw, User, Bot, Loader2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function ChatView() {
  const { messages, addMessage, clearMessages } = useAppStore()
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue,
      timestamp: Date.now(),
    }
    
    addMessage(userMessage)
    setInputValue('')
    setIsSending(true)
    
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: '这是Hermes的回复。您的消息已收到，我正在处理您的请求...\n\n这是一个演示回复，展示了消息的显示样式和格式。您可以继续发送消息进行测试。',
        timestamp: Date.now(),
      }
      addMessage(assistantMessage)
      setIsSending(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-container h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-3 animate-[slideIn_0.3s_ease-out] ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${
              message.role === 'user' 
                ? 'bg-gradient-to-br from-primary to-secondary' 
                : 'bg-bg-tertiary'
            }`}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : message.role === 'system' ? (
                <Bot className="w-5 h-5 text-primary" />
              ) : (
                <Bot className="w-5 h-5 text-secondary" />
              )}
            </div>
            
            <div className={`max-w-[70%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-2.5 rounded-2xl ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-br-md' 
                  : 'bg-bg-secondary border border-border rounded-bl-md'
              }`}>
                <p className="text-sm text-text-primary whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              <p className="text-xs text-text-disabled mt-1 ml-2">
                {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isSending && (
          <div className="flex gap-3 animate-[slideIn_0.3s_ease-out]">
            <div className="w-9 h-9 rounded-full bg-bg-tertiary flex-shrink-0 flex items-center justify-center">
              <Bot className="w-5 h-5 text-secondary" />
            </div>
            <div className="bg-bg-secondary border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm text-text-secondary">正在思考...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={clearMessages}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            清空对话
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            导出记录
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-secondary hover:bg-secondary/10 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            重置对话
          </button>
        </div>
        
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-bg-secondary border border-border rounded-xl overflow-hidden focus-within:border-primary transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息... (Shift+Enter换行)"
              className="w-full p-4 bg-transparent text-text-primary placeholder:text-text-disabled resize-none focus:outline-none max-h-32"
              rows={1}
            />
          </div>
          
          <button
            className="p-3 rounded-xl bg-bg-tertiary hover:bg-bg-secondary transition-colors text-text-secondary hover:text-primary"
            title="上传文件"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            className={`p-3 rounded-xl transition-all ${
              inputValue.trim() && !isSending
                ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                : 'bg-bg-tertiary text-text-disabled cursor-not-allowed'
            }`}
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatView
