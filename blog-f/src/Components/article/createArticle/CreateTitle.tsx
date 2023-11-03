'use client'

import React, {ChangeEvent} from "react";

interface ICreateTitle {
    title: string;
    changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateTitle({title, changeAction}: ICreateTitle) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeAction(event)
    }

    return <input name={'title'} onChange={handleChange} value={title}/>
}