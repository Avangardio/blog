'use client'
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import CreateTitle from "@/Components/article/createArticle/CreateTitle";
import CreateDescription from "@/Components/article/createArticle/createDescription";
import TextareaAutosize from "react-textarea-autosize";
import useLocalization from "@/Components/Localization/Localization";
import CreateImage from "@/Components/article/createArticle/createImage";
import CreateTags from "@/Components/article/createArticle/createTags";
import axios from "axios";
import {postsURL} from "@/Fetching/URLs/postsURLs";
import {useRouter} from "next/navigation";
import ReplyError from "@/Components/forms/FormUtils/ReplyError";
import {useStore} from "@/MobX/RootStore";
import {observer} from "mobx-react";

const CreateArticleMain = () => {
    const router = useRouter();
    const {Header, contentPL, createButton, error} = useLocalization('new/create');
    const [replyError, setReplyError] = useState('');

    const [article, updateArticle] = useState({
        texts: '',
        title: '',
        picture: '',
        description: '',
        tags: [''],
    });

    // Функция для обработки изменения контента
    const handleContentChange = (newContent: string) => {
        updateArticle({...article, texts: newContent});
    };
    const handleTagsChange = (newTags: string[]) => {
        updateArticle({...article, tags: newTags});
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
    const handleUploadPost = () => {
        axios.post(postsURL + 'createPost', {
            newPostData: article
        }, {withCredentials: true})
            .then(
                result => router.push('/article/' + result.data.payload.postId),
                error => setReplyError(error)
            )
    }
    return (
        <div className={'flex flex-col relative !z-50'}>
            <p className={'text-center my-2 text-2xl border-b-2 border-cyan-600'}>{Header}</p>
            <CreateImage changeAction={handlePictureUpload} />
            <CreateTitle title={article.title} changeAction={handleChangeElements}/>
            <CreateDescription description={article.description} changeAction={handleChangeElements}/>
            <TextareaAutosize
                minRows={3}
                maxRows={30}
                className={'w-full p-2 focus:outline-cyan-600'}
                value={article.texts}
                placeholder={contentPL}
                onChange={(event) => handleContentChange(event.target.value)}
            />
            <CreateTags changeAction={handleTagsChange}/>
            <ReplyError replyError={replyError}/>
            <button
                onClick={() => handleUploadPost()}
                className={'transition-transform transform hover:scale-95 bg-cyan-600 rounded text-white'}
            >
                {createButton}
            </button>
        </div>
    );
};
export default observer(CreateArticleMain);
