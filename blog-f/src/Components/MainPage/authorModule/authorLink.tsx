'use client'
import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";

interface AuthorLinkProps {
    className?: string,
    author: Author
}

function AuthorLink({className, author}: AuthorLinkProps) {
    const {authorId, authorName, authorFrom} = author;
    const UI = useStore('UIStore');
    return (
        <span className={className}
              onMouseEnter={() => {
                  UI.setSelectedAuthor(authorId, authorName, authorFrom);
              }}
              onMouseLeave={() => {
                  UI.unsetSelectedAuthor();
              }}
        >
            {author.authorName}
        </span>
    )
}

export default observer(AuthorLink)