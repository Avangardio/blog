import { observer } from 'mobx-react';
import Navigation from "@/Components/header/navigation";
import {useStore} from "@/MobX/RootStore";
import LanguageControl from "@/Components/header/languageControl";
import UserCabinet from "@/Components/header/userCabinet";
import Image from "next/image";


const Header = observer(() => {
    const {UserStore} = useStore();

    return (
        <header className={'flex h-10 bg-cyan-900 justify-between flex-wrap fixed top-0 w-full z-[100] px-2'}>
            <LanguageControl />
            <Image src={'/logo.png'}
                   alt={'/BBlog.png'}
                   width={100} height={50}
                   onClick={() => window.location.href = '/'}
            />
            <Navigation />
            <UserCabinet />
        </header>
    )
})
export default Header;