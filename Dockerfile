# --- ETAPA 1: Build del Frontend ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/front
# Copiamos archivos de dependencias
COPY front/package*.json ./
RUN npm install
# Copiamos el resto del código del front y construimos
COPY front/ ./
RUN npm run build

# --- ETAPA 2: Build del Backend (Donde ocurre la magia) ---
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app

# 1. Copiamos el código fuente del backend primero
COPY pom.xml .
COPY src ./src

# 2. IMPORTANTE: Copiamos el build del front a la carpeta de recursos ANTES de compilar
# Esto hace que el frontend se incluya DENTRO del .jar automáticamente
COPY --from=frontend-build /app/front/dist /app/src/main/resources/static

# 3. Compilamos el JAR con el front ya integrado
RUN mvn clean package -DskipTests

# --- ETAPA 3: Imagen Final ---
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Solo necesitamos el JAR, ya que tiene todo adentro
COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]