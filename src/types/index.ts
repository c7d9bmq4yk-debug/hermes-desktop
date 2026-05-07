export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  files?: string[]
}

export interface Skill {
  id: string
  name: string
  description: string
  enabled: boolean
  category: string
  icon: string
  parameters?: Record<string, unknown>
}

export interface VersionInfo {
  version: string
  releaseDate: string
  changelog: string[]
  isCurrent?: boolean
  isInstalled?: boolean
}

export interface Workspace {
  id: string
  name: string
  description?: string
  createdAt: number
  updatedAt: number
}

export interface MemoryItem {
  id: string
  key: string
  value: string
  createdAt: number
  tags?: string[]
}

export interface TokenUsage {
  date: string
  used: number
  limit: number
}

export interface Plugin {
  id: string
  name: string
  description: string
  version: string
  installed: boolean
  enabled: boolean
}

export interface Settings {
  theme: 'dark' | 'light' | 'system'
  language: string
  autoUpdate: boolean
  updateFrequency: 'daily' | 'weekly' | 'monthly'
  apiEndpoint: string
  modelTemperature: number
  maxTokens: number
}

export interface GuideStep {
  id: string
  title: string
  description: string
  elementSelector?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}
