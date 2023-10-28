'use client'
import {observable, action, makeObservable, runInAction} from 'mobx';
import axios from "axios";
import {loginURL} from "@/Fetching/URLs/authURLs";

export class UserStore {
    @observable count = 0;

    @observable token: string = '';

    @observable userName: string = '';
    @observable userId: number = 0;


    @observable remember: boolean = false;

    @observable language: "RU" | "EN" = 'RU';

    @action loginUser = (authData: AuthUserTypeResponse['payload']) => {
        if(!authData) return;
        runInAction(() => {
            this.userName = authData?.username ? authData.username : this.userName;
            this.userId = authData?.userid ? authData.userid : this.userId;
        })
    };

    @action decrement = () => {
        this.count--;
    };
    public constructor() {
        makeObservable(this)

    }
}
export default UserStore;