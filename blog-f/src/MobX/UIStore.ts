'use client'
import {observable, action, makeObservable} from 'mobx';
import {enableStaticRendering} from "mobx-react";

export class UIStore {
    @observable
    selectedAuthorId: number | undefined;
    @observable
    selectedAuthorName: string | undefined;
    @observable
    selectedAuthorFrom: string | undefined;

    @action
    setSelectedAuthor = (authorId: number, authorName: string, authorFrom: string) => {
        this.selectedAuthorId = authorId;
        this.selectedAuthorName = authorName;
        this.selectedAuthorFrom = authorFrom;
    }
    @action
    unsetSelectedAuthor = () => {
        this.selectedAuthorId = undefined;
    }

    public constructor() {
        makeObservable(this)
    }


}

export default UIStore;