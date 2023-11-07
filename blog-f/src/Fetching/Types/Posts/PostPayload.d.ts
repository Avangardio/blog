declare type PostData = {
    "postId": number,
    "title": string,
    "picture": string,
    "description": string,
    "authorId": number,
    "texts": string,
    "tags": string[],
    "ctime": string,
    "views": number,
    "likes": number,
    "comments": number,
    "author": {
        "userId": number,
        "username": string
    }
}