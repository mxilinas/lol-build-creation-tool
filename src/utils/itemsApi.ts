import type { LeagueItem } from '@/types/items'

const ITEMS_URL = `https://ddragon.leagueoflegends.com/cdn/16.3.1/data/en_US/item.json`

export async function fetchAllItemsWeb(): Promise<Record<string, LeagueItem>[]> {
  const response = await fetch(ITEMS_URL)
  if (!response.ok) throw new Error('Failed to fetch all items')
  const data: { data: Record<string, LeagueItem>[] } = await response.json()
  console.log(data.data)
  return data.data
}

export async function fetchAllItemsLocal(): Promise<Record<string, LeagueItem>[]> {
  const response = await fetch('/info/item.json')
  if (!response.ok) throw new Error('Failed to fetch all items')
  const data: { data: Record<string, LeagueItem>[] } = await response.json()
  console.log(data.data)
  return data.data
}
