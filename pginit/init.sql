
-- Создание таблицы "users"
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    myPosts INT[] DEFAULT ARRAY[]::INT[]
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