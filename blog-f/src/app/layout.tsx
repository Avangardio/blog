'use client'
import './globals.css'
import {Inter, Open_Sans} from 'next/font/google'
import Header from "@/Components/header/header";
import AuthorCard from "@/Components/MainPage/authorModule/authorCard";

const inter = Open_Sans({ subsets: ['latin'] })
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <AuthorCard />
        {children}
      </body>
    </html>
  )
}
