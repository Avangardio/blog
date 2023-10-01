'use client'
import {useStore} from "@/MobX/RootStore";
import {observer} from "mobx-react";
export function NewsList({page, posts}: {page: string, posts: string[]}){
    const {Counter1} = useStore();
    return (
        <>
            <p><b>{page}</b></p>
            <b>Первый: {Counter1.count}</b>
            <p>1
                <button onClick={Counter1.increment}>+</button>
                <button onClick={Counter1.decrement}>-</button>
            </p>
        </>
    )
}
export default observer(NewsList)