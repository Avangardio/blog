'use client'

import React, {ChangeEvent} from "react";
import useLocalization from "@/Components/Localization/Localization";

interface ICreateDescription {
    description: string;
    changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateDescription({description, changeAction}: ICreateDescription) {
    const {descPL} = useLocalization('new/create');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeAction(event)
    }

    return <input name={'description'}
                  onChange={handleChange}
                  value={description}
                  placeholder={descPL}
                  className={'p-2 my-2 focus:outline-cyan-600'}
    />
}