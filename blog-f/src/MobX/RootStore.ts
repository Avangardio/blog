import {createContext, useContext} from "react";
import ZStore from "@/MobX/store1";
import CounterStore from "@/MobX/store";
import {enableStaticRendering} from "mobx-react";
import UserStore from "@/MobX/userStore";

enableStaticRendering(typeof window === "undefined");

const store = {
    Counter1: new ZStore(),
    Counter2: new CounterStore(),
    UserStore: new UserStore()
};
export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};
export default store;