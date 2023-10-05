declare type PostForTopic = {
    postId: number,
    author: {
        authorName: string,
        authorId: number
    }
    topic: {
        tags: string[]
        title: string,
        description: string,
        imageURL: string,
    }
}
declare type PostForPopular = {
    postId: number,
    author: {
        authorName: string,
        authorId: number
    }
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
    postId: number,
    author: {
        authorName: string,
        authorId: number
    }
    topic: {
        tags: string[]
        title: string,
        description: string,
        imageURL: string,
    }
    postText: string
}
declare type FetchTopicResult = {
    topics: PostForTopic[],
    totalPosts: PostListForTopic
}