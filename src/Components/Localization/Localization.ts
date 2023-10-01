
import { useState, useEffect } from 'react';
import { autorun } from 'mobx';
import localizationData from './localization.json';
import store from "@/MobX/RootStore";
import {enableStaticRendering} from "mobx-react";

type LocalizationData = typeof localizationData;
type Languages = keyof LocalizationData;
type GroupNames = keyof LocalizationData[Languages];

enableStaticRendering(typeof window === "undefined");

export default function useLocalization<Group extends keyof LocalizationData[Languages]>(group: Group): LocalizationData[Languages][Group] {
    const [localizedText, setLocalizedText] = useState<LocalizationData[Languages][Group]>
    (() => localizationData[store.UserStore.language][group]);

    useEffect(() => {
        // При изменении языка в store, автоматически обновляем состояние
        const disposer = autorun(() => {
            const newLanguage = store.UserStore.language;
            setLocalizedText(localizationData[newLanguage][group]);
        });


        // Очистка при размонтировании компонента
        return () => {
            disposer();
        };
    }, [group]);

    return localizedText;
}
