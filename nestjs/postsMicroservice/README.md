# BBlog Микросервис постов

## Навигация по проекту
• [Главная](https://github.com/Avangardio/blog/tree/master)

• [Апи-Сервер](https://github.com/Avangardio/blog/tree/master/nestjs/entrance)

• [Почтовый микросервис](https://github.com/Avangardio/blog/tree/master/nestjs/mailMicroservice)

• [Микросервис пользователей](https://github.com/Avangardio/blog/tree/master/nestjs/authMicroservice)

• [Микросервис постов](https://github.com/Avangardio/blog/tree/master/nestjs/postsMicroservice) - [Вы здесь]

• [Микросервис медиа](https://github.com/Avangardio/blog/tree/master/nestjs/mediaMicroservice)

• [Фронтэнд](https://github.com/Avangardio/blog/tree/master/blog-f)


## Описание
Микросервис приложения BBlog, технодемо типичного блога.

Микросервис отвечает за операции по созданию, удалению, поиску поста, постов, с учетом критериев и без

## Запуск
```
npm run start # Стандартный запуск
```

## Эндпоинты
```typescript
@MessagePattern('createPost') - создать пост
Принимает:
  userId: number;
    newPostData: {
      title: string;
      description: string;
      texts: string;
      tags: string[];
      picture: string;
    };

@MessagePattern('findExactPost') - найти пост
Принимает:
  postId: number;
    
@MessagePattern('deletePost') - удаление поста
Принимает:
  postId: number;
  userId: number;

@MessagePattern('findPosts') - найти посты для топика
Принимает:
  page: number;
        criteria?: {
          title?: string;
          tags?: string[];
          authorId?: number;
  };

@MessagePattern('findPopularPosts') - найти популярные посты
```

## Тесты
Микросервис покрыт юнит тестами:
```
npm run test:unit
```
<img src="https://img001.prntscr.com/file/img001/K7hCf1dbTGCrBWL7ZfsP7A.png"/>
Интеграционными тестами:

```
npm run test:integration
```
<img src="https://img001.prntscr.com/file/img001/oSQPOdb4SaS3EbtZd0MgZg.png">
