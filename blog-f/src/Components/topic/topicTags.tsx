'use client'
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface TopicTagsProps {
    tags: PostData['tags']
    page: number
}
export default function TopicTags({tags, page}: TopicTagsProps){
    const pathname = usePathname()

    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsTags = useSearchParams().get('tags');
    const setTag = (tag: string) => {
        if(searchParamsTags?.includes(tag)) return;
        const renewedSearchParams = searchParams.toString().replace(/tags=([^&]+)/, `tags=${searchParamsTags},${tag}`)
        router.push(`${page > 1 ? window.location.origin : ''}?${renewedSearchParams || `tags=${tag}`}`)
    }
    return tags.map((tag, index) => {
        return <a className={'text-cyan-600 mr-1 hover:underline cursor-pointer '} onClick={() => setTag(tag)} key={index}>{tag}</a>
    })
}