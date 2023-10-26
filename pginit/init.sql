
-- Создание таблицы "users"
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
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
    description TEXT NOT NULL,
    authorId INT NOT NULL REFERENCES users(userId),
    texts TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    cTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0
);
---лайки постов---
CREATE TABLE post_likes (
                            likeId SERIAL PRIMARY KEY,
                            postId INT REFERENCES posts(postId),
                            userId INT REFERENCES users(userId),
                            liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_post_likes_post_id ON post_likes(postId);
CREATE UNIQUE INDEX idx_post_likes_post_id_user_id ON post_likes(postId, userId);


---комментарии постов---
CREATE TABLE post_comments (
                            commentId SERIAL PRIMARY KEY,
                            postId INT REFERENCES posts(postId),
                            userId INT REFERENCES users(userId),
                            commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_post_comments_post_id ON post_comments(postId);
CREATE INDEX idx_post_comments_user_id ON post_comments(userId);
CREATE UNIQUE INDEX idx_post_comments_post_id_user_id ON post_comments(postId, userId);
---триггер на + счетчик лайков---
CREATE OR REPLACE FUNCTION increment_likes() RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET likes = likes + 1 WHERE postId = NEW.postId;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_likes
AFTER INSERT ON post_likes
FOR EACH ROW
EXECUTE FUNCTION increment_likes();
---триггер на - счетчик лайков---
CREATE OR REPLACE FUNCTION decrement_likes() RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET likes = likes - 1 WHERE postId = OLD.postId;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_decrement_likes
    AFTER DELETE ON post_likes
    FOR EACH ROW
EXECUTE FUNCTION decrement_likes();

---триггер на + счетчик комментариев---
CREATE OR REPLACE FUNCTION increment_comments() RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET comments = posts.comments + 1 WHERE postId = NEW.postId;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_comments
    AFTER INSERT ON post_comments
    FOR EACH ROW
EXECUTE FUNCTION increment_comments();
---триггер на - счетчик комментариев---
CREATE OR REPLACE FUNCTION decrement_comments() RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts SET comments = posts.comments - 1 WHERE postId = OLD.postId;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_comments
AFTER DELETE ON post_comments
FOR EACH ROW
EXECUTE FUNCTION decrement_comments();
