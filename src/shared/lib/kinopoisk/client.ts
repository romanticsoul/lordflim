import { Api } from "./generated"

export const kinopoiskApi = new Api({
  baseUrl: "https://api.kinopoisk.dev",
  baseApiParams: {
    headers: {
      "X-API-KEY": process.env.KINOPOISK_DEV_API!,
    },
  },
})
