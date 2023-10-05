'use client'
import {useMemo} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import useLocalization from "@/Components/Localization/Localization";

interface TopicListProps {
    topics: PostForTopic[]
    page: number
    pageSize?:number
}
export default function TopicList({topics, page, pageSize = 5}: TopicListProps){
    const router = useRouter();
    const {authorTag, addNewPost} = useLocalization('topics/interface');

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pageTopics =
        useMemo(() =>
            topics
                .slice(startIndex, endIndex)
                .map(topicItem => {
                    const {topic, author, postId} = topicItem;
                    return (
                        <div key={postId}
                            className={`
                                w-full mb-5 bg-white transition-shadow box-border p-4
                                hover:outline hover:outline-1 hover:outline-cyan-600
                                `}
                            onClick={() => {
                                router.push('/article/' + postId)
                            }}
                        >
                            <img src={topic.imageURL}
                                 alt={'/defaultTopic.png'}
                                 className={'justify-center'}
                            />
                            <a className={'text-2xl font-bold'}
                               href={'/article/' + postId}
                               onClick={(event) => event.preventDefault()}
                            >
                                {topic.title.split('\n').map((item, i) => <p key={i}>{item}</p>)}
                            </a>
                            <div className={'border-b-cyan-500 border-b-2 mb-2'}>
                                <span>{authorTag + ": "}</span>
                                <b className={'text-cyan-600'}>{author.authorName}</b>
                            </div>
                            <div>{topic.description.split('\n').map((item, i) => <p key={i}>{item}</p>)}</div>
                            <p className={'text-cyan-600'}>{topic.tags.join(` `)}</p>
                        </div>
                    )
                })
            , [page]);
    return (
        <div className={'w-full max-w-[700px]'}>{pageTopics}</div>
    )

}