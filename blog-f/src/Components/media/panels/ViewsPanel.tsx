import Image from "next/image";

interface CommentPanelProps {
    views: PostData['views'];
}
export default function ViewsPanel({views}: CommentPanelProps) {
    return (
        <span className={'flex flex-row'}>
            <Image src={'/views.svg'} alt={'/views.svg'} width={'20'} height={'20'}/>
            {views || 0}
        </span>
    )
}