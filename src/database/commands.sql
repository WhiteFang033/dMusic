CREATE TABLE users(
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(50) NOT NULL,
	first_name TEXT,
	last_name TEXT,
	email TEXT,
	password VARCHAR(50) NOT NULL,
	roll_no BIGINT
);
