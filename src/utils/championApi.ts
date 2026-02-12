const DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com/cdn/16.3.1/data/en_US/champion.json'
const CHAMPION_API_URL = `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations`

// Get free champion ids from riot API
export async function fetchFreeChampionIds(apiKey: string) {
  const response = await fetch(CHAMPION_API_URL, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': apiKey,
    },
  })

  if (!response.ok) {
    let errorMessage = 'Unknown error'
    let errorBody = null

    try {
      errorBody = await response.json()
      errorMessage = errorBody?.msg || errorBody?.message || JSON.stringify(errorBody)
    } catch (e) {
      errorMessage = await response.text()
    }

    throw new Error(
      `Request failed with status ${response.status} ${response.statusText}: ${errorMessage}`,
    )
  }

  const data = await response.json()
  return data.freeChampionIds
}

export async function fetchFreeChampionIdsLocal() {
  const response = await fetch('/public/info/freeChampionIds.json')

  if (!response.ok) {
    throw new Error(`Failed to fetch local champion ids: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  return data.freeChampionIds
}

// Return an array of champion info
export async function fetchFreeChampionsLocal() {
  const [freeChampionIds, championInfo] = await Promise.all([
    fetchFreeChampionIdsLocal(),
    fetchChampionInfo(),
  ])

  // Filter champions whose numeric key matches free IDs
  const freeChampionInfo = Object.values(championInfo).filter((champ: any) =>
    freeChampionIds.includes(Number(champ.key)),
  )

  return freeChampionInfo
}

// Get all champion data from datadragon
export async function fetchChampionInfo() {
  const response = await fetch(DATA_DRAGON_URL)
  if (!response.ok) throw new Error('Failed to get champion info!')
  const data = await response.json()
  return data.data
}

// Return an array of champion info
export async function fetchFreeChampions(apiKey: string) {
  const [freeChampionIds, championInfo] = await Promise.all([
    fetchFreeChampionIds(apiKey),
    fetchChampionInfo(),
  ])

  // Filter champions whose numeric key matches free IDs
  const freeChampionInfo = Object.values(championInfo).filter((champ: any) =>
    freeChampionIds.includes(Number(champ.key)),
  )

  return freeChampionInfo
}
