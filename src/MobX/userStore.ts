'use client'
import {observable, action, makeObservable} from 'mobx';
import axios from "axios";
import {loginURL} from "@/Fetching/URLs/authURLs";

export class UserStore {
    @observable count = 0;

    @observable token: string = '';

    @observable userName: string = '';
    @observable userId: string = '';


    @observable remember: boolean = false;

    @observable language: "RU" | "EN" = 'RU';

    @action loginUser = async () => {
        const loginAnswer = await axios.get(`${loginURL}/login`).catch(() => undefined);
        this.count++;
    };

    @action decrement = () => {
        this.count--;
    };
    public constructor() {
        makeObservable(this)

    }
}
export default UserStore;