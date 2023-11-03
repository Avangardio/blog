'use client'

import React, {ChangeEvent} from "react";

interface ICreateDescription {
    description: string;
    changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateDescription({description, changeAction}: ICreateDescription) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeAction(event)
    }

    return <input name={'description'} onChange={handleChange} value={description}/>
}