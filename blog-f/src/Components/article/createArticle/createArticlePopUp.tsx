'use client'
import {useStore} from "@/MobX/RootStore";
import {observer} from "mobx-react";
import CreateArticleMain from "@/Components/article/createArticle/createArticleMain";
import {useEffect, useRef} from "react";

function CreateArticlePopUp() {
    const {showPopUp, setPopUp} = useStore('UIStore');
    const elementRef = useRef<HTMLDivElement | null>(null);
    console.log(showPopUp)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
                (setPopUp(false));
            }
        };
        if(showPopUp) document.addEventListener("click", handleClickOutside);

        return () => {
            if(showPopUp)  document.removeEventListener("click", handleClickOutside);
        };
    }, [showPopUp]);

    if (!showPopUp) return null;
    return (
        <div className={'z-50 absolute p-4 bg-white shadow-2xl md:min-w-[400px] top-[100px]'} ref={elementRef}>
            <CreateArticleMain />
        </div>
    )
}

export default observer(CreateArticlePopUp);