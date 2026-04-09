export interface Dimension {
  id: 'energy' | 'social' | 'drive' | 'expression'
  name: string
  labelA: string
  labelB: string
  color: string
  description: string
  insight: string
}

export const dimensions: Dimension[] = [
  {
    id: 'energy',
    name: '能量模式',
    labelA: '疯',
    labelB: '丧',
    color: '#fb923c',
    description: '你的默认状态是在发疯还是在发霉？',
    insight: '疯不是真的疯，是你的奖赏系统在呐喊"冲啊"；丧不是消极，是你的保护机制在说"别受伤了"。',
  },
  {
    id: 'social',
    name: '社交模式',
    labelA: '牛',
    labelB: '恐',
    color: '#60a5fa',
    description: '你是人群的焦点还是人群的障碍物？',
    insight: '社恐不是讨厌人，是在乎得太用力；社牛不是不在乎，是选择了不被别人的眼光绑架。',
  },
  {
    id: 'drive',
    name: '驱动模式',
    labelA: '卷',
    labelB: '躺',
    color: '#f472b6',
    description: '你是卷到飞起还是躺到地心？',
    insight: '卷的本质是害怕输，躺的本质是在等一个值得努力的理由。',
  },
  {
    id: 'expression',
    name: '表达模式',
    labelA: '毒',
    labelB: '甜',
    color: '#34d399',
    description: '你输出伤害还是输出甜言蜜语？',
    insight: '毒舌有时是最诚实的温柔；嘴甜有时是最温柔的逃避。',
  },
]
