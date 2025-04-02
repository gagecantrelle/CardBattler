CREATE DATABASE IF NOT EXISTS cardBattle;

USE cardBattle;

CREATE Table IF NOT EXISTS user (
  id INT PRIMARY KEY AUTO_INCREMENT ,
  user_name VARCHAR (255),
  google_id VARCHAR (225),
  ligthOrDark BOOLEAN
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