// Check if remainder is a valid StatBase
export const statBaseList: StatBase[] = [
  'HP',
  'MP',
  'HPRegen',
  'MPRegen',
  'Armor',
  'SpellBlock',
  'PhysicalDamage',
  'MagicDamage',
  'MovementSpeed',
  'AttackSpeed',
  'Dodge',
  'CritChance',
  'CritDamage',
  'Block',
  'EXPBonus',
  'Cooldown',
  'TimeDead',
  'GoldPer10',
  'MagicPenetration',
  'EnergyRegen',
  'EnergyPool',
  'LifeSteal',
  'SpellVamp',
]

export type StatBase =
  | 'HP'
  | 'MP'
  | 'HPRegen'
  | 'MPRegen'
  | 'Armor'
  | 'SpellBlock'
  | 'PhysicalDamage'
  | 'MagicDamage'
  | 'MovementSpeed'
  | 'AttackSpeed'
  | 'Dodge'
  | 'CritChance'
  | 'CritDamage'
  | 'Block'
  | 'EXPBonus'
  | 'Cooldown'
  | 'TimeDead'
  | 'GoldPer10'
  | 'MagicPenetration'
  | 'EnergyRegen'
  | 'EnergyPool'
  | 'LifeSteal'
  | 'SpellVamp'

export type StatPrefix = 'Flat' | 'rFlat' | 'Percent' | 'rPercent'

export type ParsedItemStat = {
  stat: StatBase
  prefix: StatPrefix
  perLevel?: 'PerLevel'
  value: number
}

export type LeagueItem = {
  name: string
  description: string
  colloq: string
  plaintext: string
  into?: string[] // Optional because not all items build into others
  image: ItemImage
  gold: ItemGold
  tags: string[]
  maps: Record<string, boolean> // Map ID -> availability
  stats: Record<string, number> // Dynamic stats
}

export type ItemImage = {
  full: string
  sprite: string
  group: string
  x: number
  y: number
  w: number
  h: number
}

export type ItemGold = {
  base: number
  purchasable: boolean
  total: number
  sell: number
}
