DROP DATABASE IF EXISTS PIGEON;
CREATE DATABASE PIGEON;
USE PIGEON;

/*TABLES*/
CREATE TABLE USERS(
ID_USER INTEGER NOT NULL AUTO_INCREMENT,
NAME VARCHAR(50) NOT NULL,
LASTNAME VARCHAR(50) NOT NULL,
USERNAME VARCHAR(20) NOT NULL,
PASSWORD VARCHAR(50) NOT NULL,
EMAIL VARCHAR (50) NOT NULL,
IMAGE VARCHAR(50) NOT NULL,
PRIMARY KEY(ID_USER)
);

CREATE TABLE CHANNELS(
ID_CHANNEL INTEGER NOT NULL AUTO_INCREMENT,
NAME VARCHAR(50) NOT NULL,
IMAGE VARCHAR(50) NOT NULL,
CREATION_DATE DATE NOT NULL,
PRIMARY KEY(ID_CHANNEL)
);

CREATE TABLE BELONGS_TO(
ID_CHANNEL INTEGER NOT NULL,
ID_USER INTEGER NOT NULL,
FOREIGN KEY(ID_CHANNEL) REFERENCES CHANNELS(ID_CHANNEL),
FOREIGN KEY(ID_USER) REFERENCES USERS(ID_USER),
PRIMARY KEY(ID_CHANNEL,ID_USER)
);

CREATE TABLE MESSAGES(
ID_MESSAGE INTEGER NOT NULL AUTO_INCREMENT,
TEXT VARCHAR(512) NOT NULL,
SEND_DATE DATETIME NOT NULL,
ID_SENDER INTEGER NOT NULL,
ID_CHANNEL INTEGER NOT NULL,
TYPE ENUM("TEXT","IMAGE") NOT NULL,
PRIMARY KEY(ID_MESSAGE),
FOREIGN KEY(ID_SENDER) REFERENCES USERS(ID_USER),
FOREIGN KEY(ID_CHANNEL) REFERENCES CHANNELS(ID_CHANNEL)
);

/*INSERT*/
INSERT INTO USERS VALUES(1,"MICKEY","MOUSE", "THEGOODFELLA","***","G@G.COM","MM.JPG"),(2,"DONALD","DUCK","SUPERBONNY","****","DD@DD","DD.JPG"),(3,"SCROOGE","MCDUCK","ADYXXX5","**","SM@SM","SM.JPG"),(4,"PAPEROPOLI","PAPII","PAPERINO","**","PP@PP","PP.JPG");
INSERT INTO CHANNELS VALUES(1,"CHAT1","CHAT1.JPG","2016-03-20"),(2,"CHAT2","CHAT2.JPG","2016-03-19");
INSERT INTO BELONGS_TO VALUES(1,1),(1,2),(2,2),(2,3),(1,4);
INSERT INTO MESSAGES VALUES(1,"HEY","2016-03-20 10:57:00",1,1,"TEXT"),(2,"WHATS UP?","2016-03-20 10:59:21",2,1,"TEXT"),(3,"HI GUYS","2016-03-20 11:02:31",3,2,"TEXT");

/*QUERIES*/

/*SHOW ALL CHANNELS*/
DELIMITER //
CREATE PROCEDURE SHOW_ALL_CHANNELS()
BEGIN
	SELECT CHANNELS.ID_CHANNEL FROM CHANNELS;
END //
DELIMITER ;

/*SELECT MESSAGES IDs FROM A CHANNEL BY ID_CHANNEL*/
DELIMITER //
CREATE PROCEDURE MESSAGE_CHANNEL( _ID INTEGER)
BEGIN
	SELECT MESSAGES.ID_MESSAGE FROM MESSAGES JOIN CHANNELS ON MESSAGES.ID_CHANNEL=CHANNELS.ID_CHANNEL WHERE CHANNELS.ID_CHANNEL=_ID;
END //
DELIMITER ;

/*SELECT MESSAGE TEXT BY MESSAGE ID*/
DELIMITER //
CREATE PROCEDURE MESSAGE_TEXT_BY_MESSAGE_ID(_ID INTEGER)
BEGIN
	SELECT MESSAGES.TEXT FROM MESSAGES WHERE MESSAGES.ID_MESSAGE=_ID;
END //
DELIMITER ;

/*SELECT HOW MANY MESSAGES A USER HAS SENT*/
DELIMITER //
CREATE PROCEDURE COUNT_MESSAGE( _ID_USER INTEGER)
BEGIN
	SELECT COUNT(*) FROM MESSAGES WHERE MESSAGES.ID_SENDER=_ID_USER;
END //
DELIMITER ;

/*SELECT USERS SUBSCRIBED TO A CHANNEL*/
DELIMITER //
CREATE PROCEDURE USER_IN_CHANNEL( _ID_CHANNEL INTEGER)
BEGIN
	SELECT BELONGS_TO.ID_USER FROM BELONGS_TO WHERE BELONGS_TO.ID_CHANNEL=_ID_CHANNEL;
END //
DELIMITER ;

/*SELECT USERNAME OF A USER BY ID*/
DELIMITER //
CREATE PROCEDURE USERNAME_BY_ID(_ID INTEGER)
BEGIN
	SELECT USERS.USERNAME FROM USERS WHERE USERS.ID_USER=_ID;
END //
DELIMITER ;

/*CREATE A SQL USER TO REMOTELY ACCESS THE DB*/
GRANT ALL ON `PIGEON`.* to 'pigeon'@'%' identified by 'pigeon';
