// Shared domain types used across client and server.
import type { RowDataPacket } from "mysql2";

export interface DbUser extends RowDataPacket {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
}

export interface DbGame extends RowDataPacket {
  id: string;
  user_id: string;
  title: string;
  cover_url: string | null;
  release_date: string | null;
  music_url: string | null;
  notes: string | null;
  hours_played: number | null;
  created_at: string;
  updated_at: string;
}

export interface DbCategory extends RowDataPacket {
  id: string;
  user_id: string;
  name: string;
  icon: string | null;
  is_default: boolean;
  sort_order: number;
  coefficient: number;
  created_at: string;
}

export interface DbRating extends RowDataPacket {
  id: string;
  user_id: string;
  game_id: string;
  category_id: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface DbFavorite extends RowDataPacket {
  user_id: string;
  game_id: string;
  created_at: string;
}

export interface DbMusicEntry extends RowDataPacket {
  id: string;
  title: string;
  music_url: string;
}

// ── Media (Movies & Series) ────────────────────────────────────────────────────

export interface DbMedia extends RowDataPacket {
  id: string;
  user_id: string;
  title: string;
  media_type: "movie" | "series";
  cover_url: string | null;
  release_date: string | null;
  music_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbMediaCategory extends RowDataPacket {
  id: string;
  user_id: string;
  name: string;
  icon: string | null;
  is_default: boolean;
  sort_order: number;
  coefficient: number;
  created_at: string;
}

export interface DbMediaRating extends RowDataPacket {
  id: string;
  user_id: string;
  media_id: string;
  category_id: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface DbMediaFavorite extends RowDataPacket {
  user_id: string;
  media_id: string;
  created_at: string;
}