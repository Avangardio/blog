import {redirect} from "next/navigation";
import ArticleBody from "@/Components/article/articleBody/articleBody";
import getArticle from "@/Fetching/functions/getArticle";

export const revalidate = 3600;
interface ArticlePageProps {
    params: { slug: string | undefined }
}
export default async function ArticlePage({params}:ArticlePageProps) {
    const {slug} = params;
    if(!slug || isNaN(parseInt(slug))) redirect('/');
    const response = await getArticle(slug);

    if(!response) return <div>Error!</div>

    return (
        <main className="flex justify-center align-middle items-center w-full relative mt-4 md:px-4">
            <ArticleBody payload={response.data.payload} />
        </main>
    )
}