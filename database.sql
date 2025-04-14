CREATE DATABASE IF NOT EXISTS cardBattle;

USE cardBattle;

-- ALTER TABLE users
-- ADD CONSTRAINT unique_google_id UNIQUE (google_id);

CREATE Table IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT ,
  user_name VARCHAR (255),
  google_id VARCHAR (225), --add unique back later, serve crash because it trying to run the code two time
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