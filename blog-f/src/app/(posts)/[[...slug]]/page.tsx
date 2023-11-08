import sanitizePageQuery from "@/Components/utils/sanitizePageQuery";
import {Metadata} from "next";
import getPosts from "@/Fetching/functions/getPosts";
import getPopularPosts from "@/Fetching/functions/getPopularPosts";
import CreatePost from "@/Components/post/createPost";
import TagsManager from "@/Components/tags/tagsManager";
import TopicList from "@/Components/topic/topicList";
import PopularPosts from "@/Components/post/popularPosts";
import TopicSurfer from "@/Components/topic/topicSurfer/topicSurfer";

export const metadata: Metadata = {
    title: 'BBlog',
    description: 'Blog techno demo by Avangardio',
}
export const revalidate = 3600 // revalidate at most every hour

interface HomePageProps {
    params: { slug: string | string[] | undefined }
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
            getPopularPosts()
        ]);
    if (!getPostsReply) {
        return (
            <div>
                <CreatePost/>
                404 lmao
            </div>
        )
    }
    return (
        <div className="flex justify-center align-middle items-center w-full relative mt-4 md:px-4">
            <main className={'relative'}>
                <CreatePost/>
                <TagsManager currentTags={searchParams?.tags} />
                <TopicList posts={getPostsReply.payload.posts} page={currentPage}/>
                <PopularPosts popularPosts={popularPosts?.data?.payload}/>
                <TopicSurfer hasMore={getPostsReply.payload.hasMore} currentPage={currentPage} />
            </main>
        </div>
    )
}
