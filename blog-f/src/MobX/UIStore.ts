'use client'
import {action, makeObservable, observable} from 'mobx';

export class UIStore {
    @observable
    showPopUp: boolean = false;
    @action
    setPopUp = (show: boolean) => {
        this.showPopUp = show;
    }

    public constructor() {
        makeObservable(this)
    }


}

export default UIStore;