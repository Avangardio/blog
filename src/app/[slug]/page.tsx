import getPosts from "@/Components/MainPage/utils/getPosts";
import {useRouter} from "next/navigation";
import sanitizePageQuery from "@/Components/MainPage/utils/sanitizePageQuery";
import TopicList from "@/Components/MainPage/topicList";
import {Metadata} from "next";
import TopicSurfer from "@/Components/MainPage/topicSurfer";
import PopularPosts from "@/Components/MainPage/popularPosts";
import getPopularPosts from "@/Components/MainPage/utils/getPopularPosts";
import CreatePost from "@/Components/MainPage/createPost";
export const metadata: Metadata = {
    title: '...',
    description: '...',
}
export const revalidate = 3600 // revalidate at most every hour

interface HomePageProps {
    params: {slug: string | undefined}
    searchParams?: {
        ["search"]: string | string[] | undefined
    }
}


export default async function Home({params, searchParams}: HomePageProps ) {
    const [getPostsReply, popularPosts] =
        await Promise.all([
            getPosts({params, searchParams}).catch(_ => undefined),
            getPopularPosts().catch(_ => undefined)
        ]);

    if(!getPostsReply) {
        return (<div>404 lmao</div>)
    }

    const currentPage = sanitizePageQuery(params.slug, getPostsReply.totalPosts);

      return (
        <main className={'relative'}>
            <CreatePost />
            <TopicList topics={getPostsReply.topics} page={currentPage}/>
            <PopularPosts popularPosts={popularPosts} />
            <TopicSurfer currentPage={currentPage} totalPosts={getPostsReply.totalPosts} postsPerPage={5} />
        </main>
      )
}
