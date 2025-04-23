import type { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/shared/ui/card"

type ContentCardProps = {
  id: number
  href: Url
  title: string
}

export function ContentCard({ id, title, href }: ContentCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="group relative gap-0 overflow-hidden p-0">
        <Image
          className="w-full object-cover group-hover:opacity-90"
          src={`https://placehold.co/300x400.svg?text=Content+%23${id}`}
          width={230}
          height={285}
          alt={title}
        />
        <CardContent className="p-2 text-sm font-medium">{title}</CardContent>
      </Card>
    </Link>
  )
}
