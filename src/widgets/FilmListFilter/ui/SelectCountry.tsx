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
  const [{ county }, setFilter] = useFilterQueryStates()

  return (
    <Select
      defaultValue={county ? county.toString() : "all"}
      onValueChange={(value) => setFilter({ county: Number(value) || null })}
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
