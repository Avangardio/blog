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

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    re_password: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
});

export default function LoginPage() {
    const router = useRouter();
    const localization = useLocalization('registration')

    const [showPassword, setShowPassword] = useState(false);
    const [showRe_Password, setShowRe_Password] = useState(false);
    const [replyError, setReplyError] = useState('');
    return (
        <>
            <div className={'font-medium text-2xl text-white z-50 mb-5'}>{localization.header}</div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    re_password: '',
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
                {({ errors, touched }) => (
                    <Form id='reg-form' className="relative flex-col flex justify-center z-40">
                        <div>
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'name'}>Имя пользователя</label>
                            <Field name="name"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white px-5 border rounded-3xl h-12  mb-5 w-80 shadow-sm
                                       ${ errors.name && touched.name ? 'border-red-700' : "border-transparent"}`
                                    }
                                   placeholder={"Name"}
                            />
                            <ErrorMessage name="name" component="p"
                                          className={`px-5 mt-[-1.25rem] text-sm text-red-700 transition duration-300 ease-in-out `}
                            />
                        </div>

                        <div>
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'email'}>Электронная почта</label>
                            <Field name="email"
                                   type="email"
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white px-5 border rounded-3xl h-12  mb-5 w-80 shadow-sm 
                                       ${ errors.email && touched.email ? 'border-red-700' : "border-transparent"}`}
                                   placeholder={"example@example.org"}
                            />
                            <ErrorMessage name="email" component="p"
                                          className={`px-5 mt-[-1.25rem] text-sm text-red-700 transition duration-300 ease-in-out `}
                            />
                        </div>

                        <div>
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'password'}>Пароль</label>
                            <Field name="password"
                                   type={showPassword ? 'text' : 'password'}
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white px-5 border rounded-3xl h-12  mb-5 w-80 shadow-sm 
                                       ${ errors.password && touched.password ? 'border-red-700' : "border-transparent"}`}
                                   placeholder={"••••••••"}
                            />
                            <button type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="ml-[-2rem] mt-[0.86rem] absolute"
                            >
                                {showPassword ?
                                    <Image src={'eye.svg'} alt={'eye.svg'} width={'20'} height={'20'}/>
                                    :
                                    <Image src={'eye-s.svg'} alt={'eye-s.svg'} width={'20'} height={'20'}/>
                                }
                            </button>
                            <ErrorMessage name="password" component="p"
                                          className={`px-5 mt-[-1.25rem] text-sm text-red-700 transition duration-300 ease-in-out `}
                            />
                        </div>
                        <div>
                            <label className={'px-5 block font-medium text-sm text-white'} htmlFor={'re_password'}>Повторите пароль</label>
                            <Field name="re_password"
                                   type={showRe_Password ? 'text' : 'password'}
                                   className={`
                                       transition duration-300 ease-in-out 
                                       focus:border-transparent focus:bg-gray-300 focus:bg-transparent focus:outline-0 focus:border-gray-300
                                       hover:border-gray-300 hover:bg-gray-300 hover:bg-transparent 
                                       text-white placeholder-gray-500 bg-opacity-10 bg-white px-5 border rounded-3xl h-12  mb-5 w-80 shadow-sm 
                                       ${ errors.re_password && touched.re_password ? 'border-red-700' : "border-transparent"}`}
                                   placeholder={"••••••••"}
                            />
                            <button type="button"
                                    onClick={() => setShowRe_Password(!showRe_Password)}
                                    className="ml-[-2rem] mt-[0.86rem] absolute"
                            >
                                {showRe_Password ?
                                    <Image src={'eye.svg'} alt={'eye.svg'} width={'20'} height={'20'}/>
                                    :
                                    <Image src={'eye-s.svg'} alt={'eye-s.svg'} width={'20'} height={'20'}/>
                                }
                            </button>
                            <ErrorMessage name="re_password" component="p"
                                          className={`px-5 mt-[-1.25rem] text-sm text-red-700 transition duration-300 ease-in-out `}
                            />
                        </div>
                        <div>
                            <div className={`px-5 block font-medium text-sm text-white my-5`}>
                                Нажимая кнопку, вы принимаете <p><a className={`text-amber-300 cursor-pointer border-b-amber-300 border-b-2`}>Условия использования</a></p>
                            </div>
                        </div>
                        <button className={`${!replyError ? "bg-orange-300": "bg-red-950"} bg-orange-300 self-center rounded-3xl h-12  w-80 drop-shadow-lg`} type="submit">{replyError? replyError : "Регистрация"}</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
