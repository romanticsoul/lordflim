import { getFilm, getStaff } from "@/shared/api/kinopoisk"
import { formatFilmLength } from "@/shared/lib/utils"
import Image from "next/image"

type FilmDetailsProps = {
  kinopoiskId: number
}

export async function FilmDetails({ kinopoiskId }: FilmDetailsProps) {
  const film = await getFilm(kinopoiskId)
  const staff = await getStaff(kinopoiskId)

  const placeholderImg = "https://placehold.co/300x400.svg?text=Изображение%0Aне+найдено"
  const filmName = film?.nameRu || film?.nameEn || film?.nameOriginal
  const filmLength = film?.filmLength ? formatFilmLength(film.filmLength) : null
  const actors = staff?.filter((s) => s.professionKey === "ACTOR")
  const directors = staff?.filter((s) => s.professionKey === "DIRECTOR")

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <Image
          src={film?.posterUrl || placeholderImg}
          alt="Изображение контента"
          width={300}
          height={400}
          className="aspect-2/3 w-full rounded-lg border object-cover"
        />
      </div>
      <div className="col-span-7">
        <h1 className="mb-2 text-3xl font-black">{filmName} смотреть онлайн</h1>

        <div className="mb-6 flex gap-2">
          <div className="rounded-full border px-4 py-2 text-xs font-medium">
            Кинопоиск: {film?.ratingKinopoisk || "–"}
          </div>
          <div className="rounded-full border px-4 py-2 text-xs font-medium">
            IMDb: {film?.ratingImdb || "–"}
          </div>
        </div>

        <div className="mb-6">{film?.description}</div>
        <ul className="grid gap-2 text-sm marker:flex marker:gap-2 marker:font-medium">
          {/* Дата выхода */}
          {film?.year && (
            <li>
              <span className="font-bold">Год:</span> {film.year}
            </li>
          )}

          {/* Страна */}
          {film?.countries && film.countries.length && (
            <li>
              <span className="font-bold">Страна:</span>{" "}
              {film.countries.map((c) => c.country).join(", ")}
            </li>
          )}

          {/* Оригинальное название */}
          {film?.nameOriginal && (
            <li>
              <span className="font-bold">Оригинальное название:</span> {film.nameOriginal}
            </li>
          )}

          {/* Жанр */}
          {film?.genres && film.genres.length && (
            <li>
              <span className="font-bold">Жанр:</span> {film.genres.map((g) => g.genre).join(", ")}
            </li>
          )}

          {/* Длительность фильма */}
          {filmLength && (
            <li>
              <span className="font-bold">Длительность:</span> {filmLength}
            </li>
          )}

          {/* Режиссёр */}
          {directors && directors.length > 0 && (
            <li>
              <span className="font-bold">Режиссёр:</span>{" "}
              {directors.map((d) => d.nameRu || d.nameEn).join(", ")}
            </li>
          )}

          {/* Актёры */}
          {actors && actors.length > 0 && (
            <li>
              <span className="font-bold text-nowrap">В главных ролях:</span>{" "}
              {actors
                .map((a) => a.nameRu || a.nameEn)
                .splice(0, 10)
                .join(", ")}{" "}
              и др.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
