import Output from "@/DTO/auth/auth";

export class RequestValidationBodyDto {
    confirmationToken: string;
    emailCode: string;
}

export class RequestValidationOutputDto extends Output {
    payload: {
        confirmationToken: string;
        emailCode: string;
    };
}
