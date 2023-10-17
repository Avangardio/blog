export class ConfirmationEntityDto {
  requestType: 'confirmation';
  name: string;
  language: string;
  password: string;
  email: string;
  emailCode: string;
}
export type ConfirmationEntityType = InstanceType<typeof ConfirmationEntityDto>