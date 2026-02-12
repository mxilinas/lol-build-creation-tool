export type StatsInfo = {
  baseStats: Record<string, number>
  perLevel: Record<string, number>
  maxStats: Record<string, number>
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
export function getModdedStats(statsInfo: StatsInfo, level: number): Record<string, number> {
  const moddedStats: Record<string, number> = {}

  for (const key in statsInfo.baseStats) {
    if (Object.prototype.hasOwnProperty.call(statsInfo.baseStats, key)) {
      const baseValue = statsInfo.baseStats[key]
      const perLevelValue = statsInfo.perLevel[key] ?? 0
      moddedStats[key] = baseValue! + perLevelValue * level
    }
  }

  return moddedStats
}
