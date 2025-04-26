import type { Metadata } from "next"
import Script from "next/script"
import { ThemeProvider } from "@/shared/ui/theme-provider"
import { Inter } from "next/font/google"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

import "./globals.css"

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
  title: "LORDFLIM - смотрите фильмы и сериалы онлайн",
  description: "Смотрите фильмы и сериалы онлайн в хорошем качестве",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSans.className} overflow-y-scroll antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Script src="https://kinobox.tv/kinobox.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
