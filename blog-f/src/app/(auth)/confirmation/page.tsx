'use client'
import {useRouter} from "next/navigation";
import useLocalization from "@/Components/Localization/Localization";
import React, {useRef, useState} from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";
import axios from "axios";
import {authURL} from "@/Fetching/URLs/authURLs";
import ReplyError from "@/Components/forms/FormUtils/ReplyError";

type FormValues = {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
    input6: string;
};

interface ConfirmationPageProps {
    searchParams?: {
        ["request"]: string | string[] | undefined
    }
}

export default function MyForm({searchParams}: ConfirmationPageProps) {
    const localization = useLocalization('auth/inputs')
    const {headers} = useLocalization('auth/inputs')
    const {push} = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRefs = Array(6).fill(null).map(() => useRef<HTMLInputElement>(null));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const [replyError, setReplyError] = useState('');

    const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (index === focusedIndex) {
            e.target.value = e.target.value.slice(-1); // Оставляем только последний введенный символ
        }

        if (e.target.value && index < inputRefs.length - 1 && inputRefs[index + 1].current) {
            inputRefs[index + 1].current?.focus();
        } else if (!e.target.value && index > 0 && inputRefs[index - 1].current) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleInputFocus = (index: number) => (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
        setFocusedIndex(index);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Разрешаем: backspace, delete, tab, escape, enter и цифры
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            (e.keyCode >= 48 && e.keyCode <= 57) ||   // Цифровые клавиши
            (e.keyCode >= 96 && e.keyCode <= 105)     // Цифровые клавиши на NumPad
        ) {
            return;
        }

        // Если это не цифра, предотвращаем действие
        e.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
            }}
            onSubmit={(values: FormValues, helpers: FormikHelpers<FormValues>) => {
                axios.post(authURL + 'confirmation', {
                    confirmationToken: searchParams?.request,
                    emailCode: Object.values(values).join('')
                })
                    .then(
                        result => push('/login'),
                        error => setReplyError(error.response.data.message)
                    )
            }}
        >
            {formikProps => (
                <Form className="relative flex-col flex items-center z-40 bg-white p-5">
                    <div className={'mb-3 text-2xl'}>
                        {localization.headers.confirmation}
                    </div>
                    <p>{localization.headers.confirmationHelp}</p>

                    <div className={'my-10'}>
                        {Array(6).fill(null).map((_, index) => (
                            <Field
                                className={`
                                    w-[2em] h-[2em] text-center
                                    transition duration-300 ease-in-out
                                    focus:border-cyan-600 focus:bg-gray-300 focus:bg-transparent focus:outline-0
                                    hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent
                                    text-cyan-800 placeholder-gray-500 bg-opacity-10 bg-white border`
                                }
                                key={index}
                                name={`input${index + 1}`}
                                type="text"
                                pattern={'\\d'}
                                innerRef={inputRefs[index]}
                                maxLength={1}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formikProps.handleChange(e);
                                    handleInputChange(index)(e);
                                }}
                                onFocus={handleInputFocus(index)}
                                onKeyDown={handleKeyDown}
                            />
                        ))}
                    </div>

                    <ReplyError replyError={replyError}/>


                    <button className={"bg-cyan-600 self-center rounded h-12 w-32 drop-shadow-lg transition-transform transform hover:scale-95"}
                            type="submit">{headers.confirmation}
                    </button>
                </Form>
            )}
        </Formik>
    );
};
