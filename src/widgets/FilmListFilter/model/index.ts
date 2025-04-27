import { useQueryStates } from "nuqs"
import { parseAsInteger, parseAsStringEnum, createLoader } from "nuqs/server"

export enum SortEnum {
  RATING = "RATING",
  YEAR = "YEAR",
  NUM_VOTE = "NUM_VOTE",
}

export const filterSearchParams = {
  genre: parseAsInteger,
  county: parseAsInteger,
  yf: parseAsInteger,
  yt: parseAsInteger,
  sort: parseAsStringEnum<SortEnum>(Object.values(SortEnum)).withDefault(SortEnum.RATING),
}

export function useFilterQueryStates() {
  return useQueryStates(filterSearchParams, {
    shallow: false,
  })
}

export const loadFilterSearchParams = createLoader(filterSearchParams)
