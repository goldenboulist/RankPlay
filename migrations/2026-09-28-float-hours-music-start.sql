-- Hours played as decimal numbers + music start timecode (seconds).
-- Run once on the existing database: node --env-file=.env scripts/migrate.mjs <this file>

ALTER TABLE games
  MODIFY COLUMN hours_played DOUBLE DEFAULT 0,
  ADD COLUMN music_start DOUBLE NULL AFTER music_url;

ALTER TABLE media
  ADD COLUMN music_start DOUBLE NULL AFTER music_url;
