import { useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatView from './views/ChatView'
import SkillsView from './views/SkillsView'
import VersionView from './views/VersionView'
import SettingsView from './views/SettingsView'
import WorkspaceView from './views/WorkspaceView'
import MemoryView from './views/MemoryView'
import TokenView from './views/TokenView'
import PluginView from './views/PluginView'
import GuideOverlay from './components/GuideOverlay'
import StatusBar from './components/StatusBar'
import './index.css'

function App() {
  const { currentView, startGuide, isGuideOpen } = useAppStore()

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide')
    if (!hasSeenGuide) {
      setTimeout(() => {
        startGuide()
      }, 1000)
    }
  }, [startGuide])

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatView />
      case 'skills':
        return <SkillsView />
      case 'versions':
        return <VersionView />
      case 'settings':
        return <SettingsView />
      case 'workspace':
        return <WorkspaceView />
      case 'memory':
        return <MemoryView />
      case 'tokens':
        return <TokenView />
      case 'plugins':
        return <PluginView />
      default:
        return <ChatView />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-bg-primary overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-bg-primary">
          {renderView()}
        </main>
      </div>
      <StatusBar />
      {isGuideOpen && <GuideOverlay />}
    </div>
  )
}

export default App
