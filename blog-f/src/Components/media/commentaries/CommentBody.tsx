'use client'
import shrinkText from "@/Components/utils/shrinkMultiLineText";
import moment from "moment";
import useLocalization from "@/Components/Localization/Localization";
interface CommentBodyProps {
    comment: CommentData;
}
export default function CommentBody({comment}: CommentBodyProps) {
    const {commented_at, commentId, comment_text, user} = comment;
    const { TimeIn} = useLocalization('commentaries');
    const formattedDate = moment(commented_at).format('HH:mm DD.MM.YYYY');
    return (
        <div className={'border-b-2 mb-2 bg-white p-1.5'}>
            <span className={'border-b-cyan-500 border-b-2'}>
                <div className={'inline-block text-cyan-600'}>{user.username}</div> {TimeIn} {formattedDate}
            </span>
            <div
                className={'break-words w-full p-2 whitespace-pre-wrap'}
            >
                {shrinkText(comment_text)}
            </div>
        </div>
    )
}