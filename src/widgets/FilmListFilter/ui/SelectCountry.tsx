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

type SelectCountryProps = {
  countries: GenreAndCountries["countries"]
}

export function SelectCountry(props: SelectCountryProps) {
  const countries = props.countries

  const [filter, setFilter] = useFilterQueryStates()

  return (
    <Select
      defaultValue={filter.county ? filter.county.toString() : "all"}
      onValueChange={(value) => {
        // const q = filterSerializer({
        // ...filter,
        // county: Number(value) || null,
        // })

        // router.push(q)
        setFilter({ county: Number(value) || null })
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Страна" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Все страны</SelectItem>
          {countries.map(({ id, country }) => (
            <SelectItem key={id} value={id.toString()}>
              {country}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
