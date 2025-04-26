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
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${kinopoiskId}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "5384c918-c891-4c75-9413-466c383c5441",
        "Content-Type": "application/json",
      },
    },
  )

  if (!res.ok) return null

  const data: Staff[] = await res.json()
  return data
}
