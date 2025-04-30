import Link from "next/link"
import { NavigationMenu } from "./NavigationMenu"
import { Input } from "@/shared/ui/input"

export default function Header() {
  return (
    <>
      <div className="h-40 border-b"></div>
      <header className="bg-background sticky top-0 z-50 h-16 border-b">
        <div className="container grid h-full grid-cols-10 items-center gap-4">
          <Link href="/" className="col-span-2 mr-auto text-lg font-black">
            LORDFLIM
          </Link>
          <NavigationMenu className="invisible col-span-3 md:visible md:col-span-6" />
          <Input placeholder="Найти фильм" className="col-span-5 bg-white md:col-span-2" />
        </div>
      </header>
    </>
  )
}
