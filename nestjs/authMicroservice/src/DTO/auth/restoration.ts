import Output from "@/DTO/auth/auth";

export class RestorationBodyDto {
  email: string;
}

export class RestorationOutputDto extends Output {
  payload: {
    confirmationToken: string;
  };
}
