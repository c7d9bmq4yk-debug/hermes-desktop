import { useState } from 'react'
import { Wrench, Search, ToggleLeft, ToggleRight, Plus, File, Code, Calculator, Calendar, Mail, Globe, HelpCircle } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import type { Skill } from '../../types'

const iconMap: Record<string, typeof File> = {
  File,
  Search: Globe,
  Code,
  Calculator,
  Calendar,
  Mail,
  Wrench,
}

function SkillsView() {
  const { skills, updateSkill, addSkill } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('全部')
  
  const categories = ['全部', ...new Set(skills.map(s => s.category))]
  
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === '全部' || skill.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '新技能',
      description: '这是一个新添加的技能',
      enabled: false,
      category: '其他',
      icon: 'Wrench',
    }
    addSkill(newSkill)
  }

  return (
    <div className="skills-section h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">技能管理</h1>
          <p className="text-sm text-text-secondary mt-1">管理Hermes可用的技能和工具</p>
        </div>
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          添加技能
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索技能..."
            className="w-full bg-bg-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Wrench
            return (
              <div
                key={skill.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  skill.enabled 
                    ? 'bg-bg-secondary border-primary/30 hover:border-primary/50' 
                    : 'bg-bg-secondary/50 border-border opacity-70'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    skill.enabled ? 'bg-primary/20' : 'bg-bg-tertiary'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${skill.enabled ? 'text-primary' : 'text-text-disabled'}`} />
                  </div>
                  <button
                    onClick={() => updateSkill(skill.id, !skill.enabled)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      skill.enabled ? 'bg-primary/20 text-primary' : 'bg-bg-tertiary text-text-secondary'
                    }`}
                  >
                    {skill.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                </div>
                
                <h3 className="font-semibold text-text-primary mb-1">{skill.name}</h3>
                <p className="text-sm text-text-secondary mb-3">{skill.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-bg-tertiary rounded-md text-xs text-text-secondary">
                    {skill.category}
                  </span>
                  <span className={`text-xs ${skill.enabled ? 'text-success' : 'text-text-disabled'}`}>
                    {skill.enabled ? '已启用' : '已禁用'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="w-12 h-12 text-text-disabled mb-4" />
            <p className="text-text-secondary">未找到匹配的技能</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsView
