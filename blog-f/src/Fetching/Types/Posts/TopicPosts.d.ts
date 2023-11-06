declare type PostForTopic = {
    postId: number,
    authorId: number,
    tags: string[]
    title: string,
    description: string,
    picture: string,
}
declare type PostForPopular = {
    postId: number,
    author: Author,
    topic: {
        title: string,
    }
}
declare type Author = {
    authorName: string,
    authorFrom: string,
    authorId: number
}
declare type PostListForTopic = number
declare type Post = {
    posts: {
        postId: number,
        authorId: number,
        tags: string[]
        title: string,
        texts: string,
        description: string,
        picture: string,
    }
}
declare type FetchTopicResult = {
    payload: {
        posts: PostForTopic[]
    },
}