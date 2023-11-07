'use client'

import TagsWindow from "@/Components/tags/tagsWindow";

export default function TagsManager({currentTags}: {currentTags: string | string[] | undefined}){
    const tags = Array.isArray(currentTags) ? currentTags : currentTags?.split(',');
    return (
        <div className={'flex gap-2 mb-2.5'}>
            {
                tags?.map((tag, index) => <TagsWindow tag={tag} key={index}/>
            )}
        </div>
    )
}

