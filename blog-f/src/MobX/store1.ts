'use client'
import {action, makeObservable, observable} from 'mobx';

export class ZStore {
    @observable count = 0;

    @action increment = () => {
        this.count++;
    };

    @action decrement = () => {
        this.count--;
    };

    private static _instance: ZStore;

    public constructor() {
        makeObservable(this)
    }
}

export default ZStore;