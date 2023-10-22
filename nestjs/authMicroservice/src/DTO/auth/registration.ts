import Output from "@/DTO/auth/auth";
import { ApiProperty } from "@nestjs/swagger";

export class RegistrationBodyDto {
  @ApiProperty({ description: "Имя пользователя", default: "MyUsername" })
  name: string;
  @ApiProperty({ description: "Язык пользователя", default: "RU" })
  language: string;
  @ApiProperty({ description: "Пароль пользователя", default: "Qwerty1234" })
  password: string;
  @ApiProperty({ description: "Имейл пользователя", default: "test@gmail.com" })
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
