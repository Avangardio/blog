import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Blog techno demo by Avangardio',
}
export default function AuthLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div
                className="flex justify-center align-middle items-center shadow-lg md:min-w-[40rem] bg-white md:bg-transparent bg-cover h-full z-20 flex-col">
                {children}
            </div>
        </>
    )
}