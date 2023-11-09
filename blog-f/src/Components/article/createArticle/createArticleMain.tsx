'use client'
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import CreateTitle from "@/Components/article/createArticle/CreateTitle";
import CreateDescription from "@/Components/article/createArticle/createDescription";
import TextareaAutosize from "react-textarea-autosize";
import {useStore} from "@/MobX/RootStore";
import useLocalization from "@/Components/Localization/Localization";
import CreateImage from "@/Components/article/createArticle/createImage";
import CreateTags from "@/Components/article/createArticle/createTags";

const CreateArticleMain = () => {
    const {Header, contentPL} = useLocalization('new/create');


    const [article, updateArticle] = useState({
        content: '',
        title: '',
        picture: '',
        description: '',
        tags: [],
    });

    // Функция для обработки изменения контента
    const handleContentChange = (newContent: string) => {
        updateArticle({...article, content: newContent});
    };
    const handleChangeElements = (event: ChangeEvent<HTMLInputElement>) => {
        updateArticle({
            ...article,
            [event.target.name]: event.target.value,
        })
    }
    const handlePictureUpload = (newPicture: string) => {
        updateArticle({
            ...article,
            picture: newPicture,
        })
    }
    return (
        <div className={'flex flex-col'}>
            <p className={'text-center my-2 text-2xl'}>{Header}</p>
            <CreateImage changeAction={handlePictureUpload} />
            <CreateTitle title={article.title} changeAction={handleChangeElements}/>
            <CreateDescription description={article.description} changeAction={handleChangeElements}/>
            <TextareaAutosize
                minRows={3}
                maxRows={30}
                className={'w-full p-2 focus:outline-cyan-600'}
                value={article.content}
                placeholder={contentPL}
                onChange={(event) => handleContentChange(event.target.value)}
            />
            <CreateTags />
        </div>
    );
};
export default CreateArticleMain;
