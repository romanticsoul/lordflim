"use server"

interface SimilarFilms {
  total: number
  items: SimilarFilmItem[]
}

interface SimilarFilmItem {
  filmId: number
  nameRu: string | null
  nameEn: string | null
  nameOriginal: string | null
  posterUrl: string
  posterUrlPreview: string
  relationType: "SIMILAR"
}

export async function getFilmSimilarList(kinopoiskId: number) {
  const url = `${process.env.KINOPOISK_API_URL}/api/v2.2/films/${kinopoiskId}/similars`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.KINOPOISK_API_KEY!,
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) return null
  const data: SimilarFilms = await res.json()
  return data
}
