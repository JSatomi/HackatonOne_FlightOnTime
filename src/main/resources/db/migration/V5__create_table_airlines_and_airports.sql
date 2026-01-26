-- 1. Crea la tabla solo si no existe
CREATE TABLE IF NOT EXISTS airports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    iata_code VARCHAR(3) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL
);

-- 2. Inserta las aerolíneas usando IGNORE para evitar errores si ya existen
INSERT IGNORE INTO airlines (code, name) 
VALUES ('DL', 'Delta Airlines'), 
       ('AA', 'American Airlines'), 
       ('UA', 'United Airlines');