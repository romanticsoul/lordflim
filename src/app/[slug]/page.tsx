import { ContentCard } from "@/entities/content-card"

type Params = Promise<{ slug: string }>

export default async function ContentListPage(props: { params: Params }) {
  const params = await props.params

  return (
    <div className="container py-12">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 25 }).map((_, index) => (
          <ContentCard
            id={index}
            key={index}
            href={`/${params.slug}/${index}`}
            title={`Контент #${index}`}
          />
        ))}
      </div>
    </div>
  )
}
