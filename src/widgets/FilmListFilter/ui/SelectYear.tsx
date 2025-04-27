"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { useFilterQueryStates } from "../model"

export function SelectYear() {
  const [{}, setFilter] = useFilterQueryStates()
  const currentYear = new Date().getFullYear()

  return (
    <Select
      defaultValue="all"
      onValueChange={(value) => {
        if (value === "all") {
          setFilter({ yf: null, yt: null })
        } else if (value === "до 1980") {
          setFilter({ yf: null, yt: 1980 })
        } else {
          const [yf, yt] = value.split(" – ")
          setFilter({ yf: Number(yf), yt: Number(yt) })
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Дата выхода" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">За все время</SelectItem>
          <SelectItem value={`2020 – ${currentYear}`}>2020 – {currentYear}</SelectItem>
          <SelectItem value="2010 – 2020">2010 – 2020</SelectItem>
          <SelectItem value="2000 – 2010">2000 – 2010</SelectItem>
          <SelectItem value="1990 – 2000">1990 – 2000</SelectItem>
          <SelectItem value="1980 – 1990">1980 – 1990</SelectItem>
          <SelectItem value="до 1980">до 1980</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
