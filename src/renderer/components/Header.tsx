import { MessageSquare, Search, Bell, Settings, HelpCircle, Sparkles } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function Header() {
  const { workspaces, currentWorkspaceId, setCurrentWorkspace, startGuide, isGuideOpen, setCurrentView, checkForUpdates, isUpdating } = useAppStore()

  return (
    <header className="h-12 bg-bg-secondary border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-text-primary neon-glow">Hermes</span>
        </div>
        
        <div className="relative">
          <select
            value={currentWorkspaceId}
            onChange={(e) => setCurrentWorkspace(e.target.value)}
            className="bg-bg-tertiary border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('chat')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-primary"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm hidden md:inline">新对话</span>
        </button>

        <div className="relative">
          <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索..."
            className="bg-bg-tertiary border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors w-48"
          />
        </div>

        <button
          onClick={checkForUpdates}
          className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-primary relative"
          title="检查更新"
        >
          <Bell className={`w-5 h-5 ${isUpdating ? 'animate-pulse' : ''}`} />
          {isUpdating && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
          )}
        </button>

        <button
          onClick={() => !isGuideOpen && startGuide()}
          className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-primary"
          title="使用指南"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentView('settings')}
          className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-primary"
          title="设置"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}

export default Header
