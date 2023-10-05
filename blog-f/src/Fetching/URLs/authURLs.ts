export const loginURL = (function ():string {
        if(process.env.NODE_ENV === "development"){
            return process.env.NEXT_PUBLIC_AUTH_LOGIN_URL_DEV as string;
        }
        return process.env.NEXT_PUBLIC_AUTH_LOGIN_URL_PROD as string;
    })();

export const registrationURL = (function (): string {
    if(process.env.NODE_ENV === "development"){
        return process.env.NEXT_PUBLIC_AUTH_REG_URL_DEV as string;
    }
    return process.env.NEXT_PUBLIC_AUTH_REG_URL_PROD as string;
})();