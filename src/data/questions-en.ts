import type { Question, BonusQuestion } from './questions'

export const questionsEn: Question[] = [
  // ========== Dimension 1: Manic vs Depressed (Energy) ==========
  {
    id: 1,
    dimension: 'energy',
    text: 'Monday morning alarm goes off. Your first reaction?',
    optionA: { emoji: '🔥', text: 'Spring out of bed — today I conquer everything' },
    optionNeutral: { emoji: '🫠', text: 'Oscillate between "get up" and "don\'t" for 5 minutes' },
    optionB: { emoji: '💀', text: 'Close eyes, pretend to be dead, wait for social resurrection' },
  },
  {
    id: 2,
    dimension: 'energy',
    text: 'Friend texts: "Let\'s go out and have fun!" You?',
    optionA: { emoji: '🚀', text: 'Already at the door before putting on shoes' },
    optionNeutral: { emoji: '🤔', text: 'Depends on where, with whom, cost, and my mental state' },
    optionB: { emoji: '🛌', text: '"Go where? I\'m already married to my bed"' },
  },
  {
    id: 3,
    dimension: 'energy',
    text: 'Exciting new opportunity (skydiving / startup / confessing feelings). Your inner voice?',
    optionA: { emoji: '⚡', text: 'YOLO — living means keeping that heart rate up' },
    optionNeutral: { emoji: '⚖️', text: 'Spend 3 days on a pros-and-cons analysis, then go with the flow' },
    optionB: { emoji: '🐢', text: 'After analyzing every disaster scenario — nah, I\'ll pass' },
  },
  {
    id: 4,
    dimension: 'energy',
    text: 'Your daily step count says what about you?',
    optionA: { emoji: '🏃', text: '10,000+ daily — sitting still is physical torture' },
    optionNeutral: { emoji: '📊', text: 'Wildly fluctuates based on whether life is chasing me' },
    optionB: { emoji: '🦥', text: 'Single digits possible — bed to fridge is today\'s marathon' },
  },

  // ========== Dimension 2: Extro vs Intro (Social) ==========
  {
    id: 5,
    dimension: 'social',
    text: 'Added to a group chat full of strangers. You?',
    optionA: { emoji: '🎤', text: 'Break the ice first: "Hey everyone, I\'m XX, hit me up!"' },
    optionNeutral: { emoji: '👀', text: 'Lurk for a week to study the ecosystem before speaking' },
    optionB: { emoji: '🫥', text: 'Silently mute the chat, pretend it doesn\'t exist' },
  },
  {
    id: 6,
    dimension: 'social',
    text: 'Someone tells a bad joke at a party and nobody laughs. You?',
    optionA: { emoji: '😂', text: 'Laugh loud, riff on it, rescue the vibe' },
    optionNeutral: { emoji: '🙂', text: 'Polite smile while calculating the optimal laugh volume' },
    optionB: { emoji: '😰', text: 'Die of secondhand cringe, wish I could evaporate to save them' },
  },
  {
    id: 7,
    dimension: 'social',
    text: 'Run into an acquaintance on the street. You?',
    optionA: { emoji: '👋', text: 'Wave enthusiastically, might even chat for 10 minutes' },
    optionNeutral: { emoji: '📱', text: 'Pretend to check phone, then decide based on their reaction' },
    optionB: { emoji: '🔀', text: 'Activate human GPS — immediately calculate optimal detour' },
  },
  {
    id: 8,
    dimension: 'social',
    text: 'Impromptu speech in front of 100 people. You?',
    optionA: { emoji: '🎙️', text: 'Thrilled — finally a stage to showcase myself' },
    optionNeutral: { emoji: '😅', text: 'Nervous but can power through, need 3 days to recover' },
    optionB: { emoji: '⚰️', text: 'Might as well hold my funeral on stage, save the trouble' },
  },

  // ========== Dimension 3: Grind vs Chill (Drive) ==========
  {
    id: 9,
    dimension: 'drive',
    text: 'See someone flexing a new job / promotion / house on social media. Your reaction?',
    optionA: { emoji: '💪', text: 'Immediately open laptop, start updating resume, spam apply' },
    optionNeutral: { emoji: '🍵', text: 'Hit like, continue living my own life' },
    optionB: { emoji: '🤷', text: '"Congrats, but what does that have to do with me?" (close app)' },
  },
  {
    id: 10,
    dimension: 'drive',
    text: 'Deadline in 3 days. Where are you now?',
    optionA: { emoji: '📋', text: 'Finished 3 days ago, now on my 4th revision' },
    optionNeutral: { emoji: '🔄', text: 'Half done, waiting for inspiration to strike' },
    optionB: { emoji: '🎮', text: 'Opened the doc, closed it immediately — "tomorrow me will be stronger"' },
  },
  {
    id: 11,
    dimension: 'drive',
    text: 'Your take on "hard work always pays off"?',
    optionA: { emoji: '🏆', text: 'Absolutely believe it, and I\'m already on the path' },
    optionNeutral: { emoji: '🎲', text: 'Direction matters more — smart chilling beats blind grinding' },
    optionB: { emoji: '🌊', text: '"What if, just maybe, fate is completely random?"' },
  },
  {
    id: 12,
    dimension: 'drive',
    text: 'What are you doing on your day off?',
    optionA: { emoji: '📚', text: 'Online courses / gym / side hustle — rest is not an option' },
    optionNeutral: { emoji: '🎬', text: 'Binge shows + delivery, with a hint of guilt for "wasting time"' },
    optionB: { emoji: '☁️', text: 'Absolutely nothing — soul buffering, enjoying potato freedom' },
  },

  // ========== Dimension 4: Savage vs Sweet (Expression) ==========
  {
    id: 13,
    dimension: 'expression',
    text: 'Friend asks if their new outfit looks good (it doesn\'t). You?',
    optionA: { emoji: '🗡️', text: '"Wearing that in public takes courage — and you clearly have it"' },
    optionNeutral: { emoji: '🎭', text: 'Find something genuinely nice to say: "the color is… unique"' },
    optionB: { emoji: '🌸', text: '"Gorgeous! You look amazing in everything!"' },
  },
  {
    id: 14,
    dimension: 'expression',
    text: 'Someone posts a clearly wrong take in a group chat. You?',
    optionA: { emoji: '⚔️', text: 'Immediately type a rebuttal — logical, devastating, surgical' },
    optionNeutral: { emoji: '🤐', text: 'Internally screaming, but not typing a single word' },
    optionB: { emoji: '🕊️', text: '"You\'re right" (none of my business anyway)' },
  },
  {
    id: 15,
    dimension: 'expression',
    text: 'Comforting a friend after a breakup. Your style?',
    optionA: { emoji: '💊', text: '"Honestly? You\'re better off. You deserve way more"' },
    optionNeutral: { emoji: '🍺', text: 'Skip the words, just take them out for a drink' },
    optionB: { emoji: '🫂', text: '"You are the most wonderful person, they didn\'t deserve you"' },
  },
  {
    id: 16,
    dimension: 'expression',
    text: 'Your most-used emoji / texting vibe?',
    optionA: { emoji: '😏', text: '"lol", "sure", "whatever", the sarcastic smile emoji' },
    optionNeutral: { emoji: '😐', text: '"ok", "got it", "noted" — pure information, zero emotion' },
    optionB: { emoji: '🥰', text: '"okie~", "tysm!", "you\'re the best!", all the cute stickers' },
  },
]

export const bonusQuestionEn: BonusQuestion = {
  text: '⚠️ Anomaly detected: Your personality is in quantum superposition. Select your true state right now —',
  options: [
    { emoji: '😎', text: 'I knew I was special', dimension: 'energy', value: 4 },
    { emoji: '⏩', text: 'Just give me my result already!', dimension: 'drive', value: 4 },
    { emoji: '🤷', text: 'Whatever, doesn\'t matter', dimension: null, value: 0 },
    { emoji: '😒', text: 'What kind of weird test is this', dimension: 'social', value: -4 },
    { emoji: '🫣', text: 'So nervous and excited', dimension: 'expression', value: -4 },
  ],
}
