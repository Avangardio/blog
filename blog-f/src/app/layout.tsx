import './globals.css'
import {Inter, Open_Sans} from 'next/font/google'
import Header from "@/Components/header/header";
import AuthorCard from "@/Components/MainPage/authorModule/authorCard";
import axios from "axios";
import {authURL} from "@/Fetching/URLs/authURLs";

const inter = Open_Sans({ subsets: ['latin'] })
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const authUser = await axios.get<AuthUserTypeResponse>(`${authURL}authenticate`, {withCredentials: true, timeout: 1000}).catch(() => undefined);
    console.log(authUser)
    return (
        <html lang="en">
          <body className={inter.className}>
            <Header payload={authUser?.status === 200 ? authUser.data.payload : undefined}/>
            <AuthorCard />
            {children}
          </body>
        </html>
    )
}
