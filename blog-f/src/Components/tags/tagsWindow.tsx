'use client'
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
interface TagWindowProp {
    tag: string;
}
export default function TagsWindow({tag}: TagWindowProp) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsTags = useSearchParams().get('tags')?.split(',');
    const [isHovered, setIsHovered] = useState(false);
    const deleteTag = (deleteTag: string) => {
        const newTags = searchParamsTags?.filter(tag => tag !== deleteTag);
        const renewedSearchParams = searchParams.toString().
            replace(
                /tags=([^&]+)/,
             newTags && newTags.length > 0 ?`tags=${newTags}` : ''
            )
        router.push(`?${renewedSearchParams}`)
    }
    return (
        <div
            className={`relative animate-fade-in cursor-pointer bg-cyan-600 p-2 rounded-md ${isHovered ? 'text-red-500 line-through' : 'text-black'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => deleteTag(tag)}
        >
            {tag}
        </div>
    );
}