import FormWindow, {formKits} from "@/Components/forms/FormUtils/FormWindow";
import Image from "next/image";
import {useState} from "react";
import {FormikTouched} from "formik";

type Forms = keyof typeof formKits;

type KeysForForm<Form extends Forms> = {
    [Key in typeof formKits[Form][number]]?: string;
}

interface ErrorNotifyProps<Form extends Forms = Forms> {
    form: Form,
    error?: KeysForForm<Form>,
    touched?: FormikTouched<KeysForForm<Form>>,
    field: typeof formKits[Form][number]
    className?: string
}

export default function FormHelper({form, error, touched, field, className}: ErrorNotifyProps) {
    const [window, setWindow] = useState<boolean>(false);
    return (
        <div className={'relative  flex-shrink-0'}>
            <Image src={(error && error[field] && touched && touched[field]) ? "input-error.svg" : "input-info.svg"}
                   alt={'input-info.svg'}
                   width={20} height={20}
                   className={className ?? `absolute mt-[calc(-2.75rem-10px)] right-2`}
                   onMouseOver={() => setWindow(true)}
                   onMouseOut={() => setWindow(false)}
            />
            {
                window ? <FormWindow form={form} touched={touched} error={error} field={field}/> : null
            }
        </div>
    )
}
