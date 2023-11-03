import Output from '@/DTO/output';

export class SetNewPasswordBodyDto {
    password: string;
    re_password: string;
    confirmationToken: string;
    emailCode: string;
}

export class SetNewPasswordOutputDto extends Output {
    payload?: never;
}
