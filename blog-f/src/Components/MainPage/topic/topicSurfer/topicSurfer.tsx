'use client'
import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import TopicSurferButton from "@/Components/MainPage/topic/topicSurfer/topicSurferButton";
import {router} from "next/client";
import TopicSurferNumbers from "@/Components/MainPage/topic/topicSurfer/topicSurferNumbers";

interface PaginationProps {
    currentPage: number;
    totalPosts: number;
    postsPerPage: number;
}

export default function TopicSurfer({currentPage, totalPosts, postsPerPage }: PaginationProps) {
    const navigation = useRouter();
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const getPageNumbers = () => {
        let numbers = [];

        // Первая и последняя страница всегда отображаются
        numbers.push(1);
        numbers.push(totalPages);

        // Добавляем предыдущую, текущую и следующую страницу, если они существуют
        if (currentPage > 1) numbers.push(currentPage - 1);
        if (currentPage !== 1 && currentPage !== totalPages) numbers.push(currentPage);
        if (currentPage < totalPages) numbers.push(currentPage + 1);

        // Убираем дубликаты и сортируем
        numbers = [...new Set(numbers)].sort((a, b) => a - b);

        return numbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={'bg-white flex justify-between p-1 w-full box-border align-middle items-center'}>

            <TopicSurferButton currentPage={currentPage}
                               totalPosts={totalPosts}
                               navigation={navigation}
                               type={"Prev"}
                               totalPages={totalPages}
            />

            <TopicSurferNumbers pageNumbers={pageNumbers}
                                currentPage={currentPage}
                                navigation={navigation}
            />

            <TopicSurferButton currentPage={currentPage}
                               totalPosts={totalPosts}
                               navigation={navigation}
                               type={"Next"}
                               totalPages={totalPages}
            />

        </div>
    );
};
