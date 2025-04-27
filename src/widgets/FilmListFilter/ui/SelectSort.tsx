"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { SortEnum, useFilterQueryStates } from "../model"

export function SelectSort() {
  const [{}, setFilter] = useFilterQueryStates()

  return (
    <Select
      defaultValue={SortEnum.RATING}
      onValueChange={(value: SortEnum) => setFilter({ sort: value })}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выбрать сортировку" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={SortEnum.RATING}>По рейтингу</SelectItem>
          <SelectItem value={SortEnum.NUM_VOTE}>По количеству отзывов</SelectItem>
          <SelectItem value={SortEnum.YEAR}>По дате выхода</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
