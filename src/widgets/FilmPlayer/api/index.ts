export type KinoboxConfig = {
  baseUrl?: string
  players?: Record<string, PlayerConfig>
  params?: Record<string, Record<string, string>>
  translations?: Record<string, number>
  search?: SearchQuery
  events?: Partial<{
    playerLoaded: (success: boolean, players: KinoboxPlayer[]) => void
  }>
}

export type PlayerConfig = {
  enable?: boolean
  position?: number
  domain?: string
}

export type SearchQuery = {
  kinopoisk?: string
  imdb?: string
  tmdb?: string
  title?: string
  query?: string
}

export type KinoboxPlayer = {
  source: string
  iframeUrl: string
  success: boolean
  translations: Translation[]
}

export type Translation = {
  name: string
  quality?: string
}

const defaultTranslations: Record<string, number> = {
  "не требуется": 1,
  русская: 1,
  русский: 1,
  дублирование: 2,
  дублированный: 2,
  дубляж: 2,
  "полное дублирование": 2,
  lostfilm: 5,
  "hdrezka studio": 7,
  "проф.": 8,
  профессиональный: 8,
  многоголосый: 9,
  любительский: 20,
  двухголосый: 21,
  "звук с ts": 1100,
  оригинальная: 1111,
  белорус: 1234,
  субтитры: 1234,
  украин: 1234,
}

export async function fetchKinoboxPlayers(
  config: KinoboxConfig,
): Promise<KinoboxPlayer[]> {
  const settings = {
    baseUrl: config.baseUrl || "https://kinobox.tv/",
    players: config.players || {},
    params: config.params || {},
    translations: config.translations || defaultTranslations,
  }

  const searchParams = new URLSearchParams()

  const search = config.search || {}
  if (search.kinopoisk) searchParams.set("kinopoisk", search.kinopoisk)
  if (search.imdb) searchParams.set("imdb", search.imdb)
  if (search.tmdb) searchParams.set("tmdb", search.tmdb)
  if (search.title) searchParams.set("title", search.title)
  if (search.query) searchParams.set("query", search.query)

  const sources = Object.keys(settings.players)
  if (sources.length > 0)
    searchParams.set("sources", sources.join(",").toLowerCase())

  const url = new URL(settings.baseUrl)
  url.pathname = "api/players"
  url.search = searchParams.toString()

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)

  const data: KinoboxPlayer[] = await res.json()

  const filtered = data
    .filter((p) => p.success && p.iframeUrl)
    .filter((p) => {
      const conf = settings.players[p.source.toLowerCase()]
      return conf?.enable !== false
    })

  // Apply sorting by configured player positions
  filtered.sort((a, b) => {
    const posA = settings.players[a.source.toLowerCase()]?.position ?? 0
    const posB = settings.players[b.source.toLowerCase()]?.position ?? 0
    return posA - posB
  })

  config.events?.playerLoaded?.(filtered.length > 0, filtered)
  return filtered
}
