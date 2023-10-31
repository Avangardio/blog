export class ConfirmationEntityDto {
  requestType: 'confirmation';
  name: string;
  language: string;
  password: string;
  email: string;
  emailCode: string;
  token: string;
}

export class RestorationEntityDto {
  userid: string;
  requestType: 'restoration';
  emailCode: string;
  token: string;
  email: string;
  language: string;
}

export type RequestEntity = ConfirmationEntityDto | RestorationEntityDto;
export type RequestType = RequestEntity['requestType'];
