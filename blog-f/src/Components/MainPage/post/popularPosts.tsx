'use client'
import getPopularPosts from "@/Components/MainPage/utils/getPopularPosts";
import useLocalization from "@/Components/Localization/Localization";
interface PopularPostsProps {
    popularPosts: PostForPopular[] | undefined
}
export default function PopularPosts({popularPosts}: PopularPostsProps) {
    const {authorTag, popularHeader}  = useLocalization('topics/interface')

    if(!popularPosts) return <div>{"ZzzzzZzv"}</div>

    return (
        <div className={'hidden sm:block absolute right-0 mr-[-15rem] bg-white p-2 top-0'}>
            <p className={'border-b-2 mx-[-0.5rem] mt-[-0.5rem] w-[calc(100% + 1rem)] bg-cyan-600 px-1'}>{popularHeader}</p>
            {
                popularPosts.map(post => {
                    return (
                        <div className={''} key={post.postId}>
                            <a className={'text-xl font-bold'}
                                href={'/article/' + post.postId}
                                onClick={(event) => event.preventDefault()}
                                >
                                {post.topic.title.split('\n').map((item, i) => <p key={i}>{item}</p>)}
                            </a>
                            <div className={'mb-2 text-sm'}>
                                <span>{authorTag + ": "}</span>
                                <b className={'text-cyan-600'}>{post.author.authorName}</b>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}