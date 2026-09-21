import type { Metadata } from "next"
import { Comfortaa, Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
})

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Imbere — Mathematics made clearer",
  description:
    "A Rwanda-focused mathematics learning platform for Primary 5 to Senior 6 students.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${comfortaa.variable}`}>
        {children}
      </body>
    </html>
  )
}