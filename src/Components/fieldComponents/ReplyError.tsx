import React from "react";

export default function ReplyError({replyError}: {replyError: string}){
    if(!replyError) return null;
    return (
        <div className={`
             self-center
             my-5 
             box-border 
             border-red-700 
             border-2 bg-red-700
             bg-opacity-20 text-white 
             w-[80%] text-center min-h-[2em] max-w-[15em] flex-shrink-0 white-space-normal 
             word-break-break-all`}
        >
            {replyError}
        </div>

    )
}