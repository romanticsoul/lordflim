import { formatFilmLength } from "@/shared/lib/utils"
import type { MovieDtoV14 } from "@/shared/lib/kinopoisk/generated"
import Image from "next/image"

type FilmDetailsProps = {
  movie: MovieDtoV14
}

export async function FilmDetails({ movie }: FilmDetailsProps) {
  const placeholderPosterUrl = "https://placehold.co/300x400.svg?text=Изображение%0Aне+найдено"
  const posterUrl = movie?.poster?.url || movie?.poster?.previewUrl || placeholderPosterUrl
  const name = movie?.name || movie?.enName || movie?.alternativeName
  const nameOriginal = movie?.alternativeName
  const description = movie?.description || movie?.shortDescription
  const ratingKp = movie?.rating?.kp || "–"
  const ratingImdb = movie?.rating?.imdb || "–"
  const year = movie?.year || "–"
  const countries = movie?.countries?.map((c) => c.name).join(", ") || "–"
  const genres = movie?.genres?.map((g) => g.name).join(", ") || "–"
  const filmLength = movie?.movieLength ? formatFilmLength(movie?.movieLength) : "–"
  const directors = movie?.persons?.filter((s) => s.enProfession === "director")
  const directorsNames = directors?.map((d) => d.name).join(", ")
  const actors = movie?.persons?.filter((p) => p.enProfession === "actor").splice(0, 10)
  const actorsNames = actors?.map((a) => a.name).join(", ")

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <Image
          src={posterUrl}
          alt="Изображение контента"
          width={300}
          height={400}
          className="aspect-2/3 w-full rounded-lg border object-cover"
        />
      </div>
      <div className="col-span-7">
        <h1 className="mb-2 text-3xl font-black">{name} смотреть онлайн</h1>

        <div className="mb-6 flex gap-2">
          <div className="foknt-medium rounded-full border px-4 py-2 text-xs">
            Кинопоиск: {ratingKp}
          </div>
          <div className="rounded-full border px-4 py-2 text-xs font-medium">
            IMDb: {ratingImdb}
          </div>
        </div>

        <div className="mb-6">{description}</div>
        <ul className="grid gap-2 text-sm marker:flex marker:gap-2 marker:font-medium">
          <li>
            <span className="font-bold">Год:</span> {year}
          </li>
          <li>
            <span className="font-bold">Страна:</span> {countries}
          </li>
          <li>
            <span className="font-bold">Оригинальное название:</span> {nameOriginal}
          </li>
          <li>
            <span className="font-bold">Жанр:</span> {genres}
          </li>
          <li>
            <span className="font-bold">Длительность:</span> {filmLength}
          </li>

          {/* Режиссёр */}
          {directors && directors.length && (
            <li>
              <span className="font-bold">Режиссёр:</span> {directorsNames}
            </li>
          )}

          {/* Актёры */}
          {actors && actors.length && (
            <li>
              <span className="font-bold text-nowrap">В главных ролях:</span> {actorsNames}и др.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
