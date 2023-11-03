'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'prismjs/themes/prism.css'; // Стили для Prism.js
import Prism from 'prismjs';
import CreateTitle from "@/Components/article/createArticle/CreateTitle";
import CreateDescription from "@/Components/article/createArticle/createDescription";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(
    async () => {
        const {default: RQ} = await import('react-quill');
        return ({...props}) => <RQ {...props} />;
    },
    {
        ssr: false,
    }
);
const CreateArticleMain = () => {
    const [article, updateArticle] = useState({
        content: '',
        title: '',
        picture: '',
        description: '',
        tags: []
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

    useEffect(() => {
        // Вызываем Prism.highlightAll() после обновления контента
        Prism.highlightAll();
    }, [article]);

    const modules = {
        toolbar: [
            [{'header': '1'}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['bold', 'italic', 'underline'],
            [{'align': []}],
            ['link'],
            ['code-block'],
            ['clean'],
        ],
    };

    if (typeof document === 'undefined' && typeof window === "undefined") return null;
    return (
        <div>
            <CreateTitle title={article.title} changeAction={handleChangeElements}/>
            <CreateDescription description={article.description} changeAction={handleChangeElements}/>
            <ReactQuill
                value={article.content}
                onChange={handleContentChange}
                modules={modules}
            />
        </div>
    );
};

export default CreateArticleMain;
