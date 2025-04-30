import type { MovieDtoV14 } from "@/shared/lib/kinopoisk/generated"
import { ContentCard } from "@/entities/content-card"
// import { getFilmSimilarList } from "../api/index"

type FilmSimilarListProps = {
  similar: MovieDtoV14["similarMovies"]
}

export async function FilmSimilarList({ similar }: FilmSimilarListProps) {
  // const films = await getFilmSimilarList(kinopoiskId)

  if (!similar) return <div>Ошибка загрузки</div>

  return (
    <div className="grid grid-cols-5 gap-4">
      {similar.splice(0, 5).map((movie) => (
        <ContentCard
          key={movie.id}
          kinopoiskId={movie.id}
          imageUrl={movie.poster?.url || movie.poster?.previewUrl}
          title={movie.name || movie.enName || movie.alternativeName}
        />
      ))}
    </div>
  )
}
