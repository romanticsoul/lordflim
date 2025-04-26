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
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}/similars`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": "5384c918-c891-4c75-9413-466c383c5441",
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) return null

  const data: SimilarFilms = await res.json()
  return data
}
