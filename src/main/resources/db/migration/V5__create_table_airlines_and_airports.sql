
-- Tabla de Aeropuertos (Origen/Destino)
CREATE TABLE airports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    iata_code VARCHAR(3) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL
);

-- Datos iniciales (Ejemplos)
INSERT INTO airlines (code, name) VALUES ('DL', 'Delta Airlines'), ('AA', 'American Airlines'), ('UA', 'United Airlines');
INSERT INTO airports (iata_code, city) VALUES ('LGA', 'New York'), ('TPA', 'Tampa'), ('LAX', 'Los Angeles');