// "use client"
// import { useRef, useEffect, useState } from "react"
// import type { SourceArray } from "../model"
import { fetchKinoboxPlayers } from "../api/index"

export async function Player() {
  // const containerRef = useRef<HTMLDivElement>(null)
  // const [sources, setSources] = useState<SourceArray>([])
  // const [currentSource, setCurrentSource] = useState<string>("")

  const players = await fetchKinoboxPlayers({
    search: { kinopoisk: "464963" },
  })

  // useEffect(() => {
  //   kbox(containerRef.current, {
  //     search: { kinopoisk: 535341 },
  //     menu: { enable: false },
  //   })

  //   document.addEventListener("KinoboxPlayerLoaded", (event) => {
  //     console.log(event.detail)
  //     setSources(event.detail.sources)
  //   })
  // }, [])

  return (
    <div>
      <div className="columns-3">
        {players.map((player) => (
          <div key={player.iframeUrl}>
            <iframe src={player.iframeUrl} allowFullScreen />
          </div>
        ))}
      </div>

      {/* {JSON.stringify(sources)} */}
      {/* <div
        className="relative z-0 aspect-video overflow-hidden"
        // ref={containerRef}
      ></div> */}
    </div>
  )
}

// "use client"

// import React, { useEffect, useRef } from "react"

// export function Player() {
//   const containerRef = useRef(null)

//   useEffect(() => {
//     const script = document.createElement("script")
//     script.src = "https://kinobox.tv/kinobox.min.js"
//     script.async = true
//     document.body.appendChild(script)

//     script.onload = () => {
//       if (containerRef.current) {
//         ;(window as any).kbox(containerRef.current, {
//           search: { kinopoisk: 535341 },
//           menu: {
//             enabled: false,
//           },
//         })
//       }
//     }

//     document.addEventListener("KinoboxPlayerLoaded", (event) => {
//       // code
//       // event.detail.status - статус поиска
//       // event.detail.sources - массив источников
//       console.log(event)
//     })

//     return () => {
//       try {
//         document.body.removeChild(script)
//       } catch (e) {}
//     }
//   }, [535341])

//   return <div ref={containerRef} className="kinobox_player"></div>
// }

// ****************

// "use client"
// import Script from "next/script"
// import { useEffect } from "react"

// export function Player() {
//   useEffect(() => {
//     console.log("KinoboxPlayerLoaded")
//     document.addEventListener("KinoboxPlayerLoaded", (event) => {
//       // code
//       // event.detail.status - статус поиска
//       // event.detail.sources - массив источников
//       console.log(event)
//     })
//   }, [])

//   return (
//     <>
//       <div data-kinobox="auto" data-kinopoisk="535341"></div>
//       <Script
//         src="https://kinobox.tv/kinobox.min.js"
//         strategy="afterInteractive"
//       />
//     </>
//   )
// }
