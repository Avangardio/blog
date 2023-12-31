import Output from "@/DTO/auth/auth";
import {ApiProperty} from "@nestjs/swagger";

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
