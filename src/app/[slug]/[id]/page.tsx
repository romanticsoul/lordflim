import Image from "next/image"
import { ContentCard } from "@/entities/content-card"

type Params = Promise<{ slug: string; id: string }>

export default async function ContentPage(props: { params: Params }) {
  const params = await props.params

  return (
    <main className="container py-12">
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-3">
          <Image
            src={`https://placehold.co/300x400.svg?text=Content+%23${params.id}`}
            alt="Movie poster"
            width={300}
            height={400}
            className="sticky top-28 w-full rounded-lg"
          />
        </div>
        <div className="col-span-7">
          <h1 className="mb-2 text-3xl font-black">
            Контент #{params.id} смотреть онлайн
          </h1>
          <div className="mb-6 flex gap-2">
            <div className="rounded-full border px-4 py-2 text-xs font-medium">
              Кинопоиск: 0.0
            </div>
            <div className="rounded-full border px-4 py-2 text-xs font-medium">
              IMDB: 0.0
            </div>
          </div>
          <div className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
            delectus aliquam, inventore nemo assumenda provident accusamus
            praesentium recusandae quo ipsa? Vero aspernatur sit ex facere,
            tempora atque ducimus odio explicabo!
          </div>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-2 font-medium">
              <span className="font-bold">Год:</span> ####
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="font-bold">Страна:</span> ###
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="font-bold">Оригинальное название:</span> Content
              #{params.id}
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="font-bold">Жанр:</span> ##########, ############
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="font-bold">Режиссер:</span> #### #######
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="font-bold">В главных ролях:</span> ### #########,
              #### ######, ##### ########
            </li>
          </ul>
        </div>
      </div>
      <div className="my-12">
        <Image
          src="https://placehold.co/600x400/000000/FFFFFF.svg?text=Video+Player"
          alt="Movie poster"
          width={300}
          height={400}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-bold">Смотреть похожие</h2>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ContentCard
              id={index}
              key={index}
              href={`/${params.slug}/${index}`}
              title={`Контент #${index}`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
