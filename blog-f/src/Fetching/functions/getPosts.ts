import axios from "axios";
import {postsURL} from "@/Fetching/URLs/postsURLs";
import {boolean} from "yup";
export const revalidate = 0

interface HomePageProps {
    currentPage: number;
    searchParams?: {
        ["search"]: string | string[] | undefined
        ["author"]: string | string[] | undefined
        ["tags"]: string | string[] | undefined
    }
}

export default async function getPosts(currentPage: number, searchParams: HomePageProps["searchParams"]) {
    console.log(searchParams)
    const returnedPosts = await axios.get<ResponseData<{hasMore: boolean, posts: PostData[]}>>(postsURL + 'findPosts/' + currentPage, {
        withCredentials: true,
        params: searchParams,
    })
    return returnedPosts.data;
}