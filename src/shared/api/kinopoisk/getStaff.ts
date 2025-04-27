export interface Staff {
  staffId: number
  nameRu?: string | null
  nameEn?: string | null
  description?: string | null
  posterUrl: string
  professionText: string
  professionKey:
    | "WRITER"
    | "OPERATOR"
    | "EDITOR"
    | "COMPOSER"
    | "PRODUCER_USSR"
    | "TRANSLATOR"
    | "DIRECTOR"
    | "DESIGN"
    | "PRODUCER"
    | "ACTOR"
    | "VOICE_DIRECTOR"
    | "UNKNOWN"
}

export async function getStaff(kinopoiskId: number) {
  const url = `${process.env.KINOPOISK_API_URL}/api/v1/staff?filmId=${kinopoiskId}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.KINOPOISK_API_KEY!,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) return null

  const data: Staff[] = await res.json()
  return data
}
