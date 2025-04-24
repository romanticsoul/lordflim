import { ContentCard } from "@/entities/content-card"

export default function Home() {
  return (
    <main className="container py-12">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
