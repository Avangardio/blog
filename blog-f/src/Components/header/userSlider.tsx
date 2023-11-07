'use client'
import useLocalization from "@/Components/Localization/Localization";
import {useStore} from "@/MobX/RootStore";
import {observer} from "mobx-react";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

interface UserSliderProps {
    visible: boolean;
    update: Dispatch<SetStateAction<boolean>>;
}
function UserSlider({visible, update}: UserSliderProps) {
    const router = useRouter();
    const {logout, register, login, back} = useLocalization('header');
    const {userId} = useStore('UserStore');
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
                update(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={elementRef} className={`${!visible ? 'hidden ' : ''} absolute top-[calc(100%)] w-40 bg-cyan-900 text-white text-center mr-[-0.5rem] pr-0.5 right-0 shadow`}>
            {
                !userId
                    ? <>
                        <div className={'mt-2'}/>
                        <p className={'transition-transform transform hover:scale-95 cursor-pointer'}
                           onClick={() => router.push('/login')}
                        >
                            {login}
                        </p>
                        <p className={'transition-transform transform hover:scale-95 cursor-pointer'}
                           onClick={() => router.push('/registration')}
                        >
                            {register}
                        </p>
                       </>
                    : <p className={'transition-transform transform hover:scale-95 cursor-pointer mt-2'}
                         onClick={() => router.push( window.location.host + '/logout')}
                    >{logout}</p>
            }
            <span className={'mt-2 border-t-2 flex flex-row text-center justify-center transition-transform transform hover:scale-95 cursor-pointer'}
                  onClick={() => update(!visible)}
            >
                {back}
            </span>
        </div>
    )
}
export default observer(UserSlider)