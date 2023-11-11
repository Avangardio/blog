# Используем официальный образ Node.js как базовый образ
FROM node:20-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build


# Команда для запуска приложения при старте контейнера
CMD ["npm", "run" ,"start"]
