'use client'
import {useMemo} from "react";
import TopicEntity from "@/Components/topic/topicEntity";
import {useStore} from "@/MobX/RootStore";

interface TopicListProps {
    posts: PostData[]
    page: number
    pageSize?: number
}

export default function TopicList({posts, page, pageSize = 5}: TopicListProps) {
    const pageTopics =
        useMemo(() =>
                posts
                    .slice(0, pageSize)
                    .map(topicItem => {
                        return <TopicEntity key={topicItem.postId} topicProp={topicItem} page={page}/>
                    })
            , [page, posts]);
    return (
        <div className={'w-full max-w-[700px]'}>{pageTopics}</div>
    )
}