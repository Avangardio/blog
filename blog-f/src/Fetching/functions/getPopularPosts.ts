import axios from "axios";
import {postsURL} from "@/Fetching/URLs/postsURLs";

export default async function getPopularPosts() {
    return await axios.get<ResponseData<PostData[]>>(postsURL + `findPopularPosts`).catch(() => undefined);
}