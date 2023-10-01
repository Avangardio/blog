'use client'
import {useRouter} from "next/navigation";
import useLocalization from "@/Components/Localization/Localization";
import * as Yup from "yup";
import React, {useRef, useState} from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";
import FormHelper from "@/Components/fieldComponents/FormHelper";
import {formKits} from "@/Components/fieldComponents/FormWindow";

type FormValues = {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
    input6: string;
};

export default function MyForm() {
    const localization = useLocalization('auth/inputs')

    const inputRefs = Array(6).fill(null).map(() => useRef<HTMLInputElement>(null));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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
                console.log(values);
            }}
        >
            {formikProps => (
                <Form className="relative flex-col flex items-center z-40 ">
                    <div className={'mb-5'}>
                        {Array(6).fill(null).map((_, index) => (
                            <Field
                                className={`
                                    w-[2em] h-[2em] text-center
                                    transition duration-300 ease-in-out
                                    focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                    hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent
                                    text-white placeholder-gray-500 bg-opacity-10 bg-white border`
                                }
                                key={index}
                                name={`input${index + 1}`}
                                type="text"
                                pattern={'\d*'}
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
                    <button className={"bg-orange-300 self-center rounded-3xl h-12 w-60 drop-shadow-lg"} type="submit">Kod</button>

                </Form>
            )}
        </Formik>
    );
};
/*
<Field name="code"
                                       type="number"
                                       pattern="\d*"
                                       className={`
                                       transition duration-300 ease-in-out
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.code && touched.code ? 'border-red-700' : "border-transparent"}`}
                                />
 */