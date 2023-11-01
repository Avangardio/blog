'use client'
import React, {useState, useEffect, ChangeEvent} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'prismjs/themes/prism.css'; // Стили для Prism.js
import Prism from 'prismjs';
import CreateTitle from "@/Components/article/createArticle/createTitle/CreateTitle";

const ArticleEditor = () => {
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
    const handleChangeElements =  (event: ChangeEvent<HTMLInputElement>) => {
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
            [{ 'header': '1' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ 'align': [] }],
            ['link'],
            ['code-block'],
            ['clean'],
        ],
    };

    if (!document) return null;
    return (
        <div>
            <CreateTitle title={article.title} changeAction={handleChangeElements} />
            <ReactQuill
                value={article.content}
                onChange={handleContentChange}
                modules={modules}
            />
        </div>
    );
};

export default ArticleEditor;
