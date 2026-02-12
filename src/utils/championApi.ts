const DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com/cdn/16.3.1/data/en_US/champion.json'

const CHAMPION_API_URL = `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations`

// Get free champion ids from riot API
export async function fetchFreeChampionIds() {
  const response = await fetch(CHAMPION_API_URL, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': 'RGAPI-194e0353-1f33-4591-896b-22b622633496',
    },
  })
  if (!response.ok) throw new Error('Failed to fetch free champion ids')
  const data = await response.json()
  return data.freeChampionIds
}

// Get all champion data from datadragon
export async function fetchChampionInfo() {
  const response = await fetch(DATA_DRAGON_URL)
  if (!response.ok) throw new Error('Failed to get champion info!')
  const data = await response.json()
  return data.data
}

// Return an array of champion info
export async function fetchFreeChampions() {
  const [freeChampionIds, championInfo] = await Promise.all([
    fetchFreeChampionIds(),
    fetchChampionInfo(),
  ])

  // Filter champions whose numeric key matches free IDs
  const freeChampionInfo = Object.values(championInfo).filter((champ: any) =>
    freeChampionIds.includes(Number(champ.key)),
  )

  return freeChampionInfo
}
