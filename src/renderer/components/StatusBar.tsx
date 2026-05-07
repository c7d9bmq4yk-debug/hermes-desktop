import { Wifi, WifiOff, Loader2, Cpu, Zap } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function StatusBar() {
  const { connectionStatus, versions, tokenUsage } = useAppStore()
  
  const currentVersion = versions.find(v => v.isCurrent)
  const totalTokensUsed = tokenUsage.reduce((sum: number, day: { used: number }) => sum + day.used, 0)
  const tokenLimit = tokenUsage[0]?.limit || 100000

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-success" />
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-error" />
      case 'connecting':
        return <Loader2 className="w-4 h-4 text-warning animate-spin" />
      default:
        return null
    }
  }

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '已连接'
      case 'disconnected':
        return '未连接'
      case 'connecting':
        return '连接中...'
      default:
        return ''
    }
  }

  const tokenPercentage = Math.round((totalTokensUsed / tokenLimit) * 100)

  return (
    <footer className="h-8 bg-bg-secondary border-t border-border flex items-center justify-between px-4 text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {getConnectionIcon()}
          <span className={
            connectionStatus === 'connected' ? 'text-success' : 
            connectionStatus === 'disconnected' ? 'text-error' : 'text-warning'
          }>
            {getConnectionText()}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Cpu className="w-3.5 h-3.5" />
          <span>Hermes v{currentVersion?.version || '1.0.0'}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-secondary" />
          <span className="text-text-secondary">Tokens: {totalTokensUsed.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
          <div className="w-24 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                tokenPercentage > 80 ? 'bg-error' : tokenPercentage > 50 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${tokenPercentage}%` }}
            />
          </div>
        </div>
        
        <span className="text-text-disabled">
          {new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })}
        </span>
      </div>
    </footer>
  )
}

export default StatusBar
