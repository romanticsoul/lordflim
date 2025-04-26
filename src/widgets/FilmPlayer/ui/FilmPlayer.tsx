import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { fetchKinoboxPlayers } from "../api/index"

type FilmPlayerProps = {
  kinopoiskId: number
}

export async function FilmPlayer({ kinopoiskId }: FilmPlayerProps) {
  const players = await fetchKinoboxPlayers({
    search: { kinopoisk: String(kinopoiskId) },
  })

  if (!players || !players.length) {
    return (
      <div className="bg-muted flex aspect-video flex-col items-center justify-center rounded-lg border p-12">
        <h3 className="text-muted-foreground text-xl font-semibold">
          К сожалению этот фильм еще нельзя посмотреть
        </h3>
      </div>
    )
  }

  return (
    <Tabs defaultValue={players[0].source}>
      <TabsList>
        {players.map((tab, idx) => (
          <TabsTrigger key={tab.iframeUrl} value={tab.source}>
            {idx === 0 ? "Смотреть онлайн" : `Плеер ${++idx}`}
          </TabsTrigger>
        ))}
      </TabsList>
      {players.map((tab) => (
        <TabsContent key={tab.iframeUrl} value={tab.source} className="aspect-video">
          <iframe src={tab.iframeUrl} className="size-full" allowFullScreen />
        </TabsContent>
      ))}
    </Tabs>
  )
}
