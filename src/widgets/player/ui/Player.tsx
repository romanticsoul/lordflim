import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { fetchKinoboxPlayers } from "../api/index"

export async function Player() {
  const players = await fetchKinoboxPlayers({
    search: { kinopoisk: "464963" },
  })

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
        <TabsContent
          key={tab.iframeUrl}
          value={tab.source}
          className="aspect-video"
        >
          <iframe src={tab.iframeUrl} className="size-full" />
        </TabsContent>
      ))}
    </Tabs>
  )
}
