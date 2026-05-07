import { useState } from 'react'
import { Layers, Search, ToggleLeft, ToggleRight, Download, ExternalLink, HelpCircle } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function PluginView() {
  const { plugins, updatePlugin, installPlugin } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredPlugins = plugins.filter(plugin =>
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInstall = (pluginId: string) => {
    const plugin = plugins.find(p => p.id === pluginId)
    if (plugin) {
      installPlugin(plugin)
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">插件扩展</h1>
          <p className="text-sm text-text-secondary mt-1">安装和管理插件来扩展功能</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          插件商店
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索插件..."
          className="w-full bg-bg-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                plugin.enabled 
                  ? 'bg-bg-secondary border-primary/30 hover:border-primary/50' 
                  : plugin.installed
                    ? 'bg-bg-secondary/50 border-border'
                    : 'bg-bg-secondary/30 border-border opacity-70'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  plugin.enabled ? 'bg-primary/20' : plugin.installed ? 'bg-bg-tertiary' : 'bg-bg-primary'
                }`}>
                  <Layers className={`w-5 h-5 ${plugin.enabled ? 'text-primary' : plugin.installed ? 'text-text-secondary' : 'text-text-disabled'}`} />
                </div>
                {plugin.installed ? (
                  <button
                    onClick={() => updatePlugin(plugin.id, !plugin.enabled)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      plugin.enabled ? 'bg-primary/20 text-primary' : 'bg-bg-tertiary text-text-secondary'
                    }`}
                  >
                    {plugin.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                ) : (
                  <button
                    onClick={() => handleInstall(plugin.id)}
                    className="p-1.5 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-text-primary">{plugin.name}</h3>
                <span className="px-2 py-0.5 bg-bg-tertiary rounded-md text-xs text-text-secondary">
                  v{plugin.version}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{plugin.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs ${
                  plugin.enabled ? 'text-success' : 
                  plugin.installed ? 'text-warning' : 'text-text-disabled'
                }`}>
                  {plugin.enabled ? '已启用' : plugin.installed ? '已安装' : '未安装'}
                </span>
                {plugin.installed && !plugin.enabled && (
                  <button
                    onClick={() => updatePlugin(plugin.id, true)}
                    className="text-xs text-primary hover:underline"
                  >
                    启用
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPlugins.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="w-12 h-12 text-text-disabled mb-4" />
            <p className="text-text-secondary">未找到匹配的插件</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PluginView
