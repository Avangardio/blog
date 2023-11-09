import useLocalization from "@/Components/Localization/Localization";
import Image from "next/image";
import {useRouter} from "next/navigation";
import AuthorLink from "@/Components/Author/authorLink";
import shrinkText from "@/Components/utils/shrinkMultiLineText";
import TopicTags from "@/Components/topic/topicTags";
import MediaPanel from "@/Components/media/MediaPanel";
import moment from "moment";

interface TopicEntityProps {
    topicProp: PostData
    page: number
}

export default function TopicEntity({topicProp, page}: TopicEntityProps) {
    const router = useRouter();
    const {authorTag, addNewPost} = useLocalization('topics/interface');
    const {postId, authorId, ctime, picture, tags, title, description, author, likes, comments, views} = topicProp;
    const formattedDate = moment(ctime).format('HH:mm DD.MM.YYYY');

    return (
        <div key={postId}
             className={`
                        w-full mb-5 bg-white box-border p-4
                        hover:outline hover:outline-1 hover:outline-cyan-600
                        animate-fade-in`
             }
        >
            <Image src={picture}
                 alt={'/defaultTopic.png'}
                 className={'justify-center object-scale-down !relative max-h-[400px] w-full'}
                   fill={true}
            />

            <a className={'text-2xl font-bold'}
               href={'/article/' + postId}
               onClick={(event) => {
                   event.preventDefault()
                   router.push('/article/' + postId)
               }}
            >
                {shrinkText(title)}
            </a>

            <div className={'flex flex-row border-b-cyan-500 border-b-2 mb-2 justify-between'}>
                <AuthorLink author={author} className={''} />
                <span>{formattedDate}</span>
            </div>


            <div>{shrinkText(description)}</div>


            <TopicTags tags={tags} page={page} />
            <MediaPanel likes={likes} comments={comments} views={views} postId={postId}/>
        </div>
    )
}