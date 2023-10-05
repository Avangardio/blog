'use client'
import {observable, action, makeObservable} from 'mobx';
import {enableStaticRendering} from "mobx-react";

export class CounterStore {
    @observable count = 0;

    @action increment = () => {
        this.count++;
    };

    @action decrement = () => {
        this.count--;
    };
    public constructor() {
        makeObservable(this)
    }


}

export default CounterStore;