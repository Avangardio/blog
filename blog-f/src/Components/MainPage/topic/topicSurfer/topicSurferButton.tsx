import React, {useMemo} from "react";
import {useSearchParams} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface TopicSurferProps {
    currentPage: number;
    totalPosts: number;
    navigation: AppRouterInstance;
    type: "Prev" | "Next";
    totalPages: number;
}
export default function TopicSurferButton({currentPage, totalPosts, navigation, totalPages, type}: TopicSurferProps){
    const allParams = useSearchParams();

    const authorParams = allParams.get('author');
    const searchParams = allParams.get('search');
    const tagParams    = allParams.get('tags');

    const {hrefProp, classProp} = useMemo(() => {
        return {
            hrefProp:  `/page${type == 'Prev' ? currentPage - 1 : currentPage + 1}` + (authorParams || searchParams || tagParams? `?${allParams}` : ""),
            classProp: ` ${currentPage === (type == "Prev" ? 1 : totalPages) ? "text-gray-400 " : " text-cyan-700"}`
        }
    }, [currentPage, allParams, totalPosts])

    return (
        <a
            href={hrefProp}
            className={'mx-2 rounded-2xl  text-center align-middle text-xl' + classProp}
            onClick={(event) => {
                event.preventDefault();
                navigation.push(hrefProp)
            }}
        >
            {type == "Prev" ? "<" : ">"}
        </a>
    )
}