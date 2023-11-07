'use client'
import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import TopicSurferButton from "@/Components/topic/topicSurfer/topicSurferButton";
import TopicSurferNumbers from "@/Components/topic/topicSurfer/topicSurferNumbers";


interface PaginationProps {
    hasMore: boolean;
    currentPage: number;
}

export default function TopicSurfer({currentPage, hasMore}: PaginationProps) {
    const navigation = useRouter();

    return (
        <div className={'bg-white p-1 w-full box-border align-middle items-center flex flex-row justify-between'}>

            <TopicSurferButton currentPage={currentPage}
                               hasMore={hasMore}
                               navigation={navigation}
                               type={"Prev"}
            />

            <TopicSurferNumbers currentPage={currentPage}
                                navigation={navigation}
                                hasMore={hasMore}
            />

            <TopicSurferButton currentPage={currentPage}
                               hasMore={hasMore}
                               navigation={navigation}
                               type={"Next"}
            />

        </div>
    );
};
