import { ContentCard } from "@/entities/content-card"

export default function Home() {
  return (
    <main className="container py-12">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 25 }).map((_, index) => (
          <ContentCard
            key={index}
            id={index}
            href={`/movies/${index}`}
            title={`Контент #${index}`}
          />
        ))}
      </div>
    </main>
  )
}
