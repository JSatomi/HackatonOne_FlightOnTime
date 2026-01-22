# --- ETAPA 1: Construcción del Front (Node.js) ---
FROM node:alpine3.23 AS frontend-build
WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/ ./
RUN npm run build

# --- ETAPA 2: Construcción del Backend (Maven + Java 21) ---
# Usamos una imagen de Maven que soporte JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Compilamos el proyecto
RUN mvn clean package -DskipTests

# --- ETAPA 3: Imagen Final de Ejecución (JRE 21) ---
# Usamos una imagen ligera de Java 21 para correr la app
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiamos el JAR (ajusta el nombre si es necesario o usa el comodín)
COPY --from=backend-build /app/target/*.jar app.jar

# Copiamos los archivos estáticos del front a la carpeta de recursos de Spring
COPY --from=frontend-build /app/dist /app/src/main/resources/static

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]