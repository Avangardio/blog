'use client'
import {useForm, Form, Field, FieldError} from "afreactforms";
import useLocalization from "@/Components/Localization/Localization";
import * as Yup from "yup";


export default function Z(){
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
    })

    const a = useForm({initialValues: {email: '', password: ''}, validationSchema: SignupSchema});
    a.serverError
    return (
        <Form
            className={'flex flex-col gap-1'}
            onSubmit={() => {
                console.log(1)
                a.setServerError('sda')
            }}
            serviceProp={a.service}
        >
            <Field name={'email'} type={'email'}/>
            <FieldError name={'email'}>
                {errorMsg => {
                    return <a>{errorMsg}</a>
                }}
            </FieldError>

            <Field name={'password'} type={'password'}/>
            <FieldError name={'password'}>
                {errorMsg => {
                    return <a>{errorMsg}</a>
                }}
            </FieldError>
            <FieldError name={'serverError'} className={'bg-cyan-600'}/>
            <button type={"submit"}>Отправить</button>
        </Form>
    )
}