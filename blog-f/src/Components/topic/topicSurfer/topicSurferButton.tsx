import React, {useMemo} from "react";
import {useSearchParams} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface TopicSurferProps {
    hasMore: boolean;
    currentPage: number;
    navigation: AppRouterInstance;
    type: "Prev" | "Next";
}

export default function TopicSurferButton({currentPage, navigation, type, hasMore}: TopicSurferProps) {
    const allParams = useSearchParams();

    const authorParams = allParams.get('author');
    const searchParams = allParams.get('search');
    const tagParams = allParams.get('tags');

    const plusSearchParams = authorParams || searchParams || tagParams ? `?${allParams}` : "";

    const hrefProp = useMemo(() => `/page${type == 'Prev' ? currentPage - 1 || currentPage : currentPage + 1}` + plusSearchParams
        , [currentPage, allParams])
    if(type === 'Next' && !hasMore) return <div className={'w-[1em] mx-2'}/>;
    if(type === 'Prev' && currentPage === 1) return <div className={'w-[1em] mx-2'}/>;
    return (
        <a
            href={hrefProp }
            className={`inline-block mx-2 rounded-2xl  text-center align-middle text-xl text-cyan-700 ${type !== 'Prev' ? 'right-0' : 'left-0'}`}
            onClick={(event) => {
                event.preventDefault();
                navigation.push(hrefProp)
            }}
        >
            {type == "Prev" ? "←" : "→"}
        </a>
    )
}