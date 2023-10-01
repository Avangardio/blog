import { observer } from 'mobx-react';
import Navigation from "@/Components/header/navigation";


const Header = observer(() => {
    return (
        <header className={'flex h-10 bg-gray-500 justify-center items-center flex-wrap absolute top-0 w-full z-[100]'}>
            <Navigation/>
        </header>
    )
})
export default Header;