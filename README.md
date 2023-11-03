### для запуска двух композеров

```shell
docker-compose -f docker-compose-base.yml up -d

docker-compose -f docker-compose-myjs.yml up -d
```

### для запуска с переменными

```shell
export POSTGRES_USER=myuser

export POSTGRES_PASSWORD=mypassword

export REDIS_PASSWORD=myredispassword

docker-compose up -d
```

### запуск отдельных

```shell
docker-compose up -d redis postgres

docker-compose up -d nestjs

docker-compose up -d nextjs
```

### посмотреть все контейнеры композера

```shell
docker-compose -f docker-compose-base.yml ps

несколько портов - "3000-300x:3000"

docker-compose up --scale nestjs-app=2
```

### очистка контейнеров

```shell
docker-compose -f docker-compose-base.yml down #просто закрыть все
docker-compose -f docker-compose-base.yml down -v #с полным удалением
```