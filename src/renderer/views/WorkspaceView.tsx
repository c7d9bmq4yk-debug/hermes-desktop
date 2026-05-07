import { useState } from 'react'
import { FolderOpen, Plus, Trash2, Edit2, X, Check, Search, HelpCircle } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import type { Workspace } from '../../types'

function WorkspaceView() {
  const { workspaces, addWorkspace, deleteWorkspace, setCurrentWorkspace, currentWorkspaceId } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null)

  const filteredWorkspaces = workspaces.filter(workspace => 
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (workspace.description && workspace.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCreate = () => {
    if (!newWorkspace.name.trim()) return
    
    const workspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspace.name,
      description: newWorkspace.description || undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    addWorkspace(workspace)
    setNewWorkspace({ name: '', description: '' })
    setShowCreateModal(false)
  }

  const handleStartEdit = (workspace: Workspace) => {
    setEditingId(workspace.id)
    setEditingWorkspace({ ...workspace })
  }

  const handleSaveEdit = () => {
    if (!editingWorkspace || !editingWorkspace.name.trim()) return
    
    addWorkspace(editingWorkspace)
    setEditingId(null)
    setEditingWorkspace(null)
  }

  const handleDelete = (id: string) => {
    if (workspaces.length <= 1) {
      alert('至少需要保留一个工作空间')
      return
    }
    deleteWorkspace(id)
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">工作空间管理</h1>
          <p className="text-sm text-text-secondary mt-1">创建和管理您的工作空间</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          创建工作空间
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索工作空间..."
          className="w-full bg-bg-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkspaces.map((workspace) => (
            <div
              key={workspace.id}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                currentWorkspaceId === workspace.id 
                  ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/50' 
                  : 'bg-bg-secondary border-border hover:border-primary/30'
              }`}
              onClick={() => setCurrentWorkspace(workspace.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentWorkspaceId === workspace.id ? 'bg-primary/20' : 'bg-bg-tertiary'
                  }`}>
                    <FolderOpen className={`w-5 h-5 ${currentWorkspaceId === workspace.id ? 'text-primary' : 'text-text-secondary'}`} />
                  </div>
                  {editingId === workspace.id ? (
                    <input
                      type="text"
                      value={editingWorkspace?.name || ''}
                      onChange={(e) => editingWorkspace && setEditingWorkspace({ ...editingWorkspace, name: e.target.value })}
                      className="bg-bg-tertiary border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <h3 className="font-semibold text-text-primary">{workspace.name}</h3>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {editingId === workspace.id ? (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSaveEdit() }}
                        className="p-1.5 rounded-lg bg-success/20 text-success hover:bg-success/30 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingId(null); setEditingWorkspace(null) }}
                        className="p-1.5 rounded-lg bg-error/20 text-error hover:bg-error/30 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStartEdit(workspace) }}
                        className="p-1.5 rounded-lg bg-bg-tertiary text-text-secondary hover:text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(workspace.id) }}
                        className="p-1.5 rounded-lg bg-bg-tertiary text-text-secondary hover:text-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {editingId === workspace.id ? (
                <textarea
                  value={editingWorkspace?.description || ''}
                  onChange={(e) => editingWorkspace && setEditingWorkspace({ ...editingWorkspace, description: e.target.value })}
                  placeholder="添加描述..."
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary resize-none"
                  rows={2}
                />
              ) : workspace.description ? (
                <p className="text-sm text-text-secondary mb-3">{workspace.description}</p>
              ) : null}
              
              <div className="flex items-center justify-between text-xs text-text-disabled">
                <span>创建于 {new Date(workspace.createdAt).toLocaleDateString('zh-CN')}</span>
                {currentWorkspaceId === workspace.id && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full">当前</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredWorkspaces.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="w-12 h-12 text-text-disabled mb-4" />
            <p className="text-text-secondary">未找到匹配的工作空间</p>
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
              <h2 className="text-lg font-semibold text-text-primary">创建工作空间</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">名称</label>
                <input
                  type="text"
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="输入工作空间名称"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">描述</label>
                <textarea
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors resize-none"
                  rows={3}
                  placeholder="添加描述（可选）"
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
                disabled={!newWorkspace.name.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  newWorkspace.name.trim() 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90' 
                    : 'bg-bg-tertiary text-text-disabled cursor-not-allowed'
                }`}
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspaceView
