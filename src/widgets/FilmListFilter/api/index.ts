"use server"

export type GenreAndCountries = {
  genres: {
    id: number
    genre: string
  }[]
  countries: {
    id: number
    country: string
  }[]
}

export async function fetchGenresAndCountries() {
  const url = `${process.env.KINOPOISK_API_URL}/api/v2.2/films/filters`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.KINOPOISK_API_KEY!,
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) return null
  const data: GenreAndCountries = await res.json()

  // TODO: В некоторых ID не указанны названия (баг)
  return {
    genres: data.genres.filter((genre) => genre.genre !== ""),
    countries: data.countries.filter((country) => country.country !== ""),
  }
}
