declare type CommentData = {
    "commentId": number,
    "comment_text": string,
    "commented_at": string,
    "user": {
        "userId": number,
        "username": string
    }
}