'use client'
import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";
interface AuthorLinkProps {
    className?: string,
    author: Omit<Author, "authorFrom">
}
function AuthorLink({className, author}: AuthorLinkProps){
    const UI = useStore('UIStore');
    return (
        <div className={className}
             onMouseEnter={() => {
                 UI.setSelectedAuthor(author.authorId);
             }}
             onMouseLeave={() => {
                 UI.setSelectedAuthor(author.authorId);
             }}
        >
            {author.authorName}
        </div>
    )
}
export default observer(AuthorLink)