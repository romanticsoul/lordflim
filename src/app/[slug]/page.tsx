import type { SearchParams } from "nuqs/server"
import { ContentCard } from "@/entities/content-card"
import { FilmListFilter, loadFilterSearchParams } from "@/widgets/FilmListFilter"

type ContentListPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

// TODO: remove this function when the API is ready
interface FilmSearchByFiltersResponse {
  total: number
  totalPages: number
  items: FilmSearchByFiltersResponseItem[]
}

interface FilmSearchByFiltersResponseItem {
  kinopoiskId: number
  imdbId: string | null
  nameRu: string | null
  nameEn: string | null
  nameOriginal: string | null
  countries: Country[]
  genres: Genre[]
  ratingKinopoisk: number | null
  ratingImdb: number | null
  year: number | null
  type: "FILM" | "TV_SHOW" | "VIDEO" | "MINI_SERIES" | "TV_SERIES" | "UNKNOWN"
  posterUrl: string
  posterUrlPreview: string
}

interface Country {
  country: string
}

interface Genre {
  genre: string
}

type FetchFilmsProps = {
  countries?: number | null
  genres?: number | null
  order?: "RATING" | "YEAR" | "NUM_VOTE" | null
  yearFrom?: number | null
  yearTo?: number | null
  page?: number | null
}

// TESTING
async function fetchFilms(queries: FetchFilmsProps) {
  const queryParams = new URLSearchParams()

  queryParams.append("ratingFrom", "6")

  Object.entries(queries).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString())
    }
  })

  const url = `${process.env.KINOPOISK_API_URL}/api/v2.2/films?${queryParams.toString()}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.KINOPOISK_API_KEY!,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) return null
  const data: FilmSearchByFiltersResponse = await res.json()
  return data
}

export default async function ContentListPage(props: ContentListPageProps) {
  const searchParams = await loadFilterSearchParams(props.searchParams)

  const films = await fetchFilms({
    countries: searchParams.county,
    genres: searchParams.genre,
    order: searchParams.sort,
    yearFrom: searchParams.yf,
    yearTo: searchParams.yt,
  })

  return (
    <div className="container py-12">
      {JSON.stringify(searchParams)}
      <FilmListFilter />
      {films && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {films.items.map((film) => (
            <ContentCard
              imageUrl={film.posterUrl || film.posterUrlPreview}
              key={film.kinopoiskId}
              kinopoiskId={film.kinopoiskId}
              title={`${film.ratingKinopoisk} ${film.nameRu || film.nameEn || film.nameOriginal}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
