import AuthorLink from "@/Components/MainPage/authorModule/authorLink";
import useLocalization from "@/Components/Localization/Localization";
interface TopicEntityProps {
    topicProp: PostForTopic
}
export default function TopicEntity({topicProp}: TopicEntityProps){
    const {authorTag, addNewPost} = useLocalization('topics/interface');
    const {postId, topic, author} = topicProp;

    return (
        <div key={postId}
             className={`
                                w-full mb-5 bg-white transition-shadow box-border p-4
                                hover:outline hover:outline-1 hover:outline-cyan-600
                                `}
        >
            <img src={topic.imageURL}
                 alt={'/defaultTopic.png'}
                 className={'justify-center'}
            />

            <a className={'text-2xl font-bold'}
               href={'/article/' + postId}
               onClick={(event) => event.preventDefault()}
            >
                {topic.title.split('\n').map((item, i) => <p key={i}>{item}</p>)}
            </a>

            <div className={'border-b-cyan-500 border-b-2 mb-2'}>
                <span>{authorTag + ": "}</span>
                <AuthorLink className={'text-cyan-600 z-50 cursor-pointer'} author={author}/>
            </div>

            <div>{topic.description.split('\n').map((item, i) => <p key={i}>{item}</p>)}</div>
            <p className={'text-cyan-600'}>{topic.tags.join(` `)}</p>
        </div>
    )
}