import getPosts from "@/Components/MainPage/utils/getPosts";
import sanitizePageQuery from "@/Components/MainPage/utils/sanitizePageQuery";
import TopicList from "@/Components/MainPage/topic/topicList";
import {Metadata} from "next";
import PopularPosts from "@/Components/MainPage/post/popularPosts";
import getPopularPosts from "@/Components/MainPage/utils/getPopularPosts";
import CreatePost from "@/Components/MainPage/post/createPost";

export const metadata: Metadata = {
    title: '...',
    description: '...',
}
export const revalidate = 3600 // revalidate at most every hour

interface HomePageProps {
    params: { slug: string | undefined }
    searchParams?: {
        ["search"]: string | string[] | undefined
        ["author"]: string | string[] | undefined
        ["tags"]: string | string[] | undefined
    }
}


export default async function Home({params, searchParams}: HomePageProps) {
    const currentPage = sanitizePageQuery(params?.slug?.[0]);

    const [getPostsReply, popularPosts] =
        await Promise.all([
            getPosts(currentPage, searchParams).catch(_ => undefined),
            getPopularPosts().catch(_ => undefined)
        ]);

    if (!getPostsReply) {
        return (<div>404 lmao</div>)
    }
//<TopicSurfer currentPage={currentPage} totalPosts={getPostsReply.totalPosts} postsPerPage={5} />
    return (
        <div className="flex justify-center align-middle items-center w-full relative mt-4 md:px-4">
            <main className={'relative'}>
                <CreatePost/>
                <TopicList posts={getPostsReply.payload.posts} page={currentPage}/>
                <PopularPosts popularPosts={popularPosts}/>

            </main>
        </div>
    )
}
