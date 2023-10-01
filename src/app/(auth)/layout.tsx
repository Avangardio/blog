
export default function AuthLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex justify-center align-middle items-center shadow-lg min-w-[40rem] bg-[url('/bg1.avif')] bg-cover h-full z-20 flex-col">
                {children}
            </div>
            <div className={`absolute top-0 bottom-0 right-0 left-0 bg-black z-10 opacity-20`}/>
        </>
    )
}