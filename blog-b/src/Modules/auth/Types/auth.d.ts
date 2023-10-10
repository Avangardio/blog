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

declare interface IRegistrationBody
  extends NameField,
    EmailField,
    PasswordField,
    LanguageField {}
