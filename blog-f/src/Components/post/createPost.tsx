'use client'
import useLocalization from "@/Components/Localization/Localization";
import {useStore} from "@/MobX/RootStore";
import Image from "next/image";

export default function CreatePost() {
    const {createButtonGuest, createButtonLogged} = useLocalization('topics/interface');
    const {UserStore} = useStore();

    return (
        <a href={'#'}
           className={`
                bg-cyan-600 w-full mb-[1rem] h-10 text-center align-middle flex py-2 justify-center
                transform transition-transform duration-150 shadow-md
                hover:scale-95 focus:scale-95 active:scale-95 
                hover:-translate-y-1 focus:-translate-y-1 active:-translate-y-1 gap-1
           `}
        >
            <Image src={'plus.svg'} alt={'plus.svg'} width={20} height={20}/>
            {UserStore.userName ? createButtonLogged : createButtonGuest}
        </a>
    )
}