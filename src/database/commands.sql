-- Creating the user table

CREATE TABLE users(
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(50) NOT NULL,
	first_name TEXT,
	last_name TEXT,
	email TEXT,
	password VARCHAR(50) NOT NULL,
	roll_no BIGINT
);

-- Creating the playlist table
CREATE TABLE playlists(
	id SERIAL,
	playlist_name TEXT,
	username TEXT,
	PRIMARY KEY(playlist_name, username),
	FOREIGN KEY(username) REFERENCES users(username)
);

-- Creating table to store songs playlist wise

CREATE TABLE playlist_songs(
	id SERIAL,
	username TEXT,
	playlist_name TEXT,
	song_name TEXT,
	artist TEXT,
	PRIMARY KEY(playlist_name, username, song_name),
	FOREIGN KEY(username) REFERENCES users(username),
	FOREIGN KEY(song_name) REFERENCES song_list(name)
);


-- Command to fetch playlist songs
SELECT song_list.name, song_list.artist, song_list.src, playlist_songs.playlist_name, playlist_songs.username 
FROM song_list
INNER JOIN playlist_songs ON playlist_songs.song_name = song_list.name AND playlist_songs.username = 'username' AND playlist_songs.playlist_name = 'playlistName	'
