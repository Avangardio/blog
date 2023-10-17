import Output from '@/DTO/auth/auth';

export class RestorationBodyDto {
  email: string;
  emailCode: string;
}

export class RestorationOutputDto extends Output {
  payload: {
    confirmationToken: string;
  };
}
