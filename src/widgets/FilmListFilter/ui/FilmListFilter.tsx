import { fetchGenresAndCountries } from "../api"
import { SelectGenre } from "./SelectGenre"
import { SelectCountry } from "./SelectCountry"
import { SelectYear } from "./SelectYear"
import { SelectSort } from "./SelectSort"
import Link from "next/link"

export async function FilmListFilter() {
  const genresAndCountries = await fetchGenresAndCountries()

  if (!genresAndCountries) {
    return <div>Загрузка данных</div>
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <SelectGenre genres={genresAndCountries.genres} />
      <SelectCountry countries={genresAndCountries.countries} />
      <SelectYear />
      <SelectSort />
      <Link href={`?country=1`}>ГОД</Link>
    </div>
  )
}
