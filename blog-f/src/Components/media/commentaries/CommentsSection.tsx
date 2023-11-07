'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {mediaURL} from "@/Fetching/URLs/mediaURLs";
import CommentBody from "@/Components/media/commentaries/CommentBody";
import useLocalization from "@/Components/Localization/Localization";
import AddComment from "@/Components/media/commentaries/addComment";
import {useStore} from "@/MobX/RootStore";
import {observer} from "mobx-react";
interface CommentsSectionProps {
    postId: number;
}
function CommentsSection({postId}:CommentsSectionProps) {
    const { Header} = useLocalization('commentaries');
    const {userId, userName} = useStore('UserStore');
    const [comments, setComments] = useState<CommentData[]>([])
    useEffect(() => {
        axios.get<GetComments>(mediaURL + `getComments/${postId}`, {withCredentials: true})
            .then(
                response => setComments(response.data.payload.comments),
                _ => setComments([])
            )
    }, [])
    return (
        <div className={'max-w-[700px]'}>
            <div className={'border-b-2  mt-[-0.5rem] w-[calc(100% + 1rem)] bg-cyan-600 px-1'}>{Header}</div>
            <AddComment comments={comments} setComments={setComments} user={{userId, username: userName}} postId={postId} />
            {
                comments.length > 0
                ? comments.sort((a,b) => b.commentId - a.commentId).map((comment, idx) =>
                    <CommentBody key={idx} comment={comment} />)
                : null
            }
        </div>
    )
}
export default observer(CommentsSection)