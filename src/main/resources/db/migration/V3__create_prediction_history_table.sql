-- Tabla Prediction History
CREATE TABLE prediction_history (
                                    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
                                    airline VARCHAR(255),
                                    created_at DATETIME(6),
                                    departure_date DATETIME(6),
                                    destination VARCHAR(255),
                                    distance_km INT(11),
                                    origin VARCHAR(255),
                                    prevision VARCHAR(255),
                                    probabilidad DOUBLE,
                                    name_id INT(11)
);