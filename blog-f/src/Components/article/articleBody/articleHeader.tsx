'use client'
import shrinkText from "@/Components/utils/shrinkMultiLineText";
import Image from "next/image";
import AuthorLink from "@/Components/Author/authorLink";
import TopicTags from "@/Components/topic/topicTags";
import moment from "moment/moment";
import MediaPanel from "@/Components/media/MediaPanel";

interface ArticleHeaderProps{
    "postId": number,
    "title": string,
    "picture": string,
    "description": string,
    "ctime": string;
    "author": PostData['author'],
    tags: string[];
    likes: number
    comments: number
    views: number
}

export default function ArticleHeader(articleHeader: ArticleHeaderProps) {
    const {postId, description, title, author, picture, ctime, tags, comments, likes, views} = articleHeader;
    const formattedDate = moment(ctime).format('HH:mm DD.MM.YYYY');

    return (
        <div className={'w-full mb-5 bg-white transition-shadow box-border p-4 hover:outline hover:outline-1 hover:outline-cyan-600 max-w-[700px] relative'}>
            <Image src={picture} alt={picture} fill={true} className={'justify-center object-scale-down md:min-w-[700px] !relative max-h-[400px]'}/>
            <h1 className={'text-2xl font-bold'}>{shrinkText(title)}</h1>
            <div>{shrinkText(description)}</div>
            <div className={'flex flex-row border-b-cyan-500 border-b-2 mb-2 justify-between'}>
                <AuthorLink author={author} className={''} />
                <span>{formattedDate}</span>
            </div>
            {tags.map((tag, index) => <a className={'text-cyan-600 mr-1 hover:underline'} key={index}>{tag}</a>)}
            <MediaPanel likes={likes} comments={comments} views={views} postId={postId}/>
        </div>
    )
}