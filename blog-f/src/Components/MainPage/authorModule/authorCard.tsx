'use client'
import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";
import {useEffect} from "react";
import useLocalization from "@/Components/Localization/Localization";

function AuthorCard() {
    const {
        selectedAuthorId,
        selectedAuthorName,
        selectedAuthorFrom
    } = useStore('UIStore');

    const {authorFrom, authorHelp} = useLocalization('topics/interface');

    useEffect(() => {
        const element = document.querySelector('.authorCard') as HTMLDivElement;
        //оптимизация для перемещения
        element.style.willChange = 'left, top';

        document.addEventListener('mousemove', (event) => {
            element.style.top = `${event.clientY - 90}px`;
            element.style.left = `${event.clientX}px`;
        });
        return () => document.removeEventListener('mousemove', (event) => {
            element.style.top = `${event.clientY - 90}px`;
            element.style.left = `${event.clientX}px`;
        });
    }, [])

    return (
        <div className={`
                ${selectedAuthorId ? "hidden md:block" : "hidden"}
                z-50 authorCard fixed p-1
                bg-cyan-50 border-2 border-cyan-600
             `}>
            <p>{selectedAuthorName}</p>
            <p>{authorFrom + selectedAuthorFrom}</p>
            <p>{authorHelp}</p>
        </div>
    )
}

export default observer(AuthorCard);