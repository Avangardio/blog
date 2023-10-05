'use client'
import './globals.css'
import {Inter, Open_Sans} from 'next/font/google'
import Header from "@/Components/header/header";
import AdminPanel from "@/Components/adminPanel/adminPanel";
import AuthorCard from "@/Components/MainPage/authorModule/authorCard";

const inter = Open_Sans({ subsets: ['latin'] })
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const isAdmin = await new Promise((resolve) => {
        setTimeout(() => resolve(true), 10)
    });
    let adminPanel = isAdmin ? <AdminPanel/> : undefined;
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
