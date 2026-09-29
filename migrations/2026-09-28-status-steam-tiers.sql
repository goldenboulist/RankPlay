-- Play status, Steam link (recommendations), tier list placement.
-- Run once on the existing database: node --env-file=.env scripts/migrate.mjs <this file>

ALTER TABLE games
  ADD COLUMN status      ENUM('backlog','playing','completed','dropped') NULL AFTER platform,
  ADD COLUMN steam_appid INT UNSIGNED NULL AFTER status,
  ADD COLUMN steam_tags  VARCHAR(500) NULL AFTER steam_appid,
  ADD COLUMN tier        CHAR(1) NULL AFTER steam_tags,
  ADD COLUMN tier_pos    INT NULL AFTER tier,
  ADD INDEX idx_games_user_steam (user_id, steam_appid);
