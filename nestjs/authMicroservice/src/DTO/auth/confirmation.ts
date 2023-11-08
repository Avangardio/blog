import Output from '@/DTO/auth/auth';

export class ConfirmationBodyDto {
  confirmationToken: string;
  emailCode: string;
}

export class ConfirmationOutputDto extends Output {
  payload: {
    username: string;
  };
}
