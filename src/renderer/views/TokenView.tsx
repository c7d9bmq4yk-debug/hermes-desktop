import { Coins, TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function TokenView() {
  const { tokenUsage, settings } = useAppStore()
  
  const totalUsed = tokenUsage.reduce((sum, day) => sum + day.used, 0)
  const limit = settings.maxTokens || 100000
  const percentage = Math.round((totalUsed / limit) * 100)
  
  const averageDaily = Math.round(totalUsed / tokenUsage.length)
  
  const todayUsage = tokenUsage[tokenUsage.length - 1]?.used || 0
  const yesterdayUsage = tokenUsage[tokenUsage.length - 2]?.used || 0
  const trend = todayUsage - yesterdayUsage
  const isUp = trend > 0

  const maxValue = Math.max(...tokenUsage.map(d => d.used))

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Tokens 管理</h1>
        <p className="text-sm text-text-secondary mt-1">查看和管理您的Tokens使用情况</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-bg-secondary border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-text-secondary">本月已使用</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{totalUsed.toLocaleString()}</p>
          <p className="text-sm text-text-disabled mt-1">/{limit.toLocaleString()} Tokens</p>
        </div>
        
        <div className="bg-bg-secondary border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-text-secondary">日均使用</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{averageDaily.toLocaleString()}</p>
          <p className="text-sm text-text-disabled mt-1">Tokens/天</p>
        </div>
        
        <div className="bg-bg-secondary border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUp ? 'bg-error/20' : 'bg-success/20'}`}>
              {isUp ? (
                <TrendingUp className="w-5 h-5 text-error" />
              ) : (
                <TrendingDown className="w-5 h-5 text-success" />
              )}
            </div>
            <span className="text-sm text-text-secondary">较昨日</span>
          </div>
          <p className={`text-2xl font-bold ${isUp ? 'text-error' : 'text-success'}`}>
            {isUp ? '+' : ''}{trend.toLocaleString()}
          </p>
          <p className="text-sm text-text-disabled mt-1">Tokens</p>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text-primary">使用进度</h2>
          {percentage > 80 && (
            <div className="flex items-center gap-1 text-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">即将超出限制</span>
            </div>
          )}
        </div>
        
        <div className="relative h-6 bg-bg-tertiary rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
              percentage > 80 ? 'bg-gradient-to-r from-warning to-error' :
              percentage > 50 ? 'bg-gradient-to-r from-warning to-primary' :
              'bg-gradient-to-r from-success to-primary'
            }`}
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-white drop-shadow-lg">{percentage}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-text-secondary">已使用: {totalUsed.toLocaleString()}</span>
          <span className="text-text-secondary">剩余: {(limit - totalUsed).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 bg-bg-secondary border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-secondary" />
          <h2 className="font-semibold text-text-primary">每日使用趋势</h2>
        </div>
        
        <div className="flex items-end justify-between h-48 gap-2">
          {tokenUsage.map((day, index) => {
            const height = maxValue > 0 ? (day.used / maxValue) * 100 : 0
            const isToday = index === tokenUsage.length - 1
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isToday 
                      ? 'bg-gradient-to-t from-primary to-secondary' 
                      : 'bg-bg-tertiary hover:bg-primary/50'
                  }`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${day.date}: ${day.used.toLocaleString()} Tokens`}
                />
                <span className="text-xs text-text-disabled">
                  {day.date.split('-').slice(1).join('/')}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TokenView
