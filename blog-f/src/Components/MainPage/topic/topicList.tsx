'use client'
import {useMemo} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import useLocalization from "@/Components/Localization/Localization";
import AuthorLink from "@/Components/MainPage/authorModule/authorLink";
import TopicEntity from "@/Components/MainPage/topic/topicEntity";

interface TopicListProps {
    posts: PostForTopic[]
    page: number
    pageSize?:number
}
export default function TopicList({posts, page, pageSize = 5}: TopicListProps){
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageTopics =
        useMemo(() =>
            posts
                .slice(startIndex, endIndex)
                .map(topicItem => {
                    return <TopicEntity key={topicItem.postId} topicProp={topicItem} />
                })
            , [page]);
    return (
        <div className={'w-full max-w-[700px]'}>{pageTopics}</div>
    )

}