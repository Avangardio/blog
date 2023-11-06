'use client'
import useLocalization from "@/Components/Localization/Localization";
import shrinkText from "@/Components/utils/shrinkMultiLineText";
import AuthorLink from "@/Components/Author/authorLink";

interface PopularPostsProps {
    popularPosts: PostData[] | undefined
}

export default function PopularPosts({popularPosts}: PopularPostsProps) {
    const {authorTag, popularHeader} = useLocalization('topics/interface')

    if (!popularPosts) return <div>{"No posts"}</div>
    return (
        <div className={'hidden sm:block absolute left-[calc(100%+20px)] bg-white p-2 top-0 break-words max-w-[300px] min-w-[200px]'}>
            <p className={'border-b-2 mx-[-0.5rem] mt-[-0.5rem] w-[calc(100% + 1rem)] bg-cyan-600 px-1'}>{popularHeader}</p>
            {
                popularPosts.map(post => {
                    return (
                        <div className={''} key={post.postId}>
                            <a className={'text-xl font-bold'}
                               href={'/article/' + post.postId}
                               onClick={(event) => event.preventDefault()}
                            >
                                {shrinkText(post.title)}
                            </a>
                            <AuthorLink author={post.author} className={'mb-2 text-sm'} />
                        </div>
                    )
                })
            }
        </div>
    )
}