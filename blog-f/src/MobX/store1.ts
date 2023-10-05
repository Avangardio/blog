'use client'
import {observable, action, makeObservable} from 'mobx';
import {createContext, useContext} from "react";

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