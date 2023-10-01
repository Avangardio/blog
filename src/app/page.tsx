import NewsList from "@/Components/NewsList/newsList";
import {getPage} from "@/app/gerPage";

export const metadata = {
    description: 'The React Framework for the Web',
}
export default async function Home({params, searchParams}: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined }
}) {

    const {props} =  await getPage(searchParams['page']);

  return (
    <main>
        <NewsList page={props.page} posts={props.posts}/>
    </main>
  )
}
