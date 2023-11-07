import React from "react";
import {observer} from "mobx-react";
import useLocalization from "@/Components/Localization/Localization";

function ReplyError({replyError}: { replyError: string }) {
    const errors = useLocalization('auth/errors');
    if (!replyError) return null;
    return (
        <div className={`
             self-center
             my-5 
             box-border 
             border-red-700 
             border-2 bg-red-700
             bg-opacity-20 text-cyan-800 
             w-[80%] text-center min-h-[2em] max-w-[15em] flex-shrink-0 white-space-normal 
             word-break-break-all`}
        >
            {
                replyError in errors
                ? errors[replyError as keyof typeof errors]
                : errors['U_ERROR']
            }
        </div>
    )
}
export default observer(ReplyError)