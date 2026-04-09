import type { Dimension } from './dimensions'

export const dimensionsEn: Dimension[] = [
  {
    id: 'energy',
    name: 'Energy',
    labelA: 'Manic',
    labelB: 'Depressed',
    color: '#fb923c',
    description: 'Is your default state hyped up or burned out?',
    insight: 'Manic isn\'t truly crazy — it\'s your reward system screaming "charge!" Depressed isn\'t negative — it\'s your defense mechanism whispering "don\'t get hurt."',
  },
  {
    id: 'social',
    name: 'Social',
    labelA: 'Extro',
    labelB: 'Intro',
    color: '#60a5fa',
    description: 'Are you the life of the party or the one hiding behind the potted plant?',
    insight: 'Social anxiety isn\'t hating people — it\'s caring too intensely. Social confidence isn\'t not caring — it\'s choosing not to be held hostage by others\' opinions.',
  },
  {
    id: 'drive',
    name: 'Drive',
    labelA: 'Grind',
    labelB: 'Chill',
    color: '#f472b6',
    description: 'Are you grinding to the stratosphere or chilling at the earth\'s core?',
    insight: 'Grinding is essentially fear of losing. Chilling is waiting for a reason worth grinding for.',
  },
  {
    id: 'expression',
    name: 'Expression',
    labelA: 'Savage',
    labelB: 'Sweet',
    color: '#34d399',
    description: 'Do you deal damage or dish out sugar?',
    insight: 'Being savage is sometimes the most honest kindness; being sweet is sometimes the gentlest evasion.',
  },
]
