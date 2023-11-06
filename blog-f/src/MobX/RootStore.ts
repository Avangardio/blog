'use client'
import {createContext, useContext} from "react";
import {enableStaticRendering} from "mobx-react";
import UserStore from "@/MobX/userStore";
import UIStore from "@/MobX/UIStore";
import TagsStore from "@/MobX/TagsStore";

enableStaticRendering(typeof window === "undefined");

const initialStore = {
    UserStore: new UserStore(),
    UIStore: new UIStore(),
    tagsStore: new TagsStore()
};

export const StoreContext = createContext<typeof initialStore>(initialStore);

//Использую перегрузку функции, чтоб четко определить тип возвращенного стора, или же тип всех сторов
export function useStore<T extends keyof typeof initialStore>(
    store: T
): typeof initialStore[T];
export function useStore(): typeof initialStore;
export function useStore(store?: keyof typeof initialStore) {
    const storeContext = useContext(StoreContext);

    if (store) {
        return storeContext[store];
    }

    return storeContext;
}

export default initialStore;