import { useState } from 'react'
import { Clock, Plus, Trash2, Search, Tag, HelpCircle, X, Check } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import type { MemoryItem } from '../../types'

function MemoryView() {
  const { memories, addMemory, deleteMemory } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newMemory, setNewMemory] = useState({ key: '', value: '', tags: '' })

  const filteredMemories = memories.filter(memory => 
    memory.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCreate = () => {
    if (!newMemory.key.trim() || !newMemory.value.trim()) return
    
    const memory: MemoryItem = {
      id: Date.now().toString(),
      key: newMemory.key,
      value: newMemory.value,
      createdAt: Date.now(),
      tags: newMemory.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    addMemory(memory)
    setNewMemory({ key: '', value: '', tags: '' })
    setShowCreateModal(false)
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">记忆管理</h1>
          <p className="text-sm text-text-secondary mt-1">管理Hermes的长期和短期记忆</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          添加记忆
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索记忆..."
          className="w-full bg-bg-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className="p-4 bg-bg-secondary border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-text-primary">{memory.key}</h3>
                <button
                  onClick={() => deleteMemory(memory.id)}
                  className="p-1.5 rounded-lg bg-bg-tertiary text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{memory.value}</p>
              
              {memory.tags && memory.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {memory.tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 px-2 py-0.5 bg-bg-tertiary rounded-md text-xs text-text-secondary">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-text-disabled flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(memory.createdAt).toLocaleString('zh-CN')}
              </p>
            </div>
          ))}
        </div>

        {filteredMemories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="w-12 h-12 text-text-disabled mb-4" />
            <p className="text-text-secondary">暂无记忆数据</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative bg-bg-secondary border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">添加记忆</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">键名</label>
                <input
                  type="text"
                  value={newMemory.key}
                  onChange={(e) => setNewMemory({ ...newMemory, key: e.target.value })}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="输入键名"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">值</label>
                <textarea
                  value={newMemory.value}
                  onChange={(e) => setNewMemory({ ...newMemory, value: e.target.value })}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors resize-none"
                  rows={4}
                  placeholder="输入记忆内容"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">标签（可选）</label>
                <input
                  type="text"
                  value={newMemory.tags}
                  onChange={(e) => setNewMemory({ ...newMemory, tags: e.target.value })}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors"
                  placeholder="用逗号分隔多个标签"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-bg-tertiary text-text-secondary rounded-lg hover:text-text-primary transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={!newMemory.key.trim() || !newMemory.value.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  newMemory.key.trim() && newMemory.value.trim()
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                    : 'bg-bg-tertiary text-text-disabled cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryView
