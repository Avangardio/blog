import {getPage} from "@/app/gerPage";
import getPosts from "@/Components/MainPage/utils/getPosts";
import {useRouter} from "next/navigation";
import sanitizePageQuery from "@/Components/MainPage/utils/sanitizePageQuery";
import TopicList from "@/Components/MainPage/topicList";
import {Metadata} from "next";
export const revalidate = 3600 // revalidate at most every hour

export const metadata: Metadata = {
    title: '...',
    description: '...',
}

/*export default async function Home() {
    const getPostsReply = await getPosts("1").catch(_ => undefined);

    if(!getPostsReply) {
        return (<div>404 lmao</div>)
    }

    const currentPage = sanitizePageQuery("1", getPostsReply.totalPosts);

      return (
        <main>
            <TopicList topics={getPostsReply.topics} page={currentPage}/>
        </main>
      )
}


 */