'use client'
import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";
import useLocalization from "@/Components/Localization/Localization";

interface AuthorLinkProps {
    className?: string,
    author: PostData['author']
}

export default function AuthorLink({className, author}: AuthorLinkProps) {
    const {authorTag, popularHeader} = useLocalization('topics/interface')
    const {username, userId} = author;

    return (
        <div className={className}>
            <span>{authorTag + ": "}</span>
            <b className={'text-cyan-600 hover:underline cursor-pointer'}>{username}</b>
        </div>
    )
}