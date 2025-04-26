import { ContentCard } from "@/entities/content-card"
import { getFilmSimilarList } from "../api/index"

type FilmSimilarListProps = {
  kinopoiskId: number
}

export default async function FilmSimilarList({ kinopoiskId }: FilmSimilarListProps) {
  const films = await getFilmSimilarList(kinopoiskId)

  if (!films) return <div>Ошибка загрузки</div>

  return (
    <div className="grid grid-cols-5 gap-4">
      {films.items.splice(0, 5).map((film) => (
        <ContentCard
          key={film.filmId}
          kinopoiskId={film.filmId}
          imageUrl={film.posterUrl || film.posterUrlPreview}
          title={film.nameRu || film.nameEn || film.nameOriginal || "Неизвестный фильм"}
        />
      ))}
    </div>
  )
}
