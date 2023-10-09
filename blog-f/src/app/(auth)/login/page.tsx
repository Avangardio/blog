'use client'
import {useStore} from "@/MobX/RootStore";
import {Formik, Field, Form, ErrorMessage, useFormik} from "formik";
import * as Yup from "yup";
import React, {useMemo, useState} from "react";
import Image from "next/image";
import {loginURL, registrationURL} from "@/Fetching/URLs/authURLs";
import {useRouter} from "next/navigation";
import axios from "axios";
import {observer} from "mobx-react";
import useLocalization from "@/Components/Localization/Localization";
import FormHelper from "@/Components/forms/FormUtils/FormHelper";
import ReplyError from "@/Components/forms/FormUtils/ReplyError";
import FieldRedirect from "@/Components/forms/FormUtils/FieldRedirect";


export default function LoginPage() {
    const router = useRouter();
    const {
        inputPlaceholder,
        inputHeader,
        inputError,
        termsOfUse,
        headers,
        serverErrors
    } = useLocalization('auth/inputs');

    const SignupSchema = useMemo(() => Yup.object().shape({
        password: Yup.string()
            .min(2, inputError.short)
            .max(70, inputError.long)
            .required(inputError.required),
        email: Yup.string()
            .min(2, inputError.short)
            .email(inputError.emailIncorrect)
            .required(inputError.required),
    }),[inputError])

    const inputClasses = `transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-cyan-700 placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm`;


    const [replyError, setReplyError] = useState('');
    return (
        <div className={'bg-white p-4 rounded-s'}>
            <div className={'font-medium text-2xl text-cyan-800 z-50 mb-5 border-b-2 border-cyan-600 text-center'}>{headers.login}</div>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                    remember: false
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    /* axios.post(registrationURL).then(
                        result => result.data
                    )
                    */
                    console.log(values);
                    setReplyError(serverErrors.BAD_INPUT)
                }}
            >
                {({ errors, touched }) =>
                    (
                    <Form id='reg-form' className="relative flex-col flex justify-center z-40">
                            <label className={'px-5 block font-medium text-sm text-cyan-700'} htmlFor={'email'}>{inputHeader.emailHeader}</label>
                            <Field name="email"
                                   className={`${errors.email && touched.email ? 'border-red-700' : "border-cyan-600"} ` + inputClasses}
                                   placeholder={inputPlaceholder.emailPlaceholder}
                            />
                            <FormHelper form={'login'} field={'email'} error={errors} touched={touched}/>



                            <label className={'px-5 block font-medium text-sm text-cyan-700'} htmlFor={'password'}>{inputHeader.passwordHeader}</label>
                            <Field name="password"
                                   type="password"
                                   className={`${errors.password && touched.password ? 'border-red-700' : "border-cyan-600"} ` + inputClasses}
                                   placeholder={inputPlaceholder.passwordPlaceholder}
                            />
                            <FormHelper form={'login'} field={'password'} error={errors} touched={touched} />


                        <div className={'text-cyan-700 px-1 w-full mb-3 flex-shrink-0'}>
                            <label className="">
                                <Field name="remember"
                                       type="checkbox"
                                       className={`
                                          align-middle mr-1`}
                                />
                                {inputPlaceholder.rememberPlaceholder}
                            </label>
                            <FieldRedirect to={'restoration'} className={'absolute whitespace-nowrap text-cyan-600 end-0 '}/>
                        </div>



                        <ReplyError replyError={replyError}/>
                        <button className={`bg-cyan-600 self-center rounded-xl h-12 w-80 drop-shadow-lg 
                                            transform transition-transform active:scale-95 active:translate-y-1 active:shadow-sm
                                            `} type="submit"
                        >
                            {headers.login}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
