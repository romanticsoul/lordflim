import { prisma } from "@/shared/lib/prisma/client"
import { kinopoiskApi } from "./client"
import type { MovieDtoV14 } from "./generated"

export async function getMovieById(id: number): Promise<MovieDtoV14 | null> {
  const film = await prisma.film.findUnique({ where: { id } })

  if (film) {
    return JSON.parse(film.response as string) as MovieDtoV14
  }

  const response = await kinopoiskApi.v14.movieControllerFindOneV14(id)
  if (!response.ok) return null

  await prisma.film.create({
    data: {
      id: id,
      response: JSON.stringify(response.data),
    },
  })

  return response.data
}
