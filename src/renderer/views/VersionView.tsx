import { useState } from 'react'
import { Cpu, Download, Clock, CheckCircle, AlertTriangle, ArrowDown, RefreshCw, Loader2 } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function VersionView() {
  const { versions, fetchVersions, isUpdating } = useAppStore()
  const [installingVersion, setInstallingVersion] = useState<string | null>(null)
  
  const currentVersion = versions.find(v => v.isCurrent)
  const availableUpdates = versions.filter(v => !v.isInstalled && !v.isCurrent)

  const handleInstallVersion = (version: string) => {
    setInstallingVersion(version)
    setTimeout(() => {
      setInstallingVersion(null)
      fetchVersions()
    }, 3000)
  }

  const handleRollback = (version: string) => {
    setInstallingVersion(version)
    setTimeout(() => {
      setInstallingVersion(null)
      fetchVersions()
    }, 3000)
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">版本管理</h1>
          <p className="text-sm text-text-secondary mt-1">管理Hermes版本，支持更新和回退</p>
        </div>
        <button
          onClick={fetchVersions}
          disabled={isUpdating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isUpdating 
              ? 'bg-bg-tertiary text-text-disabled cursor-not-allowed' 
              : 'bg-bg-secondary border border-border hover:border-primary text-text-secondary hover:text-primary'
          }`}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          检查更新
        </button>
      </div>

      {currentVersion && (
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-text-primary">当前版本</h2>
                <p className="text-lg font-bold text-primary neon-glow">v{currentVersion.version}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentVersion.releaseDate}
              </p>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/20 text-success rounded-full text-sm mt-2">
                <CheckCircle className="w-4 h-4" />
                已安装并运行
              </span>
            </div>
          </div>
        </div>
      )}

      {availableUpdates.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            可用更新
          </h3>
          <div className="grid gap-3">
            {availableUpdates.map((version) => (
              <div
                key={version.version}
                className="p-4 bg-bg-secondary border border-warning/30 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-warning" />
                    <div>
                      <h4 className="font-semibold text-text-primary">v{version.version}</h4>
                      <p className="text-sm text-text-secondary">{version.releaseDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInstallVersion(version.version)}
                    disabled={installingVersion === version.version}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      installingVersion === version.version
                        ? 'bg-bg-tertiary text-text-disabled cursor-not-allowed'
                        : 'bg-gradient-to-r from-warning to-error text-white hover:opacity-90'
                    }`}
                  >
                    {installingVersion === version.version ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {installingVersion === version.version ? '安装中...' : '更新'}
                  </button>
                </div>
                <div className="bg-bg-primary rounded-lg p-3">
                  <p className="text-sm text-text-secondary mb-2">更新内容：</p>
                  <ul className="space-y-1">
                    {version.changelog.map((change, index) => (
                      <li key={index} className="text-sm text-text-primary flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-text-primary mb-3">历史版本</h3>
        <div className="grid gap-3">
          {versions.filter(v => v.isInstalled && !v.isCurrent).map((version) => (
            <div
              key={version.version}
              className="p-4 bg-bg-secondary border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center">
                    <ArrowDown className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">v{version.version}</h4>
                    <p className="text-sm text-text-secondary">{version.releaseDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRollback(version.version)}
                  disabled={installingVersion === version.version}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    installingVersion === version.version
                      ? 'bg-bg-tertiary text-text-disabled cursor-not-allowed'
                      : 'bg-bg-tertiary hover:bg-bg-primary text-text-secondary hover:text-secondary'
                  }`}
                >
                  {installingVersion === version.version ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {installingVersion === version.version ? '回退中...' : '回退到此版本'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VersionView
