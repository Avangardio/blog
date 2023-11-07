'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";
import axios from "axios";
import {mediaURL} from "@/Fetching/URLs/mediaURLs";

interface CommentPanelProps {
    likes: PostData['likes'];
    postId: PostData['postId'];
}
function LikePanel({likes, postId}: CommentPanelProps) {
    const {userId} = useStore('UserStore');
    const [hovered, updateHovered] = useState(false);
    const [counter, setCounter] = useState(likes);
    const [liked, updateLiked] = useState<boolean>();
    useEffect(() => {
        axios.get(mediaURL + `checkLike/${postId}`, {withCredentials: true})
            .then(
                response => updateLiked(response.data.payload.liked),
                error => updateLiked(false)
            )
    }, [])

    const likeHandler = () => {
        if(!userId) return;
        axios.patch(mediaURL + `like`, {postId: postId}, {withCredentials: true})
            .then(
                response => {
                    setCounter(!liked ? counter + 1 : counter - 1)
                    updateLiked(!liked)
                },
                () => {}
            )
    }

    return (
        <span
            className={'flex flex-row relative cursor-pointer'}
            onMouseOver={() => updateHovered(true)}
            onMouseOut={() => updateHovered(false)}
            onClick={() => likeHandler()}
        >
            <Image src={`/likes${hovered && userId ? '-active' : ''}.svg`} alt={'/likes.svg'} width={'20'} height={'20'}/>
            {hovered && userId ? !liked ? '+1' : '-1' : counter}
        </span>
    )
}
export default observer(LikePanel)