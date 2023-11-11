import './globals.css'
import {Open_Sans} from 'next/font/google'
import Header from "@/Components/header/header";
import axios from "axios";
import {authURL} from "@/Fetching/URLs/authURLs";
import {cookies} from "next/headers";

const inter = Open_Sans({subsets: ['latin']})
export default async function RootLayout({children}: { children: React.ReactNode }) {
    const userdata = cookies().get('userdata')?.value;
    const authUser = await axios.get<AuthUserTypeResponse>(`${authURL}authenticate`, {
        withCredentials: true,
        timeout: 1000,
        headers: {
            'Cookie': 'userdata=' + userdata,
            'Content-type': 'application/json'
        },
    }).catch((error) => {
        return undefined
    });
    const payload = authUser?.status === 200 ? authUser.data : undefined
    return (
        <html lang="en">
            <body className={inter.className}>
            <Header payload={payload}/>
            {children}
            </body>
        </html>
    )
}
