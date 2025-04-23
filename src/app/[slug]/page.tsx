import { ContentCard } from "@/entities/content-card"

export default async function ContentListPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params

  return (
    <div className="container py-12">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 25 }).map((_, index) => (
          <ContentCard
            id={index}
            key={index}
            href={`/${slug}/${index}`}
            title={`Контент #${index}`}
          />
        ))}
      </div>
    </div>
  )
}
