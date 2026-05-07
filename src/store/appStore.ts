import { create } from 'zustand'
import { Message, Skill, VersionInfo, Workspace, MemoryItem, TokenUsage, Plugin, Settings, GuideStep } from '../types'

interface AppStore {
  messages: Message[]
  skills: Skill[]
  versions: VersionInfo[]
  workspaces: Workspace[]
  memories: MemoryItem[]
  tokenUsage: TokenUsage[]
  plugins: Plugin[]
  settings: Settings
  currentWorkspaceId: string
  currentView: string
  isGuideOpen: boolean
  currentGuideStep: number
  guideSteps: GuideStep[]
  isUpdating: boolean
  connectionStatus: 'connected' | 'disconnected' | 'connecting'

  addMessage: (message: Message) => void
  clearMessages: () => void
  updateSkill: (id: string, enabled: boolean) => void
  addSkill: (skill: Skill) => void
  setCurrentWorkspace: (id: string) => void
  addWorkspace: (workspace: Workspace) => void
  deleteWorkspace: (id: string) => void
  addMemory: (memory: MemoryItem) => void
  deleteMemory: (id: string) => void
  updatePlugin: (id: string, enabled: boolean) => void
  installPlugin: (plugin: Plugin) => void
  updateSettings: (settings: Partial<Settings>) => void
  setCurrentView: (view: string) => void
  startGuide: () => void
  nextGuideStep: () => void
  prevGuideStep: () => void
  closeGuide: () => void
  setIsUpdating: (updating: boolean) => void
  setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void
  fetchVersions: () => void
  checkForUpdates: () => void
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'zh-CN',
  autoUpdate: true,
  updateFrequency: 'daily',
  apiEndpoint: 'http://localhost:8000',
  modelTemperature: 0.7,
  maxTokens: 4096,
}

const defaultGuideSteps: GuideStep[] = [
  {
    id: 'welcome',
    title: '欢迎使用 Hermes Agent',
    description: '这是一款强大的AI智能体桌面客户端，让我们一起探索它的功能吧！',
  },
  {
    id: 'chat',
    title: '聊天界面',
    description: '在这里您可以与Hermes进行对话，发送消息并获取智能回复。',
    elementSelector: '.chat-container',
    position: 'bottom',
  },
  {
    id: 'sidebar',
    title: '功能导航',
    description: '左侧导航栏包含所有功能模块，点击即可切换。',
    elementSelector: '.sidebar',
    position: 'right',
  },
  {
    id: 'skills',
    title: '技能管理',
    description: '管理Hermes的技能，启用或禁用不同的工具和功能。',
    elementSelector: '.skills-section',
    position: 'left',
  },
  {
    id: 'settings',
    title: '设置配置',
    description: '在这里可以调整模型参数、更新设置等。',
    elementSelector: '.settings-section',
    position: 'left',
  },
]

const mockSkills: Skill[] = [
  { id: '1', name: '文件操作', description: '读取和写入本地文件', enabled: true, category: '工具', icon: 'File' },
  { id: '2', name: '网页搜索', description: '搜索互联网信息', enabled: true, category: '工具', icon: 'Search' },
  { id: '3', name: '代码执行', description: '执行Python代码', enabled: false, category: '开发', icon: 'Code' },
  { id: '4', name: '数学计算', description: '进行数学运算', enabled: true, category: '工具', icon: 'Calculator' },
  { id: '5', name: '日程管理', description: '管理您的日程安排', enabled: true, category: '生活', icon: 'Calendar' },
  { id: '6', name: '邮件发送', description: '发送电子邮件', enabled: false, category: '生活', icon: 'Mail' },
]

const mockVersions: VersionInfo[] = [
  { version: '1.0.0', releaseDate: '2024-01-15', changelog: ['初始版本发布', '基础聊天功能', '技能管理'], isCurrent: true, isInstalled: true },
  { version: '1.1.0', releaseDate: '2024-02-20', changelog: ['新增记忆管理', '优化聊天体验', '修复已知BUG'], isInstalled: true },
  { version: '1.2.0', releaseDate: '2024-03-15', changelog: ['新增插件系统', '改进版本管理', '性能优化'], isInstalled: false },
]

const mockWorkspaces: Workspace[] = [
  { id: '1', name: '默认工作空间', description: '主要的工作空间', createdAt: Date.now() - 86400000 * 30, updatedAt: Date.now() },
  { id: '2', name: '项目Alpha', description: 'Alpha项目专用', createdAt: Date.now() - 86400000 * 15, updatedAt: Date.now() - 86400000 * 5 },
  { id: '3', name: '个人笔记', description: '个人学习笔记', createdAt: Date.now() - 86400000 * 7, updatedAt: Date.now() },
]

const mockMessages: Message[] = [
  { id: '1', role: 'system', content: '您好！我是Hermes，您的AI助手。有什么我可以帮助您的吗？', timestamp: Date.now() - 3600000 },
  { id: '2', role: 'user', content: '你好，Hermes！请介绍一下你自己。', timestamp: Date.now() - 3500000 },
  { id: '3', role: 'assistant', content: '您好！我是Hermes，一个强大的AI智能体。我可以帮助您完成各种任务，包括回答问题、编写代码、管理文件等。我支持多种技能，可以根据您的需求进行扩展。', timestamp: Date.now() - 3400000 },
]

const mockPlugins: Plugin[] = [
  { id: '1', name: 'Markdown渲染', description: '增强Markdown显示效果', version: '1.0.0', installed: true, enabled: true },
  { id: '2', name: '代码高亮', description: '支持多种语言代码高亮', version: '2.1.0', installed: true, enabled: true },
  { id: '3', name: '语音输入', description: '支持语音转文字输入', version: '1.5.0', installed: false, enabled: false },
]

const mockMemories: MemoryItem[] = [
  { id: '1', key: '用户名', value: '张三', createdAt: Date.now() - 86400000 * 10, tags: ['个人信息'] },
  { id: '2', key: '公司名称', value: '科技创新有限公司', createdAt: Date.now() - 86400000 * 5, tags: ['工作'] },
]

const mockTokenUsage: TokenUsage[] = [
  { date: '2024-01-01', used: 12500, limit: 100000 },
  { date: '2024-01-02', used: 8300, limit: 100000 },
  { date: '2024-01-03', used: 15200, limit: 100000 },
  { date: '2024-01-04', used: 6800, limit: 100000 },
  { date: '2024-01-05', used: 9400, limit: 100000 },
  { date: '2024-01-06', used: 11200, limit: 100000 },
  { date: '2024-01-07', used: 7600, limit: 100000 },
]

export const useAppStore = create<AppStore>((set) => ({
  messages: mockMessages,
  skills: mockSkills,
  versions: mockVersions,
  workspaces: mockWorkspaces,
  memories: mockMemories,
  tokenUsage: mockTokenUsage,
  plugins: mockPlugins,
  settings: defaultSettings,
  currentWorkspaceId: '1',
  currentView: 'chat',
  isGuideOpen: false,
  currentGuideStep: 0,
  guideSteps: defaultGuideSteps,
  isUpdating: false,
  connectionStatus: 'connected',

  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  
  updateSkill: (id, enabled) => set((state) => ({
    skills: state.skills.map(skill => 
      skill.id === id ? { ...skill, enabled } : skill
    ),
  })),
  
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  
  setCurrentWorkspace: (id) => set({ currentWorkspaceId: id }),
  
  addWorkspace: (workspace) => set((state) => ({ workspaces: [...state.workspaces, workspace] })),
  
  deleteWorkspace: (id) => set((state) => ({ 
    workspaces: state.workspaces.filter(w => w.id !== id),
    currentWorkspaceId: state.currentWorkspaceId === id ? state.workspaces[0]?.id || id : state.currentWorkspaceId,
  })),
  
  addMemory: (memory) => set((state) => ({ memories: [...state.memories, memory] })),
  
  deleteMemory: (id) => set((state) => ({ memories: state.memories.filter(m => m.id !== id) })),
  
  updatePlugin: (id, enabled) => set((state) => ({
    plugins: state.plugins.map(plugin =>
      plugin.id === id ? { ...plugin, enabled } : plugin
    ),
  })),
  
  installPlugin: (plugin) => set((state) => ({
    plugins: state.plugins.map(p =>
      p.id === plugin.id ? { ...p, installed: true } : p
    ),
  })),
  
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings },
  })),
  
  setCurrentView: (view) => set({ currentView: view }),
  
  startGuide: () => set({ isGuideOpen: true, currentGuideStep: 0 }),
  
  nextGuideStep: () => set((state) => ({
    currentGuideStep: Math.min(state.currentGuideStep + 1, state.guideSteps.length - 1),
  })),
  
  prevGuideStep: () => set((state) => ({
    currentGuideStep: Math.max(state.currentGuideStep - 1, 0),
  })),
  
  closeGuide: () => set({ isGuideOpen: false }),
  
  setIsUpdating: (updating) => set({ isUpdating: updating }),
  
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  
  fetchVersions: () => set((state) => ({ versions: state.versions })),
  
  checkForUpdates: () => {
    set({ isUpdating: true })
    setTimeout(() => {
      set({ isUpdating: false })
    }, 2000)
  },
}))
