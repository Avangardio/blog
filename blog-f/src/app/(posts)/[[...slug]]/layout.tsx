import CreateArticleMain from "@/Components/article/createArticle/createArticleMain";
import CreateArticlePopUp from "@/Components/article/createArticle/createArticlePopUp";

export default function TopicLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex justify-center align-middle items-center w-full relative mt-4 md:px-4 animate-fade-in">
                <CreateArticlePopUp />
                {children}
            </div>
        </>
    )
}