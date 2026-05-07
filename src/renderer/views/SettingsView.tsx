import { Palette, RefreshCw, Cpu, Lock, Save, RotateCcw } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function SettingsView() {
  const { settings, updateSettings } = useAppStore()

  const handleChange = (key: string, value: unknown) => {
    updateSettings({ [key]: value })
  }

  return (
    <div className="settings-section h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">设置配置</h1>
          <p className="text-sm text-text-secondary mt-1">配置应用程序的各项参数</p>
        </div>
        <button
          onClick={() => {
            updateSettings({
              theme: 'dark',
              language: 'zh-CN',
              autoUpdate: true,
              updateFrequency: 'daily',
              apiEndpoint: 'http://localhost:8000',
              modelTemperature: 0.7,
              maxTokens: 4096,
            })
          }}
          className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          恢复默认
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-6">
        <div className="bg-bg-secondary rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-text-primary">外观设置</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">主题</label>
              <select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="dark">深色模式</option>
                <option value="light">浅色模式</option>
                <option value="system">跟随系统</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">语言</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-5 h-5 text-secondary" />
            <h2 className="font-semibold text-text-primary">更新设置</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-text-primary">自动检查更新</label>
                <p className="text-xs text-text-secondary mt-1">应用启动时自动检查新版本</p>
              </div>
              <button
                onClick={() => handleChange('autoUpdate', !settings.autoUpdate)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoUpdate ? 'bg-primary' : 'bg-bg-tertiary'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.autoUpdate ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
            
            {settings.autoUpdate && (
              <div>
                <label className="block text-sm text-text-secondary mb-2">检查频率</label>
                <select
                  value={settings.updateFrequency}
                  onChange={(e) => handleChange('updateFrequency', e.target.value)}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="daily">每天</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-warning" />
            <h2 className="font-semibold text-text-primary">模型设置</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">API 端点</label>
              <input
                type="text"
                value={settings.apiEndpoint}
                onChange={(e) => handleChange('apiEndpoint', e.target.value)}
                className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="http://localhost:8000"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-text-secondary">温度参数</label>
                <span className="text-sm text-text-primary">{settings.modelTemperature.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.modelTemperature}
                onChange={(e) => handleChange('modelTemperature', parseFloat(e.target.value))}
                className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-text-secondary mt-1">控制输出的随机性，值越高越随机</p>
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">最大 Token 数</label>
              <select
                value={settings.maxTokens}
                onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value={1024}>1024</option>
                <option value={2048}>2048</option>
                <option value={4096}>4096</option>
                <option value={8192}>8192</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-error" />
            <h2 className="font-semibold text-text-primary">隐私与安全</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-text-primary">数据加密</label>
                <p className="text-xs text-text-secondary mt-1">对本地存储的数据进行加密</p>
              </div>
              <button
                className="relative w-12 h-6 rounded-full bg-success transition-colors cursor-not-allowed opacity-50"
              >
                <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-text-primary">自动清理历史</label>
                <p className="text-xs text-text-secondary mt-1">定期自动清理对话历史</p>
              </div>
              <button
                className="relative w-12 h-6 rounded-full bg-bg-tertiary transition-colors cursor-not-allowed opacity-50"
              >
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" />
          保存设置
        </button>
      </div>
    </div>
  )
}

export default SettingsView
