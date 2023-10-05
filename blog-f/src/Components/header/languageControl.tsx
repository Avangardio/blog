import {observer} from "mobx-react";
import {useStore} from "@/MobX/RootStore";

function LanguageControl(){
    const {UserStore} = useStore();
    return (
        <select
            className={'left-1 text-sm bg-cyan-900 text-white'}
            defaultValue={UserStore.language}
            onChange={(event) => UserStore.language = event.target.value as "RU" | "EN"}
        >
            <option value={'RU'}>Русский</option>
            <option value={'EN'}>English</option>
        </select>
    )
}
export default observer(LanguageControl)