export class ConfirmationEntityDto {
  requestType: 'confirmation';
  name: string;
  language: string;
  password: string;
  email: string;
  emailCode: string;
}
export class RestorationEntityDto {
  requestType: 'restoration';
  email: string;
  emailCode: string;
}
export type RequestEntity = ConfirmationEntityDto | RestorationEntityDto;
