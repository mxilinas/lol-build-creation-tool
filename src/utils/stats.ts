import { statBaseList, type LeagueItem, type StatBase, type StatPrefix } from '@/types/items'
import type { ParsedItemStat } from '@/types/items'

// Parse info from an itemstat key.
export function parseItemStat(key: string, value: number): ParsedItemStat {
  // Match prefix
  const prefixMatch = key.match(/^(Flat|rFlat|Percent|rPercent)/)
  if (!prefixMatch) throw new Error('Failed to find prefix!')
  const prefix = prefixMatch[1] as StatPrefix

  // Remove prefix and 'Mod'/'ModPerLevel' suffix
  let remainder = key.slice(prefix.length)
  let perLevel: 'PerLevel' | undefined

  if (remainder.endsWith('PerLevel')) {
    perLevel = 'PerLevel'
    remainder = remainder.slice(0, -'PerLevel'.length)
  }

  if (remainder.endsWith('Mod')) {
    remainder = remainder.slice(0, -'Mod'.length)
  }

  if (remainder.endsWith('Pool')) {
    remainder = remainder.slice(0, -'Pool'.length)
  }

  if (!statBaseList.includes(remainder as StatBase)) throw `Invalid remainder! ${remainder}`

  return {
    stat: remainder.toLowerCase() as StatBase,
    prefix: prefix,
    perLevel: perLevel,
    value: value,
  }
}

export type StatsInfo = {
  baseStats: Record<string, number>
  perLevel: Record<string, number>
  maxStats: Record<string, number>
}

export function applyItemStat(
  baseStat: number, // champion base stats
  parsedStat: ParsedItemStat, // parsed item stat
  championLevel: number, // level, used if perLevel
): number {
  let finalValue = baseStat

  // Determine the effective item value
  let valueToApply = parsedStat.value
  if (parsedStat.perLevel) {
    valueToApply *= championLevel // scale by level
  }

  switch (parsedStat.prefix) {
    case 'Flat':
    case 'rFlat':
      finalValue += valueToApply
      break
    case 'Percent':
    case 'rPercent':
      finalValue += finalValue * valueToApply // percent increase
      break
  }

  return finalValue
}

// Separate a champion's stats into baseStats and statsPerLevel
// Also calulate max values for each stat.
export function getStatsInfo(stats: Record<string, number>, maxLevel = 30): StatsInfo {
  const baseStats: Record<string, number> = {}
  const perLevel: Record<string, number> = {}
  const maxStats: Record<string, number> = {}

  for (const [key, value] of Object.entries(stats)) {
    if (key.endsWith('perlevel')) {
      const statName = key.slice(0, -'perlevel'.length)
      perLevel[statName] = value
    } else {
      baseStats[key] = value
    }
  }

  for (const key of Object.keys(baseStats)) {
    maxStats[key] = baseStats[key]! + (perLevel[key] || 0) * (maxLevel - 1)
  }

  return {
    baseStats: baseStats,
    perLevel: perLevel,
    maxStats: maxStats,
  }
}

// Return the modified stats applying the bonuses for level and selected items.
// TODO: Add selected items.
export function getModdedStats(
  championStats: Record<string, number>, // key and value pairs
  level: number,
  selectedItems: LeagueItem[],
): Record<string, number> {
  const moddedStats: Record<string, number> = {}

  const statsInfo: StatsInfo = getStatsInfo(championStats)

  for (const key in statsInfo.baseStats) {
    const baseValue = statsInfo.baseStats[key]

    // I'm assuming items and levels do not increase stats with zero base value.
    if (baseValue == 0) continue

    // Apply level bonuses
    if (Object.prototype.hasOwnProperty.call(statsInfo.baseStats, key)) {
      const perLevelValue = statsInfo.perLevel[key] ?? 0
      moddedStats[key] = baseValue! + perLevelValue * level
    }

    // Apply item bonuses
    for (const selectedItem of selectedItems) {
      for (const [itemkey, value] of Object.entries(selectedItem.stats)) {
        const parsedStat = parseItemStat(itemkey, value)
        if (key == parsedStat.stat) {
          moddedStats[key] = applyItemStat(moddedStats[key]!, parsedStat, level)
        }
      }
    }
  }

  return moddedStats
}
