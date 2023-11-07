import Image from "next/image";
import {useState} from "react";
import UserSlider from "@/Components/header/userSlider";
import useLocalization from "@/Components/Localization/Localization";
import {useStore} from "@/MobX/RootStore";
import {useRouter} from "next/navigation";

export default function UserCabinet() {
    const router = useRouter();
    const {logout, register, login, back} = useLocalization('header');
    const {userId, userName} = useStore('UserStore');
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div className={'flex flex-row relative align-middle items-center'}>
            <div className={'max-w-[20em] overflow-ellipsis overflow-hidden text-white cursor-pointer'}
                 onClick={() => router.push(userId ? 'logout' : 'login')}
            >
                {userId ? userName : login}
            </div>
            <Image className={'transition-transform transform hover:scale-95 cursor-pointer'}
                   src={'/options.svg'}
                   alt={'/options.svg'}
                   width={40}
                   height={40}
                   onClick={() => setVisible(!visible)}
            />
            {visible && <UserSlider visible={visible} update={setVisible} />}
        </div>
    )
}