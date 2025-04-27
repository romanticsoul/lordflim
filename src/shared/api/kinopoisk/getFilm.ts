export interface Country {
  country: string
}

export interface Genre {
  genre: string
}

export interface Film {
  kinopoiskId: number
  kinopoiskHDId?: string | null
  imdbId?: string | null
  nameRu?: string | null
  nameEn?: string | null
  nameOriginal?: string | null
  posterUrl: string
  posterUrlPreview: string
  coverUrl?: string | null
  logoUrl?: string | null
  reviewsCount: number
  ratingGoodReview?: number | null
  ratingGoodReviewVoteCount?: number | null
  ratingKinopoisk?: number | null
  ratingKinopoiskVoteCount?: number | null
  ratingImdb?: number | null
  ratingImdbVoteCount?: number | null
  ratingFilmCritics?: number | null
  ratingFilmCriticsVoteCount?: number | null
  ratingAwait?: number | null
  ratingAwaitCount?: number | null
  ratingRfCritics?: number | null
  ratingRfCriticsVoteCount?: number | null
  webUrl: string
  year?: number | null
  filmLength?: number | null
  slogan?: string | null
  description?: string | null
  shortDescription?: string | null
  editorAnnotation?: string | null
  isTicketsAvailable: boolean
  productionStatus?:
    | "FILMING"
    | "PRE_PRODUCTION"
    | "COMPLETED"
    | "ANNOUNCED"
    | "UNKNOWN"
    | "POST_PRODUCTION"
    | null
  type: "FILM" | "VIDEO" | "TV_SERIES" | "MINI_SERIES" | "TV_SHOW"
  ratingMpaa?: string | null
  ratingAgeLimits?: string | null
  hasImax?: boolean | null
  has3D?: boolean | null
  lastSync: string
  countries: Country[]
  genres: Genre[]
  startYear?: number | null
  endYear?: number | null
  serial?: boolean | null
  shortFilm?: boolean | null
  completed?: boolean | null
}

export async function getFilm(kinopoiskId: number) {
  const url = `${process.env.KINOPOISK_API_URL}/api/v2.2/films/${kinopoiskId}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.KINOPOISK_API_KEY!,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) return null

  const data: Film = await res.json()
  return data
}
