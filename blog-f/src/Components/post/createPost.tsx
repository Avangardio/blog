'use client'
import useLocalization from "@/Components/Localization/Localization";
import {useStore} from "@/MobX/RootStore";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function CreatePost() {
    const {createButtonGuest, createButtonLogged} = useLocalization('topics/interface');
    const {userName} = useStore('UserStore');
    const {setPopUp} = useStore('UIStore');
    const router = useRouter();

    return (
        <a href={'#'}
           className={`
                bg-cyan-600 w-full mb-[1rem] h-10 text-center align-middle flex p-2 justify-center
                transition-transform transform hover:scale-95
                 focus:-translate-y-1 active:-translate-y-1 gap-1
           `}
           onClick={(event) => {
               event.preventDefault()
               if(userName) return setPopUp(true);
               return router.push('/login')
           }}
        >
            <Image src={'plus.svg'} alt={'plus.svg'} width={20} height={20}/>
            {userName ? createButtonLogged : createButtonGuest}
        </a>
    )
}