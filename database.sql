CREATE DATABASE IF NOT EXISTS cardBattle;

USE cardBattle;


CREATE Table IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT ,
  user_name VARCHAR (255),
  google_id VARCHAR (225), 
  lightOrDark BOOLEAN,
  cardColor VARCHAR (225),
  google_avatar VARCHAR (2083)
);

CREATE Table IF NOT EXISTS gameRPS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    highScore INT,
    win INT,
    lose INT, 
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE Table IF NOT EXISTS gameBJ (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    highScore INT,
    win INT,
    lose INT, 
    FOREIGN KEY (user_id) REFERENCES user (id)
);