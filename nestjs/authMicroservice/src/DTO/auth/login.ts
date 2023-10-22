import Output from "@/DTO/auth/auth";

export class LoginBodyDto {
  email: string;
  password: string;
}

export class LoginOutputDto extends Output {
  payload: {
    username: string;
    userid: number;
  };
}
