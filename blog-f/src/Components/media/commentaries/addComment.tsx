'use client'
import {Dispatch, SetStateAction, useState} from "react";
import useLocalization from "@/Components/Localization/Localization";
import TextareaAutosize from 'react-textarea-autosize';
import axios from "axios";
import {mediaURL} from "@/Fetching/URLs/mediaURLs";
import moment from "moment/moment";


interface AddCommentProps {
    postId: number;
    comments: CommentData[];
    setComments: Dispatch<SetStateAction<CommentData[]>>;
    user: CommentData['user'];
}
export default function AddComment({comments, setComments, user, postId}: AddCommentProps){
    const {userId, username} = user;
    const {LoginToGo, Comment, Placeholder} = useLocalization('commentaries');
    const [field, updateField] = useState('');
    const addComment = async () => {
        const response =
            await axios.post(mediaURL + `createComment`,
                {postId, text: field},
                {withCredentials: true}
            ).catch(() => undefined)

        if(!response) return;

        const newComment = {
            commentId: response.data.payload.commentId,
            comment_text: field,
            commented_at: moment().format('HH:mm DD.MM.YYYY'),
            user: {
                userId,
                username
            }
        }
        updateField('');
        setComments([...comments, newComment]);
    }
    return (
        <div className={'my-2'}>
            {
                !!userId &&
                    <TextareaAutosize
                        minRows={1}
                        maxRows={5}
                        placeholder={Placeholder}
                        className={'w-full p-2 resize-none'}
                        value={field}
                        onChange={(event) => updateField(event.target.value)}
                     />
            }
            <button
                onClick={() => addComment()}
                className={'block bg-cyan-600 p-1.5 rounded transition-transform transform hover:scale-95'}
            >
                {userId ? Comment : LoginToGo}
            </button>
        </div>
    )
}