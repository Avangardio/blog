class Output {
  code: number;
  isSucceed: boolean;
  message: string;
  payload: Record<any, any>;
}
//----------------registration-----------------//
export class RegistrationBodyDto {
  name: string;
  language: string;
  password: string;
  email: string;
}
export class SetRegistrationDto extends RegistrationBodyDto {
  emailCode: string;
}
export class RegistrationOutputDto extends Output {
  payload: {
    confirmationToken: string;
  };
}
//----------------registration-----------------//
