export default function TopicLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex justify-center align-middle items-center w-full relative mt-4 md:px-4">
                {children}
            </div>
        </>
    )
}