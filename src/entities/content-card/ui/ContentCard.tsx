import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/shared/ui/card"

type ContentCardProps = {
  kinopoiskId: number
  title?: string | null
  imageUrl?: string
}

export function ContentCard(props: ContentCardProps) {
  const title = props.title || "Неизвестный фильм"
  const image = props.imageUrl || "https://placehold.co/300x400.svg?text=Изображение%0Aне+найдено"

  return (
    <Link href={`/movie/${props.kinopoiskId}`} className="block">
      <Card className="group relative gap-0 overflow-hidden p-0">
        <Image
          className="aspect-2/3 w-full object-cover group-hover:opacity-90"
          src={image}
          width={230}
          height={285}
          alt={title}
        />
        <CardContent className="p-2 text-sm font-medium">{title}</CardContent>
      </Card>
    </Link>
  )
}
