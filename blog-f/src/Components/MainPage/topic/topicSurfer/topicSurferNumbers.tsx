import React, {useMemo} from "react";
import {useSearchParams} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
interface TopicSurferNumbersProps {
    pageNumbers: number[];
    currentPage: number;
    navigation: AppRouterInstance;
}
export default function TopicSurferNumbers({pageNumbers, currentPage, navigation}: TopicSurferNumbersProps){
    const allParams = useSearchParams();

    const authorParams = allParams.get('author');
    const searchParams = allParams.get('search');
    const tagParams    = allParams.get('tags');

    const hrefParamsProp = useMemo(() => {
        return (authorParams || searchParams || tagParams) ? `?${allParams}` : "";
    }, [currentPage, allParams])

    return (
        <div className={'flex align-middle items-center'}>
            {pageNumbers.map((number, idx) => (
                <React.Fragment key={number}>
                    {
                        idx !== 0 && number !== pageNumbers[idx - 1] + 1 &&
                        <span className={'mx-2  w-[2em] h-[2em] rounded-2xl  text-center'}>...</span>
                    }
                    <a
                        href={`/page${number}` + hrefParamsProp}
                        className={
                            'px-2 flex items-center justify-center w-[2em] h-[2em] rounded text-center' +
                            ' align-middle hover:bg-cyan-100 transition ease-in-out'                    +
                            (number === currentPage ? ' border border-1 border-cyan-700' : '')
                        }
                        onClick={(event) => {
                            event.preventDefault();
                            navigation.push(`/page${number}` + hrefParamsProp)
                        }}
                    >
                        {number}
                    </a>
                </React.Fragment>
            ))}
        </div>
    )
}