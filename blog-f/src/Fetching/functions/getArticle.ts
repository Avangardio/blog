import axios from "axios";
import {postsURL} from "@/Fetching/URLs/postsURLs";
export const revalidate = 0
export default async function getArticle(postId: string){
    return await axios.get<ResponseData<PostData>>(postsURL + `findExactPost?postId=${postId}`, {
        withCredentials: true,
    }).catch(() => undefined);
}