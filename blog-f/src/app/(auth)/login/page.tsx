'use client'
import {useStore} from "@/MobX/RootStore";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";
import Image from "next/image";
import {loginURL, registrationURL} from "@/Fetching/URLs/authURLs";
import {useRouter} from "next/navigation";
import axios from "axios";
import {observer} from "mobx-react";
import useLocalization from "@/Components/Localization/Localization";
import FormHelper from "@/Components/fieldComponents/FormHelper";
import ReplyError from "@/Components/fieldComponents/ReplyError";
import FieldRedirect from "@/Components/fieldComponents/FieldRedirect";


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

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, inputError.short)
            .max(70, inputError.long)
            .required(inputError.required),
        email: Yup.string()
            .min(2, inputError.short)
            .email(inputError.emailIncorrect)
            .required(inputError.required),
    });

    const [replyError, setReplyError] = useState('');
    return (
        <>
            <div className={'font-medium text-2xl text-white z-50 mb-5'}>{headers.login}</div>
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
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'email'}>{inputHeader.emailHeader}</label>
                            <Field name="email"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.email && touched.email ? 'border-red-700' : "border-transparent"}`
                                   }
                                   placeholder={inputPlaceholder.emailPlaceholder}
                            />
                            <FormHelper form={'login'} field={'email'} error={errors} touched={touched} />



                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'password'}>{inputHeader.passwordHeader}</label>
                            <Field name="password"
                                   type="password"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-1 w-80 shadow-sm 
                                       ${ errors.password && touched.password ? 'border-red-700' : "border-transparent"}`}
                                   placeholder={inputPlaceholder.passwordPlaceholder}
                            />
                            <FormHelper form={'login'} field={'password'} error={errors} touched={touched} className={`absolute mt-[-2.35rem] right-2`} />


                        <div className={'text-white px-1 w-full mb-3 flex-shrink-0'}>
                            <label className="">
                                <Field name="remember"
                                       type="checkbox"
                                       className={`
                                          align-middle mr-1
                                      `}
                                />
                                {inputPlaceholder.rememberPlaceholder}
                            </label>
                            <FieldRedirect to={'restoration'} className={'absolute whitespace-nowrap text-amber-300 end-0 '}/>
                        </div>



                        <ReplyError replyError={replyError}/>
                        <button className={`bg-orange-300 self-center rounded-3xl h-12  w-80 drop-shadow-lg`} type="submit">{headers.login}</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
