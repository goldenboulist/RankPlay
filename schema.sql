-- RankPlay — MySQL schema
-- MySQL 8.0.13+ required (DEFAULT (UUID()) syntax)

CREATE DATABASE IF NOT EXISTS rankplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rankplay;

CREATE OR REPLACE TABLE users (
  id          VARCHAR(36)  NOT NULL DEFAULT (UUID()),
  email       VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
);

CREATE OR REPLACE TABLE games (
  id           VARCHAR(36)   NOT NULL DEFAULT (UUID()),
  user_id      VARCHAR(36)   NOT NULL,
  title        VARCHAR(200)  NOT NULL,
  cover_url    VARCHAR(2000),
  release_date VARCHAR(20),
  hours_played INT DEFAULT 0,
  genre        VARCHAR(80),
  platform     VARCHAR(80),
  music_url    VARCHAR(2000),
  notes        TEXT,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_games_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE categories (
  id          VARCHAR(36)    NOT NULL DEFAULT (UUID()),
  user_id     VARCHAR(36)    NOT NULL,
  name        VARCHAR(60)    NOT NULL,
  icon        VARCHAR(60),
  is_default  TINYINT(1)     NOT NULL DEFAULT 0,
  sort_order  INT            NOT NULL DEFAULT 99,
  coefficient DECIMAL(4, 2)  NOT NULL DEFAULT 1.00,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_categories_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE favorites (
  user_id    VARCHAR(36) NOT NULL,
  game_id    VARCHAR(36) NOT NULL,
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_id),
  CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_fav_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE ratings (
  id          VARCHAR(36)    NOT NULL DEFAULT (UUID()),
  user_id     VARCHAR(36)    NOT NULL,
  game_id     VARCHAR(36)    NOT NULL,
  category_id VARCHAR(36)    NOT NULL,
  score       DECIMAL(4, 1)  NOT NULL,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_rating (game_id, category_id),
  CONSTRAINT fk_ratings_user     FOREIGN KEY (user_id)     REFERENCES users      (id) ON DELETE CASCADE,
  CONSTRAINT fk_ratings_game     FOREIGN KEY (game_id)     REFERENCES games      (id) ON DELETE CASCADE,
  CONSTRAINT fk_ratings_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

-- ── Movies & Series ────────────────────────────────────────────────────────────

CREATE OR REPLACE TABLE media (
  id           VARCHAR(36)             NOT NULL DEFAULT (UUID()),
  user_id      VARCHAR(36)             NOT NULL,
  title        VARCHAR(200)            NOT NULL,
  media_type   ENUM('movie','series')  NOT NULL DEFAULT 'movie',
  cover_url    VARCHAR(2000),
  release_date VARCHAR(20),
  music_url    VARCHAR(2000),
  notes        TEXT,
  created_at   TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE categories_media (
  id          VARCHAR(36)   NOT NULL DEFAULT (UUID()),
  user_id     VARCHAR(36)   NOT NULL,
  name        VARCHAR(60)   NOT NULL,
  icon        VARCHAR(60),
  is_default  TINYINT(1)    NOT NULL DEFAULT 0,
  sort_order  INT           NOT NULL DEFAULT 99,
  coefficient DECIMAL(4, 2) NOT NULL DEFAULT 1.00,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_categories_media_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE media_ratings (
  id          VARCHAR(36)   NOT NULL DEFAULT (UUID()),
  user_id     VARCHAR(36)   NOT NULL,
  media_id    VARCHAR(36)   NOT NULL,
  category_id VARCHAR(36)   NOT NULL,
  score       DECIMAL(4, 1) NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_media_rating (media_id, category_id),
  CONSTRAINT fk_media_ratings_user     FOREIGN KEY (user_id)     REFERENCES users           (id) ON DELETE CASCADE,
  CONSTRAINT fk_media_ratings_media    FOREIGN KEY (media_id)    REFERENCES media            (id) ON DELETE CASCADE,
  CONSTRAINT fk_media_ratings_category FOREIGN KEY (category_id) REFERENCES categories_media (id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE media_favorites (
  user_id    VARCHAR(36) NOT NULL,
  media_id   VARCHAR(36) NOT NULL,
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, media_id),
  CONSTRAINT fk_media_fav_user  FOREIGN KEY (user_id)  REFERENCES users  (id) ON DELETE CASCADE,
  CONSTRAINT fk_media_fav_media FOREIGN KEY (media_id) REFERENCES media  (id) ON DELETE CASCADE
);
