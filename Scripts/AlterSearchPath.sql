-- Permanently set search_path to user_services
-- Correct genre(table) and genre(column) confusion

\c twiggs_reviews

ALTER DATABASE twiggs_reviews SET SEARCH_PATH TO user_services;

ALTER TABLE IF EXISTS user_services.genre
	RENAME COLUMN IF EXISTS genre TO name;

