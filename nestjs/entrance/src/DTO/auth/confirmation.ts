import Output from "@/DTO/output";

export class ConfirmationBodyDto {
  confirmationToken: string;
  emailCode: string;
}
export class ConfirmationOutputDto extends Output {
  payload: {
    username: string;
  };
}
