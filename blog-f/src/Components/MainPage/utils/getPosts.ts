import axios from "axios";
import {postsURL} from "@/Fetching/URLs/postsURLs";

interface HomePageProps {
    currentPage: number;
    searchParams?: {
        ["search"]: string | string[] | undefined
        ["author"]: string | string[] | undefined
        ["tags"]: string | string[] | undefined
    }
}

export default async function getPosts(currentPage: number, searchParams: HomePageProps["searchParams"]): Promise<FetchTopicResult> {
    const returnedPosts = await axios.get<FetchTopicResult>(postsURL + 'findPosts/' + currentPage, {
        withCredentials: true,
        params: searchParams
    })

    return returnedPosts.data;
    /*
    return {
        totalPosts: 53,
        topics: [
            {
                author: {
                    authorId: 32,
                    authorName: "Maria Soskina",
                    authorFrom: "10.01.2003"

                },
                postId: 1,
                topic: {
                    tags: ["Gonzo", "gavno"],
                    title: "Как кодить на говне",
                    description: "В дагестане разработчики разработали очко барану \n А ПОТОМ НАХУЙ ТАКОЕ ПРОИСХОДИТ АСАЛААМАА АЛЙКУМ",
                    imageURL: "https://habrastorage.org/r/w1560/getpro/habr/upload_files/813/2ee/416/8132ee416ccbcef3cf19f6a0798f0fd2.png"
                }
            },
            {
                author: {
                    authorId: 12,
                    authorName: "Anal Eremichevoi",
                    authorFrom: "10.01.2003"
                },
                postId: 3,
                topic: {
                    tags: ["Gonzo"],
                    title: "ууу я долбоеб ууу",
                    description: "Я самая грязная проститутка",
                    imageURL: "https://hsto.org/r/w780/getpro/habr/upload_files/07f/b0c/f64/07fb0cf64efb401c980f33f3a652cc61.jpg"
                }
            },
            {
                author: {
                    authorId: 13,
                    authorName: "Bozhe moi",
                    authorFrom: "10.01.2003"
                },
                postId: 2,
                topic: {
                    tags: ["JS"],
                    title: "Как отсосать самому себе в туалете?????????",
                    description: "Этот вопрос очень сложный, но есть смысл о нем поговорить. \n С чего же начать...",
                    imageURL: "https://leonardo.osnova.io/f63091fa-2c17-56a2-836d-5f86d2245cc0/-/preview/700/-/format/webp/"
                }
            }
        ]
    }

     */

}