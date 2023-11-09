# BBlog Микросервис почты

## Навигация по проекту
• [Главная](https://github.com/Avangardio/blog/tree/master)

• [Апи-Сервер](https://github.com/Avangardio/blog/tree/master/nestjs/entrance)

• [Почтовый микросервис](https://github.com/Avangardio/blog/tree/master/nestjs/mailMicroservice) - [Вы здесь]

• [Микросервис пользователей](https://github.com/Avangardio/blog/tree/master/nestjs/authMicroservice)

• [Микросервис постов](https://github.com/Avangardio/blog/tree/master/nestjs/postsMicroservice)

• [Микросервис медиа](https://github.com/Avangardio/blog/tree/master/nestjs/mediaMicroservice)

• [Фронтэнд](https://github.com/Avangardio/blog/tree/master/blog-f)


## Описание
Микросервис приложения BBlog, технодемо типичного блога.

Микросервис отвечает за операции отправке почты клиентам

## Запуск
```
npm run start # Стандартный запуск
```

## Эндпоинты
```typescript
  @MessagePattern('sendConfirmationEmail') - отправка письма подтверждения
Принимает:
    name: string;
    language: string;
    email: string;
    emailCode: string;
    token: string;

  @MessagePattern('sendRestorationEmail') - отправка письма восстановления
    emailCode: string;
    token: string;
    email: string;
    language: string;
```