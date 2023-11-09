# BBlog Микросервис медиа

## Навигация по проекту
• [Главная](https://github.com/Avangardio/blog/tree/master)

• [Апи-Сервер](https://github.com/Avangardio/blog/tree/master/nestjs/entrance)

• [Почтовый микросервис](https://github.com/Avangardio/blog/tree/master/nestjs/mailMicroservice)

• [Микросервис пользователей](https://github.com/Avangardio/blog/tree/master/nestjs/authMicroservice)

• [Микросервис постов](https://github.com/Avangardio/blog/tree/master/nestjs/postsMicroservice)

• [Микросервис медиа](https://github.com/Avangardio/blog/tree/master/nestjs/mediaMicroservice) - [Вы здесь]

• [Фронтэнд](https://github.com/Avangardio/blog/tree/master/blog-f)


## Описание
Микросервис приложения BBlog, технодемо типичного блога.

Микросервис отвечает за операции по созданию, удалению и поисков лайков и комментариев для постов

## Запуск
```
npm run start # Стандартный запуск
```

## Эндпоинты
```typescript
@MessagePattern('checkLike') - проверка лайка пользователем
Принимает:
    userId: number;
    postId: number;

@MessagePattern('like') - либо удаление, либо установка лайка на пост
Принимает:
  userId: number;
  postId: number;
  
@MessagePattern('getComments') - получить комментарии поста
Принимает:
  postId: number;

@MessagePattern('createComment') - создать комментарий на посте
Принимает:
  userId: number;
  postId: number;
  text: string;
  
@MessagePattern('deleteComment') - удалить комментарий на посте
Принимает:
  commentId: number;
  userId: number;
  postId: number;
```

## Тесты
Микросервис покрыт юнит тестами:
```
npm run test:unit
```
<img src="https://img001.prntscr.com/file/img001/HOqLcrznR7Ox72RoZ6mCzw.png"/>
Интеграционными тестами:

```
npm run test:integration
```
<img src="https://img001.prntscr.com/file/img001/vfYFyzogRfWZjKeLcRBtTQ.png">
