CREATE DATABASE friend_finder;

USE friend_finder;

-- your questions table should have all of the question: id, question
DROP TABLE questions;
CREATE TABLE questions (
	id			TINYINT UNSIGNED 	NOT NULL AUTO_INCREMENT,
	question 	VARCHAR(255)		NOT NULL,
	PRIMARY KEY (id)
) 	ENGINE=INNODB ;

-- your friends table should have id, name, picture_link
DROP TABLE friends;
CREATE TABLE friends (
	id				TINYINT UNSIGNED  NOT NULL AUTO_INCREMENT,
	friend_name		VARCHAR(255),
	picture_link 	VARCHAR(255),
	PRIMARY KEY (id)
) 	ENGINE=INNODB ;

-- your scores table should have id, question_id, friend_id, score
DROP TABLE scores;
CREATE TABLE scores (
	id				INT UNSIGNED  NOT NULL AUTO_INCREMENT,
	question_id		TINYINT UNSIGNED  NOT NULL,
	friend_id 		TINYINT UNSIGNED  NOT NULL,
	scores			INT	NOT NULL,
	
	PRIMARY KEY (id),
	
	FOREIGN KEY (question_id) REFERENCES questions (id)
		ON UPDATE CASCADE ON DELETE CASCADE ,
	FOREIGN KEY (friend_id) REFERENCES friends (id)
		ON UPDATE CASCADE ON DELETE CASCADE  
) ENGINE=INNODB ;
