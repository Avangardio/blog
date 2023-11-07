'use client'
import {action, makeObservable, observable} from 'mobx';
import {useRouter} from "next/router";

export class TagsStore {
    @observable
    selectedTags: string[] = [];
    @action
    addTag = (tag: string) => {
        if(this.selectedTags.includes(tag)) return;
        this.selectedTags.push(tag)
    }
    @action
    deleteTag = (deleteTag: string) => {
        this.selectedTags = this.selectedTags.filter(tag => tag != deleteTag);
    }
    @action
    initTags = (tags?: string[]) => {
        this.selectedTags = tags || [];
    }

    public constructor() {
        makeObservable(this)
    }


}

export default TagsStore;