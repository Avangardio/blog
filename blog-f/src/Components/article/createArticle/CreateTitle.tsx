'use client'

import React, {ChangeEvent} from "react";
import useLocalization from "@/Components/Localization/Localization";

interface ICreateTitle {
    title: string;
    changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateTitle({title, changeAction}: ICreateTitle) {
    const {titlePL} = useLocalization('new/create');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeAction(event)
    }

    return <input name={'title'}
                  onChange={handleChange}
                  value={title}
                  placeholder={titlePL}
                  className={'p-2 my-2 focus:outline-cyan-600'}
    />
}