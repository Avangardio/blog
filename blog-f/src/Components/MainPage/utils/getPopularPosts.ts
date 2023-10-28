import axios from "axios";

export default async function getPopularPosts(time = 7): Promise<PostForPopular[]>{
    /*const res = await axios.get<PostForPopular>(`http://localhost:3000/getPopularPosts/${time}`)
        .then(
            (result: any) => {

            },
            (error: any) => {

            }
        )

     */
    return [
        {
            postId: 14,
            topic: {
                title: "Я сосал меня ебали",
            },
            author: {
                authorId: 31,
                authorName: "Angelina Boyko",
                authorFrom: "01.01.2022"
            }
        },
        {
            postId: 15,
            topic: {
                title: "Я ебал меня сосали",
            },
            author: {
                authorId: 31,
                authorName: "Angelina Boyko",
                authorFrom: "13.01.2023"
            }
        }
    ]
}