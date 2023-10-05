import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";

function AuthorCard(){
    const uiStore = useStore('UIStore');
    return (
        <div className={'hidden md:block absolute min-w-[100px] h-5 bg-cyan-50 outline-1 outline-cyan-700'}>
            {uiStore.selectedAuthor}
        </div>
    )
}
export default observer(AuthorCard);