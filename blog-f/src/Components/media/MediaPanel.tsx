'use client'
import CommentPanel from "@/Components/media/panels/CommentPanel";
import ViewsPanel from "@/Components/media/panels/ViewsPanel";
import LIkePanel from "@/Components/media/panels/LIkePanel";

interface MediaPanelProps {
    likes: PostData['likes'];
    comments: PostData['comments'];
    views: PostData['views'];
    postId: PostData['postId'];
}
export default function MediaPanel({likes, comments, views, postId}: MediaPanelProps) {
    return (
        <div className={'inline-flex row-auto right-[20px] absolute gap-1'}>
            <ViewsPanel views={views} />
            <LIkePanel likes={likes} postId={postId} />
            <CommentPanel comments={comments} />
        </div>
    )
}