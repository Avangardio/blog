'use client'
import {useStore} from "@/MobX/RootStore";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";
import Image from "next/image";
import {authURL} from "@/Fetching/URLs/authURLs";
import {useRouter} from "next/navigation";
import axios from "axios";
import {observer} from "mobx-react";
import useLocalization from "@/Components/Localization/Localization";
import FormHelper from "@/Components/forms/FormUtils/FormHelper";
import ReplyError from "@/Components/forms/FormUtils/ReplyError";


export default function LoginPage() {
    const { push } = useRouter();
    const {language} = useStore('UserStore');
    const {
        inputPlaceholder,
        inputHeader,
        inputError,
        termsOfUse,
        headers,
        serverErrors
    } = useLocalization('auth/inputs')

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, inputError.short)
            .max(70, inputError.long)
            .required(inputError.required),
        email: Yup.string()
            .min(2, inputError.short)
            .email(inputError.emailIncorrect)
            .required(inputError.required),
        password: Yup.string()
            .min(8,  inputError.short)
            .required(inputError.required),
    });

    const [replyError, setReplyError] = useState('');
    return (
        <div className={'bg-white p-2 rounded-s'}>
            <div className={'font-medium text-2xl text-cyan-800 z-50 mb-5 border-b-2 border-cyan-600 text-center'}>{headers.registration}</div>
            <Formik
                initialValues={{
                    password: '',
                    name: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    axios.post<{ payload: { confirmationToken: string } }>(authURL + 'registration', {
                        ...values,
                        language: language
                    })
                        .then(
                            result => push('/confirmation' + `?request=${result.data.payload.confirmationToken}`),
                            error => {}
                        )
                }}
            >
                {({ errors, touched }) =>
                    (
                    <Form id='reg-form' className="relative flex-col flex justify-center z-40">
                        <div>
                            <label className={'px-5 block font-medium text-sm text-cyan-700'} htmlFor={'name'}>{inputHeader.nameHeader}</label>
                            <Field name="name"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-cyan-700 placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.name && touched.name ? 'border-red-700' : "border-cyan-600"}`
                                   }
                                   placeholder={inputPlaceholder.namePlaceholder}
                            />
                            <FormHelper form={'registration'} field={'name'} error={errors} touched={touched} />

                        </div>

                        <div >
                            <label className={'px-5 block font-medium text-sm text-cyan-700'} htmlFor={'email'}>{inputHeader.emailHeader}</label>
                            <Field name="email"
                                   type="email"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-cyan-700 placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm 
                                       ${ errors.email && touched.email ? 'border-red-700' : "border-cyan-600"}`}
                                   placeholder={inputPlaceholder.emailPlaceholder}
                            />
                            <FormHelper form={'registration'} field={'email'} error={errors} touched={touched} />
                        </div>

                        <div>
                            <label className={'px-5 block font-medium text-sm text-cyan-700'} htmlFor={'password'}>{inputHeader.passwordHeader}</label>
                            <Field name="password"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-cyan-700 placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.password && touched.password ? 'border-red-700' : "border-cyan-600"}`
                                   }
                                   placeholder={inputPlaceholder.passwordPlaceholder}
                            />
                            <FormHelper form={'registration'} field={'password'} error={errors} touched={touched} />
                        </div>

                        <div className={' px-5 my-2 relative'}>
                            <div className={'absolute w-1 min-h-full bg-cyan-600'}/>
                            <div className={'ml-2'}>
                                <div className={` block font-medium text-sm text-cyan-800`}>{termsOfUse.terms1}</div>
                                <p><a className={` text-cyan-500 cursor-pointer text-sm border-b-cyan-500 border-b-2`}>{termsOfUse.terms2}</a></p>
                            </div>
                        </div>

                       <ReplyError replyError={replyError} />

                        <button className={`
                                            bg-cyan-600 self-center rounded-xl h-12 w-80 drop-shadow-lg 
                                            transform transition-transform active:scale-95 active:translate-y-1 active:shadow-sm
                                           `}
                                    type="submit">{headers.registration}</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
