-- OpenKIE Database Schema

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  site_name TEXT NOT NULL DEFAULT 'OpenKIE',
  site_description TEXT NOT NULL DEFAULT 'Platform edukasi digital',
  whatsapp_number TEXT NOT NULL DEFAULT '',
  whatsapp_message_template TEXT NOT NULL DEFAULT 'Halo, saya ingin bertanya.',
  quiz_enabled BOOLEAN NOT NULL DEFAULT false,
  highlight_title TEXT NOT NULL DEFAULT '',
  education_title TEXT NOT NULL DEFAULT '',
  footer_text TEXT NOT NULL DEFAULT '',
  bg_color_from TEXT NOT NULL DEFAULT '#ffffff',
  bg_color_to TEXT NOT NULL DEFAULT '#ffffff',
  logo_url TEXT NOT NULL DEFAULT '',
  banner_url TEXT NOT NULL DEFAULT '',
  operating_hours_start TEXT NOT NULL DEFAULT '',
  operating_hours_end TEXT NOT NULL DEFAULT ''
);

CREATE TABLE highlights (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_id TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE education_materials (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT NOT NULL DEFAULT '',
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE education_media (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('preTest', 'postTest')),
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  correct_answer INT NOT NULL DEFAULT 0,
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  name TEXT NOT NULL,
  pre_test JSONB,
  post_test JSONB,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, phone)
);

-- Disable RLS (data access controlled by application layer)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE highlights DISABLE ROW LEVEL SECURITY;
ALTER TABLE education_materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE education_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE participants DISABLE ROW LEVEL SECURITY;
