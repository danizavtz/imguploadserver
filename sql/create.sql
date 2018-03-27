CREATE TYPE gender AS ENUM('male','female');

CREATE TABLE userapp(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	surname VARCHAR(255),
	login VARCHAR(255),
	password BYTEA,
	bday DATE,
	gender GENDER,
	quote VARCHAR(255),
	email VARCHAR(255),
	profileimg BYTEA
);

CREATE TABLE fupload (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	originalname VARCHAR(255),
	encoding VARCHAR(15),
	mimetype VARCHAR(31)
    size INTEGER,
    originaldata BYTEA,
    user INTEGER REFERENCES userapp(id)
);