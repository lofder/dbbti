const zh = {
  subtitle: 'Dumbass Big Brain Type Indicator',
  slogan: '你的脑回路，值得被认真研究一下',
  startBtn: '开始发疯',
  meta: '16 道题 · 4 大维度 · 17 种人格（含隐藏彩蛋）',
  remaining: (n: number) => `还有 ${n} 题没答完`,
  submitBtn: '查看我的人格 →',
  loadingMessages: [
    '正在扫描你的脑回路…',
    '检测到大量沙雕基因…',
    '正在匹配人格数据库…',
    '分析你的社交毒性…',
    '计算你的摆烂指数…',
    '即将揭晓真相…',
  ],
  yourType: '你的 DBBTI 人格',
  sectionOverview: '🧬 人格概述',
  sectionSuperpower: '⚡ 超能力 & 盲区',
  superpowerLabel: '🛡️ 隐藏超能力',
  blindspotLabel: '💣 致命盲区',
  sectionDimensions: '📊 四维度解读',
  sectionRelationships: '👥 人际关系图鉴',
  friendsLabel: '朋友眼中的你',
  friendsEmoji: '🧑‍🤝‍🧑',
  romanticLabel: '恋人眼中的你',
  romanticEmoji: '💕',
  colleaguesLabel: '同事眼中的你',
  colleaguesEmoji: '💼',
  sectionCareer: '💼 职场生存指南',
  soulQuestionLabel: '💭 灵魂拷问',
  sectionQuote: '🎙️ 代表语录',
  sectionMatch: '🔗 人格匹配',
  bestMatchLabel: '💚 最佳拍档',
  worstMatchLabel: '💔 雷区人格',
  disclaimer1: '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手或人生判决书。',
  disclaimer2: '但如果你觉得准得离谱…那可能真的就是你。',
  saveBtn: '📸 保存结果图',
  savingBtn: '生成中…',
  restartBtn: '🔄 再测一次',
  aboutTitle: '关于作者',
  aboutText: '由 @lofder 在某个睡不着的夜晚突发奇想制作。本来只是想做个搞笑测试发给朋友，结果写着写着就认真了——16种人格、4大维度、心理学理论支撑……说好的摸鱼项目怎么变成了论文。',
  aboutDisclaimer: '本项目纯属娱乐，如需专业心理评估请咨询专业人士。',
  aboutStar: '觉得好玩？给个 Star 不过分吧 ⭐',
  aboutGithub: 'https://github.com/lofder/dbbti',
  aboutMadeWith: '用 ❤️ 和一点点沙雕精神制作',
} as const

const en = {
  subtitle: 'Dumbass Big Brain Type Indicator',
  slogan: 'Your brain wiring deserves a serious examination',
  startBtn: 'Start the Madness',
  meta: '16 Questions · 4 Dimensions · 17 Types (incl. hidden Easter egg)',
  remaining: (n: number) => `${n} question${n > 1 ? 's' : ''} remaining`,
  submitBtn: 'Reveal My Type →',
  loadingMessages: [
    'Scanning your brain circuits…',
    'Massive dumbass genes detected…',
    'Matching personality database…',
    'Analyzing social toxicity levels…',
    'Calculating your slacker index…',
    'About to reveal the truth…',
  ],
  yourType: 'Your DBBTI Personality',
  sectionOverview: '🧬 Overview',
  sectionSuperpower: '⚡ Superpower & Blind Spot',
  superpowerLabel: '🛡️ Hidden Superpower',
  blindspotLabel: '💣 Fatal Blind Spot',
  sectionDimensions: '📊 4-Dimension Breakdown',
  sectionRelationships: '👥 Relationship Map',
  friendsLabel: 'How friends see you',
  friendsEmoji: '🧑‍🤝‍🧑',
  romanticLabel: 'How lovers see you',
  romanticEmoji: '💕',
  colleaguesLabel: 'How colleagues see you',
  colleaguesEmoji: '💼',
  sectionCareer: '💼 Career Survival Guide',
  soulQuestionLabel: '💭 Soul Question',
  sectionQuote: '🎙️ Signature Quote',
  sectionMatch: '🔗 Personality Match',
  bestMatchLabel: '💚 Best Match',
  worstMatchLabel: '💔 Worst Match',
  disclaimer1: 'This test is for entertainment only. Don\'t use it for diagnosis, job interviews, dating, breakups, or life decisions.',
  disclaimer2: 'But if it feels scarily accurate… it might just be the real you.',
  saveBtn: '📸 Save Result Image',
  savingBtn: 'Generating…',
  restartBtn: '🔄 Try Again',
  aboutTitle: 'About the Creator',
  aboutText: 'Built by @lofder during a sleepless night of questionable decisions. Started as a joke quiz to send friends, somehow ended up with 16 personality types, 4 dimensions, and actual psychology backing it up — the "quick meme project" that got out of hand.',
  aboutDisclaimer: 'This project is purely for fun — for professional assessment, please consult a specialist.',
  aboutStar: 'Had fun? A Star would be nice ⭐',
  aboutGithub: 'https://github.com/lofder/dbbti',
  aboutMadeWith: 'Made with ❤️ and a sprinkle of dumbass energy',
} as const

export interface UiStrings {
  subtitle: string
  slogan: string
  startBtn: string
  meta: string
  remaining: (n: number) => string
  submitBtn: string
  loadingMessages: readonly string[]
  yourType: string
  sectionOverview: string
  sectionSuperpower: string
  superpowerLabel: string
  blindspotLabel: string
  sectionDimensions: string
  sectionRelationships: string
  friendsLabel: string
  friendsEmoji: string
  romanticLabel: string
  romanticEmoji: string
  colleaguesLabel: string
  colleaguesEmoji: string
  sectionCareer: string
  soulQuestionLabel: string
  sectionQuote: string
  sectionMatch: string
  bestMatchLabel: string
  worstMatchLabel: string
  disclaimer1: string
  disclaimer2: string
  saveBtn: string
  savingBtn: string
  restartBtn: string
  aboutTitle: string
  aboutText: string
  aboutDisclaimer: string
  aboutStar: string
  aboutGithub: string
  aboutMadeWith: string
}

export const ui: Record<'zh' | 'en', UiStrings> = { zh, en }
