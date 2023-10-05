import { createContext, useContext } from "react";
import { enableStaticRendering } from "mobx-react";
import UserStore from "@/MobX/userStore";
import UIStore from "@/MobX/UIStore";

enableStaticRendering(typeof window === "undefined");

const initialStore = {
    UserStore: new UserStore(),
    UIStore: new UIStore(),
};

export const StoreContext = createContext<typeof initialStore>(initialStore);

function display(a:string, b:string):void //Compiler Error: Duplicate function implementation


function display(a:number): void //Compiler Error: Duplicate function implementation

function display(a: number | string){
    console.log(a)
}

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