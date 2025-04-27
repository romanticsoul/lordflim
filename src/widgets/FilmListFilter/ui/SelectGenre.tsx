"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import type { GenreAndCountries } from "../api"
import { useFilterQueryStates } from "../model"

type SelectGenreProps = {
  genres: GenreAndCountries["genres"]
}

export function SelectGenre(props: SelectGenreProps) {
  const genres = props.genres
  const [{ genre }, setFilter] = useFilterQueryStates()

  return (
    <Select
      defaultValue={genre ? genre.toString() : "all"}
      onValueChange={(value) => setFilter({ genre: Number(value) || null })}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Жанр" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Все жанры</SelectItem>
          {genres.map(({ id, genre }) => (
            <SelectItem key={id} value={id.toString()}>
              {genre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
