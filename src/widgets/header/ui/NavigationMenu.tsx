import { cn } from "@/shared/lib/utils"
import Link from "next/link"

export function NavigationMenu({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav className={cn("text-sm font-semibold", className)} {...props}>
      <ul className="flex gap-6">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/movies">Фильмы</Link>
        </li>
        <li>
          <Link href="/series">Сериалы</Link>
        </li>
        <li>
          <Link href="/cartoons">Мультфильмы</Link>
        </li>
      </ul>
    </nav>
  )
}
