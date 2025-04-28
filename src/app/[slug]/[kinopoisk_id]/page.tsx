import { notFound } from "next/navigation"
import { FilmDetails } from "@/widgets/FilmDetails"
import { FilmPlayer } from "@/widgets/FilmPlayer"
import { FilmSimilarList } from "@/widgets/FilmSimilarList"
import { getMovieById } from "@/shared/lib/kinopoisk/getMovieById"

type Params = Promise<{ slug: string; kinopoisk_id: string }>

export default async function ContentPage(props: { params: Params }) {
  const params = await props.params
  const kinopoiskId = Number(params.kinopoisk_id)

  const movie = await getMovieById(kinopoiskId)
  if (!movie) notFound()

  return (
    <main className="container py-12">
      <FilmDetails movie={movie} />
      <div className="my-12">
        <FilmPlayer kinopoiskId={kinopoiskId} />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-bold">Смотреть похожие</h2>
        <FilmSimilarList similar={movie.similarMovies} />
      </div>
    </main>
  )
}
