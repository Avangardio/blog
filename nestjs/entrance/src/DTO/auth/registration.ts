import Output from "@/DTO/output";

export class RegistrationBodyDto {
    name: string;
    language: string;
    password: string;
    email: string;
}

//---Redis---
export class SetRegistrationDto extends RegistrationBodyDto {
    emailCode: string;
}

//---------
export class RegistrationOutputDto extends Output {
    payload: {
        confirmationToken: string;
    };
}
