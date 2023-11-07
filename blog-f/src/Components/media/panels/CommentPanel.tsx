import Image from "next/image";

interface CommentPanelProps {
    comments: PostData['comments'];
}
export default function CommentPanel({comments}: CommentPanelProps) {
    return (
        <span className={'flex flex-row'}>
            <Image src={'/comments.svg'} alt={'/comments.svg'} width={'20'} height={'20'}/>
            {comments || 0}
        </span>
    )
}