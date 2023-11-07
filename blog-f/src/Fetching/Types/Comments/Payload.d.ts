declare type ResponseData<T> = {
    "code": number,
    "isSucceed": boolean,
    "message": string,
    "payload": T
}