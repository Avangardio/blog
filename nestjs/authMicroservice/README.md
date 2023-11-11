# BBlog Микросервис пользователей

## Навигация по проекту
• [Главная](https://github.com/Avangardio/blog/tree/master)


• [Апи-Сервер](https://github.com/Avangardio/blog/tree/master/nestjs/entrance)

• [Почтовый микросервис](https://github.com/Avangardio/blog/tree/master/nestjs/mailMicroservice)

• [Микросервис пользователей](https://github.com/Avangardio/blog/tree/master/nestjs/authMicroservice) - [Вы здесь]

• [Микросервис постов](https://github.com/Avangardio/blog/tree/master/nestjs/postsMicroservice)

• [Микросервис медиа](https://github.com/Avangardio/blog/tree/master/nestjs/mediaMicroservice)

• [Фронтэнд](https://github.com/Avangardio/blog/tree/master/blog-f)


## Описание
Микросервис приложения BBlog, технодемо медиа блога, вдохновленный хабром и vc.

Микросервис отвечает за операции по созданию, логину, аутентификации и прочее взаимодействие с аккаунтами пользователей.

## Запуск
```
npm run start # Стандартный запуск
```

## Эндпоинты
```typescript
@MessagePattern('registration') - регистрация пользователя
Принимает:
    name: string;
    language: string;
    password: string;
    email: string;

@MessagePattern('confirmation') - потдверждение почты
Принимает:
  confirmationToken: string;
  emailCode: string;
  
@MessagePattern('login') - логин
Принимает:
  email: string;
  password: string;

@MessagePattern('restoration') - запрос на восстановление пароля
Принимает:
  email: string;

@MessagePattern('validateRequest') - проверка кода с почты
Принимает:
  confirmationToken: string;
  emailCode: string;

@MessagePattern('validateUserid') - проверка айди пользователя
Принимает:
  number

@MessagePattern('setNewPassword') - установка нового пароля
Принимает:
  password: string;
  re_password: string;
  confirmationToken: string;
  emailCode: string;
```

## Тесты
Микросервис покрыт юнит тестами:
```
npm run test:unit
```
<img src="https://img001.prntscr.com/file/img001/fK3dkqXiQfKCNEt9u3oHAg.png"/>
Интеграционными тестами:

```
npm run test:integration
```
<img src="https://img001.prntscr.com/file/img001/0SxjDSzBRoC-sr58iRIt1A.png">
