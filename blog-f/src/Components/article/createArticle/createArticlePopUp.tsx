'use client'
import {useStore} from "@/MobX/RootStore";
import {observer} from "mobx-react";
import CreateArticleMain from "@/Components/article/createArticle/createArticleMain";
import {useEffect, useRef} from "react";

function CreateArticlePopUp() {
    const {showPopUp, setPopUp} = useStore('UIStore');
    const elementRef = useRef<HTMLDivElement | null>(null);

        const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
            if (showPopUp && elementRef.current && elementRef.current.contains(e.target as Node)) {
                setPopUp(false)
            }
        };
    if (!showPopUp) return null;
    return (
        <div onClick={handleClickOutside}
            className={'z-30 absolute p-4 bg-white shadow-2xl md:w-full top-[100px] max-w-[700px]'} ref={elementRef}>
            <div className={'z-30 right-0 left-0 top-0 bottom-0 fixed w-screen h-screen bg-white opacity-50'}/>
            <div onClick={event => event.stopPropagation()}>
                <CreateArticleMain />
            </div>
        </div>
    )
}

export default observer(CreateArticlePopUp);