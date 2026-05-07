import { MessageSquare, Wrench, Clock, Layers, Cpu, Coins, FolderOpen, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../../store/appStore'

interface NavItem {
  id: string
  label: string
  icon: typeof MessageSquare
}

const navItems: NavItem[] = [
  { id: 'chat', label: '聊天', icon: MessageSquare },
  { id: 'skills', label: '技能管理', icon: Wrench },
  { id: 'memory', label: '记忆管理', icon: Clock },
  { id: 'tokens', label: 'Tokens管理', icon: Coins },
  { id: 'workspace', label: '工作空间', icon: FolderOpen },
  { id: 'versions', label: '版本管理', icon: Cpu },
  { id: 'plugins', label: '插件扩展', icon: Layers },
  { id: 'settings', label: '设置', icon: Settings },
]

function Sidebar() {
  const { currentView, setCurrentView } = useAppStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`sidebar flex flex-col bg-bg-secondary border-r border-border transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 relative group ${
                isActive 
                  ? 'text-primary bg-bg-tertiary' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-lg" />
              )}
              {!isCollapsed && !isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-transparent group-hover:bg-border rounded-r-lg transition-colors" />
              )}
            </button>
          )
        })}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center py-3 border-t border-border text-text-secondary hover:text-primary hover:bg-bg-tertiary transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  )
}

export default Sidebar
