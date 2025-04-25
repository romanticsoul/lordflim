interface Translation {
  id: number | null
  name: string | null
  quality: string | null
  iframeUrl: string
}

interface SourceItem {
  source: string
  iframeUrl: string | null
  translations: Translation[]
  success: boolean
  updatedAt: string
}

type SourceArray = SourceItem[]

export type { SourceArray, SourceItem }
