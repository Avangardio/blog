import {redirect} from "next/navigation";
import ArticleBody from "@/Components/article/articleBody/articleBody";
import getArticle from "@/Fetching/functions/getArticle";

export const revalidate = 0;
interface ArticlePageProps {
    params: { slug: string | undefined }
}
export async function generateMetadata({ params }: { params: { slug: string | undefined } }) {
    //todo либо заменить на фетч nextовский, либо что-то придумать с бекендом, так как nextjs14 Не работает с axios
    const response = await getArticle(params.slug || 'page1');
    return {
        title: response?.data?.payload?.title || 'BBlog',
    }
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