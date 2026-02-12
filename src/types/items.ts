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
