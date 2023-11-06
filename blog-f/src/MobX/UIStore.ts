'use client'
import {action, makeObservable, observable} from 'mobx';

export class UIStore {
    @observable
    selectedAuthorId: number | undefined;
    @action
    setSelectedAuthor = (authorId: number) => {
        this.selectedAuthorId = authorId;
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