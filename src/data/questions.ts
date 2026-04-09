export interface Question {
  id: number
  dimension: 'energy' | 'social' | 'drive' | 'expression'
  text: string
  optionA: { emoji: string; text: string }
  optionNeutral: { emoji: string; text: string }
  optionB: { emoji: string; text: string }
}

export interface BonusOption {
  emoji: string
  text: string
  dimension: 'energy' | 'social' | 'drive' | 'expression' | null
  value: number
}

export interface BonusQuestion {
  text: string
  options: BonusOption[]
}

export const bonusQuestion: BonusQuestion = {
  text: '⚠️ 系统检测到异常：你的人格处于量子叠加态。请选择你此刻的真实状态——',
  options: [
    { emoji: '😎', text: '我就知道我不一般', dimension: 'energy', value: 4 },
    { emoji: '⏩', text: '赶紧给我结果！', dimension: 'drive', value: 4 },
    { emoji: '🤷', text: '无所谓，都行', dimension: null, value: 0 },
    { emoji: '😒', text: '这什么奇怪的测试', dimension: 'social', value: -4 },
    { emoji: '🫣', text: '好紧张好期待啊', dimension: 'expression', value: -4 },
  ],
}

export const questions: Question[] = [
  // ========== 维度 1: 疯 vs 丧（能量模式）==========
  {
    id: 1,
    dimension: 'energy',
    text: '周一早上闹钟响了，你的第一反应是？',
    optionA: { emoji: '🔥', text: '弹射起床，今天又是暴杀一切的一天' },
    optionNeutral: { emoji: '🫠', text: '在"起"和"不起"之间反复横跳五分钟' },
    optionB: { emoji: '💀', text: '闭眼假装自己已经死了，等待社会性复活' },
  },
  {
    id: 2,
    dimension: 'energy',
    text: '朋友突然发消息说"走，出去浪"，你？',
    optionA: { emoji: '🚀', text: '鞋都没穿好人已经到门口了' },
    optionNeutral: { emoji: '🤔', text: '取决于去哪、和谁、要不要花钱、以及今天的精神状态' },
    optionB: { emoji: '🛌', text: '"浪什么浪，我和床已经结婚了"' },
  },
  {
    id: 3,
    dimension: 'energy',
    text: '遇到一个超刺激的新机会（跳伞/创业/表白），你的内心OS？',
    optionA: { emoji: '⚡', text: '不管了冲就完事，活着就要心跳加速' },
    optionNeutral: { emoji: '⚖️', text: '用三天时间做利弊分析，然后随缘' },
    optionB: { emoji: '🐢', text: '分析完所有可能翻车的场景后决定——还是算了吧' },
  },
  {
    id: 4,
    dimension: 'energy',
    text: '你的微信运动步数最能说明什么？',
    optionA: { emoji: '🏃', text: '日均一万步以上，静止对我是一种酷刑' },
    optionNeutral: { emoji: '📊', text: '波动很大，取决于那天有没有被生活追着跑' },
    optionB: { emoji: '🦥', text: '个位数不是梦，从床到冰箱就是今日极限' },
  },

  // ========== 维度 2: 牛 vs 恐（社交模式）==========
  {
    id: 5,
    dimension: 'social',
    text: '被拉进一个全是陌生人的群聊，你？',
    optionA: { emoji: '🎤', text: '率先打破沉默："大家好我是XX，有事找我！"' },
    optionNeutral: { emoji: '👀', text: '先潜水观察一周生态再决定要不要开口' },
    optionB: { emoji: '🫥', text: '默默把群设置成免打扰，假装这个群不存在' },
  },
  {
    id: 6,
    dimension: 'social',
    text: '聚会上有人讲了个冷笑话没人笑，你？',
    optionA: { emoji: '😂', text: '大声接梗，顺便把场子热起来' },
    optionNeutral: { emoji: '🙂', text: '礼貌微笑，内心在计算该笑多大声才合适' },
    optionB: { emoji: '😰', text: '替他感到窒息，恨不得原地蒸发帮他解围' },
  },
  {
    id: 7,
    dimension: 'social',
    text: '走在路上偶遇认识但不太熟的人，你？',
    optionA: { emoji: '👋', text: '热情招手，说不定还能聊个十分钟' },
    optionNeutral: { emoji: '📱', text: '假装在看手机，看对方反应再决定' },
    optionB: { emoji: '🔀', text: '启动人形GPS，立即计算最优绕路方案' },
  },
  {
    id: 8,
    dimension: 'social',
    text: '如果要你在100人面前做即兴演讲，你？',
    optionA: { emoji: '🎙️', text: '兴奋到起飞，终于有舞台展示我了' },
    optionNeutral: { emoji: '😅', text: '紧张但能撑住，讲完大概要缓三天' },
    optionB: { emoji: '⚰️', text: '建议直接在台上给我办追悼会比较省事' },
  },

  // ========== 维度 3: 卷 vs 躺（驱动模式）==========
  {
    id: 9,
    dimension: 'drive',
    text: '看到朋友圈有人晒offer/升职/买房，你的反应？',
    optionA: { emoji: '💪', text: '立刻打开电脑，打开招聘APP，开始疯狂投简历' },
    optionNeutral: { emoji: '🍵', text: '点个赞，然后继续过自己的小日子' },
    optionB: { emoji: '🤷', text: '"恭喜，但跟我有什么关系呢"（退出朋友圈）' },
  },
  {
    id: 10,
    dimension: 'drive',
    text: 'DDL还有三天，你现在在？',
    optionA: { emoji: '📋', text: '三天前就做完了，现在在检查第四遍' },
    optionNeutral: { emoji: '🔄', text: '做了一半，剩下的等灵感来了再说' },
    optionB: { emoji: '🎮', text: '刚打开文档又关了，"明天的我一定更强"' },
  },
  {
    id: 11,
    dimension: 'drive',
    text: '你对"努力就会有回报"这句话的看法？',
    optionA: { emoji: '🏆', text: '深信不疑，而且我已经在路上了' },
    optionNeutral: { emoji: '🎲', text: '方向比努力重要，盲目卷不如聪明躺' },
    optionB: { emoji: '🌊', text: '"有没有一种可能，命运是随机的"' },
  },
  {
    id: 12,
    dimension: 'drive',
    text: '休息日的你通常在？',
    optionA: { emoji: '📚', text: '学网课/健身/搞副业——休息是不可能休息的' },
    optionNeutral: { emoji: '🎬', text: '追剧+点外卖，但会因为"浪费时间"产生一丝罪恶感' },
    optionB: { emoji: '☁️', text: '什么都不干，灵魂放空，享受当一颗废物的自由' },
  },

  // ========== 维度 4: 毒 vs 甜（表达模式）==========
  {
    id: 13,
    dimension: 'expression',
    text: '朋友穿了件新衣服问你好不好看（其实很丑），你？',
    optionA: { emoji: '🗡️', text: '"你穿这个出门需要勇气，而你显然很勇"' },
    optionNeutral: { emoji: '🎭', text: '找一个真心能夸的点来夸，比如"颜色挺独特的"' },
    optionB: { emoji: '🌸', text: '"好看！你穿什么都好看！"' },
  },
  {
    id: 14,
    dimension: 'expression',
    text: '有人在群里发了条明显错误的观点，你？',
    optionA: { emoji: '⚔️', text: '立即打字反驳，条理清晰、杀人诛心' },
    optionNeutral: { emoji: '🤐', text: '内心疯狂吐槽，但键盘上一个字没打' },
    optionB: { emoji: '🕊️', text: '"你说得对"（反正跟我没关系）' },
  },
  {
    id: 15,
    dimension: 'expression',
    text: '安慰一个失恋的朋友，你的风格？',
    optionA: { emoji: '💊', text: '"说实话，分了也好，你值得更好的"' },
    optionNeutral: { emoji: '🍺', text: '不说废话，直接约出来喝一杯' },
    optionB: { emoji: '🫂', text: '"你是全世界最好的人，是ta不配拥有你"' },
  },
  {
    id: 16,
    dimension: 'expression',
    text: '你在微信聊天中最常用的表情/语气词？',
    optionA: { emoji: '😏', text: '"呵呵"、"好吧"、"随便你"、微笑表情' },
    optionNeutral: { emoji: '😐', text: '"嗯"、"ok"、"收到"——纯信息传达，不带感情' },
    optionB: { emoji: '🥰', text: '"好哒~"、"么么哒"、"辛苦啦"、各种可爱贴纸' },
  },
]
