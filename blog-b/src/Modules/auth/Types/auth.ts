declare type NameField = {
  name: string;
};
declare type LanguageField = {
  language: string;
};
declare type PasswordField = {
  password: string;
};
declare type EmailField = {
  email: string;
};
export class RegistrationBodyDto
  implements NameField, EmailField, PasswordField, LanguageField
{
  name: string;
  language: string;
  password: string;
  email: string;
}
