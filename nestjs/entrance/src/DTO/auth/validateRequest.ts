import Output from "@/DTO/output";

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
