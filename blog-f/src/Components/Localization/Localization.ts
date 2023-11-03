'use client'
import {useEffect, useState} from 'react';
import {autorun} from 'mobx';
import store from "@/MobX/RootStore";
import {enableStaticRendering} from "mobx-react";

import * as ruLocalization from './localization.RU.json';
import * as enLocalization from './localization.EN.json';

const localizationData = {
    RU: ruLocalization,
    EN: enLocalization
};

type Languages = keyof typeof localizationData;

type localizationLanguages = keyof typeof localizationData[Languages]

enableStaticRendering(typeof window === "undefined");

export default function useLocalization<Group extends localizationLanguages>(group: Group):
    typeof localizationData[keyof typeof localizationData][Group] {

    const [localizedText, setLocalizedText] =
        useState<typeof localizationData[keyof typeof localizationData][Group]>(localizationData[store.UserStore.language][group]);

    useEffect(() => {
        // При изменении языка в store, автоматически обновляем состояние
        const disposer = autorun(() => {
            setLocalizedText(localizationData[store.UserStore.language][group]);
        });

        return () => {
            disposer();
        };
    }, [group, store.UserStore.language]);

    return localizedText;
}
