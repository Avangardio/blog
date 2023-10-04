'use client'
import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";

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
                <a  href={currentPage === 1 ? "#" : ('/' + `${currentPage-1}` + "?" + searchParams)}
                    className={'mx-2 rounded-2xl  text-center align-middle text-xl' + ` ${currentPage === 1 ? "text-gray-400 " : " text-cyan-700"}`}
                    onClick={(event) => {
                        event.preventDefault();
                        currentPage !== 1 ? navigation.push('/' + `${currentPage-1}` + "?" + searchParams) : null;
                    }}
                >
                    {"<"}
                </a>
            <div className={'flex align-middle items-center'}>
                {pageNumbers.map((number, idx) => (
                    <React.Fragment key={number}>
                        {idx !== 0 && number !== pageNumbers[idx - 1] + 1 && <span className={'mx-2  w-[2em] h-[2em] rounded-2xl  text-center'}>...</span>}
                        <a
                            href={'/' + number + "?" + searchParams}
                            className={'' +
                                'px-2 flex items-center justify-center w-[2em] h-[2em] rounded text-center align-middle hover:bg-cyan-100 transition ease-in-out' +
                                (number === currentPage ? ' border border-1 border-cyan-700' : '')
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                navigation.push('/' + number + "?" + searchParams)
                            }}
                        >
                            {number}
                        </a>
                    </React.Fragment>
                ))}
            </div>
                <a
                    href={currentPage === 1 ? "#" : ('/' + `${currentPage+1}` + "?" + searchParams)}
                    className={'mx-2 rounded-2xl  text-center align-middle text-xl' + ` ${currentPage === totalPages ? "text-gray-400 " : " text-cyan-700"}`}
                    onClick={(event) => {
                        event.preventDefault();
                        navigation.push('/' + `${currentPage+1}` + "?" + searchParams)
                    }}
                >
                    {">"}
                </a>
        </div>
    );
};
