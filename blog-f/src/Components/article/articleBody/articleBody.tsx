import ArticleHeader from "@/Components/article/articleBody/articleHeader";
import CommentsSection from "@/Components/media/commentaries/CommentsSection";
import ArticleText from "@/Components/article/articleBody/arcticleText";
import ArticleBack from "@/Components/article/articleBody/articleBack";

interface ArticleBodyProps {
    payload: PostData
}

export default function Article({payload}: ArticleBodyProps) {
    return (
        <div>
            <ArticleBack />
            <ArticleHeader postId={payload.postId}
                           title={payload.title}
                           picture={payload.picture}
                           description={payload.description}
                           author={payload.author}
                           ctime={payload.ctime}
                           tags={payload.tags}
                           views={payload.views}
                           comments={payload.comments}
                           likes={payload.likes}
            />
            <ArticleText text={payload.texts} />
            <CommentsSection postId={payload.postId} />
        </div>
    )
}