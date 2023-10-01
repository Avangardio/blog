'use client'
import {useStore} from "@/MobX/RootStore";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";
import Image from "next/image";
import {loginURL, registrationURL} from "@/URLs/authURLs";
import {useRouter} from "next/navigation";
import axios from "axios";
import {observer} from "mobx-react";
import useLocalization from "@/Components/Localization/Localization";
import FormHelper from "@/Components/fieldComponents/FormHelper";


export default function LoginPage() {
    const router = useRouter();
    const {
        inputPlaceholder,
        inputHeader,
        inputError,
        termsOfUse,
        headers} = useLocalization('auth/inputs')

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
        <>
            <div className={'font-medium text-2xl text-white z-50 mb-5'}>{headers.registration}</div>
            <Formik
                initialValues={{
                    password: '',
                    name: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    /* axios.post(registrationURL).then(
                        result => result.data
                    )
                    */
                    console.log(values);
                    setReplyError('pososi')
                }}
            >
                {({ errors, touched }) =>
                    (
                    <Form id='reg-form' className="relative flex-col flex justify-center z-40">
                        <div>
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'name'}>{inputHeader.nameHeader}</label>
                            <Field name="name"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.name && touched.name ? 'border-red-700' : "border-transparent"}`
                                   }
                                   placeholder={inputPlaceholder.namePlaceholder}
                            />
                            <FormHelper form={'registration'} field={'name'} error={errors} touched={touched} />

                        </div>

                        <div >
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'email'}>{inputHeader.emailHeader}</label>
                            <Field name="email"
                                   type="email"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm 
                                       ${ errors.email && touched.email ? 'border-red-700' : "border-transparent"}`}
                                   placeholder={inputPlaceholder.emailPlaceholder}
                            />
                            <FormHelper form={'registration'} field={'email'} error={errors} touched={touched} />
                        </div>

                        <div>
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'password'}>{inputHeader.passwordHeader}</label>
                            <Field name="password"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white pl-5 pr-10 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.password && touched.password ? 'border-red-700' : "border-transparent"}`
                                   }
                                   placeholder={inputPlaceholder.passwordPlaceholder}
                            />
                            <FormHelper form={'registration'} field={'password'} error={errors} touched={touched} />
                        </div>

                        <div className={' px-5 my-2 relative'}>
                            <div className={'absolute w-1 min-h-full bg-amber-300'}/>
                            <div className={'ml-2'}>
                                <div className={` block font-medium text-sm text-white`}>{termsOfUse.terms1}</div>
                                <p><a className={` text-amber-300 cursor-pointer text-sm border-b-amber-300 border-b-2`}>{termsOfUse.terms2}</a></p>
                            </div>

                        </div>
                        <button className={`${!replyError ? "bg-orange-300": "bg-red-950"} bg-orange-300 self-center rounded-3xl h-12  w-80 drop-shadow-lg`} type="submit">{replyError? replyError : "Регистрация"}</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
