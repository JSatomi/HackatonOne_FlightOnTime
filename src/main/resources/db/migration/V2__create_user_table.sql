-- Tabla User
CREATE TABLE user (
                      id INT(11) AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(255),
                      firstname VARCHAR(255),
                      lastname VARCHAR(255),
                      password VARCHAR(255),
                      role ENUM('SUPERVISOR', 'ADMIN', 'USER'),
                      username VARCHAR(255)
);