import useLocalization from "@/Components/Localization/Localization";
import {FormikTouched} from "formik";


export const formKits = {
    registration: ['name', 'email', 'password'] as const,
    login: ['email', 'password'] as const,
    confirmation: ['code'] as const
};

type Forms = keyof typeof formKits;

type KeysForForm<Form extends Forms> = {
    [Key in typeof formKits[Form][number]]?: string;
}

interface ErrorNotifyProps<Form extends Forms = Forms> {
    form: Form,
    error?: KeysForForm<Form>,
    touched?: FormikTouched<KeysForForm<Form>>,
    field: typeof formKits[Form][number]
}

export default function FormWindow({form, error, touched, field}: ErrorNotifyProps) {
    const {inputHelper, inputError} = useLocalization('auth/inputs')

    if (error && error[field] && touched && touched[field]) {
        console.log(error, error[field])
        return (
            <div className='fixed border-black bg-red-700 text-white ml-[10rem] md:ml-[21rem] mt-[-3.4rem] px-1'>
                {
                    <p>{error[field]}</p>
                }
            </div>
        )
    }

    return (
        <div className='fixed border-gray-500 bg-gray-500 text-white ml-[10rem] md:ml-[21rem] mt-[-3.4rem] px-1 '>
            {
                formKits[form].map((item, _, array) => {
                    const fieldTag = item + "Helper" as keyof typeof inputHelper;
                    if (item === field) return <p key={item}>{inputHelper[fieldTag]}</p>
                })
            }
        </div>
    )
}