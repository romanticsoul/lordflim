import { ContentCard } from "@/entities/content-card"

interface PremiereResponse {
  total: number
  items: PremiereResponseItem[]
}

interface PremiereResponseItem {
  kinopoiskId: number
  nameRu: string | null
  nameEn: string | null
  year: number
  posterUrl: string
  posterUrlPreview: string
  countries: Country[]
  genres: Genre[]
  duration: number | null
  premiereRu: string
}

interface Country {
  country: string
}

interface Genre {
  genre: string
}

async function getFilmPremieres() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.toLocaleString("en-US", { month: "long" }).toUpperCase()

  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": "5384c918-c891-4c75-9413-466c383c5441",
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) return null

  const data: PremiereResponse = await res.json()
  return data
}

export default async function FilmPremieresPage() {
  const premieres = await getFilmPremieres()

  return (
    <main className="container py-12">
      <h1 className="mb-2 text-3xl font-black">Премьеры фильмов</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {premieres?.items.map((film) => (
          <ContentCard
            key={film.kinopoiskId}
            title={film.nameRu || film.nameEn}
            kinopoiskId={film.kinopoiskId}
            imageUrl={film.posterUrl || film.posterUrlPreview}
          />
        ))}
      </div>
    </main>
  )
}
