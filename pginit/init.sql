
-- Создание таблицы "users"
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    hash TEXT NOT NULL,
    my_posts INT[] DEFAULT ARRAY[]::INT[],
    language VARCHAR(20) DEFAULT 'EN',
    creation_time TIMESTAMPTZ DEFAULT CURRENT_DATE
);
-- Создание таблицы "posts"
CREATE TABLE posts (
    postId SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    authorId INT NOT NULL REFERENCES users(userId),
    texts INT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    cTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы "views"
CREATE TABLE views (
    postId INT PRIMARY KEY REFERENCES posts(postId),
    views INT NOT NULL DEFAULT 0
);