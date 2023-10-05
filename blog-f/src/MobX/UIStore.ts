'use client'
import {observable, action, makeObservable} from 'mobx';
import {enableStaticRendering} from "mobx-react";

export class UIStore {
    @observable
    selectedAuthor: number | undefined;

    @action
    setSelectedAuthor = (authorId: number) => {
        this.selectedAuthor = authorId;
    }
    @action
    unsetSelectedAuthor = () => {
        this.selectedAuthor = undefined;
    }

    public constructor() {
        makeObservable(this)
    }


}

export default UIStore;