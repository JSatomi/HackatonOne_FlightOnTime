# ✈️ FlightOnTime

FlightOnTime es una solución Full-Stack diseñada para la predicción de retrasos en vuelos. Integra modelos de Machine Learning,
Backend seguro con JWT y una interfaz de usuario moderna construida en React.

El objetivo del sistema es permitir que un usuario autenticado pueda **predecir si un vuelo saldrá a tiempo o con retraso**, así como
**consultar su historial de predicciones**.

---

## Descripción general

FlightOnTime nace como una solución predictiva para el sector de **Aviación Civil / Logística / Transporte Aéreo**, donde aborda el problema de
puntualidad es un factor crítico para la eficiencia operativa para aerolíneas, aeropuertos y pasajeros.

El sistema consume información de vuelos y, mediante un modelo predictivo, estima la probabilidad de retraso. Todo el flujo está protegido mediante autenticación JWT.

---

## Arquitectura del proyecto

El proyecto sigue una arquitectura **cliente‑servidor** bien definida:

```
El proyecto sigue una arquitectura cliente‑servidor desacoplada:

[ Frontend: React ] <─── HTTP/JSON/JWT ───> [ Backend: Spring Boot ]
       │                                            │
       ▼                                            ▼
[ Tailwind CSS ]                               [ DB: MySQL ]

[ Backend: Spring Boot ] ── API REST ──> [ Cloud ML Model ]

```

---

## Frontend

### Tecnologías

- ![Axios](https://ziadoua.github.io/m3-Markdown-Badges/badges/Axios/axios1.svg)
- ![JavaScript](https://ziadoua.github.io/m3-Markdown-Badges/badges/Javascript/javascript3.svg)
- ![React](https://ziadoua.github.io/m3-Markdown-Badges/badges/React/react1.svg)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
- ![Tailwind CSS](https://ziadoua.github.io/m3-Markdown-Badges/badges/TailwindCSS/tailwindcss1.svg)
- ![Vite](https://ziadoua.github.io/m3-Markdown-Badges/badges/ViteJS/vitejs1.svg)

### Funcionalidades

- Login de usuario
- Registro de usuario
- Rutas protegidas (JWT)
- Predicción de vuelos
- Historial de predicciones
- Manejo de errores (401, credenciales inválidas)

### Estructura principal

```
src/
├── components/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── History.jsx
│   └── Prediction.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── predictionService.js
│   └── userService.js
├── routes/
│   └── ProtectedRoute.jsx
└── main.jsx
```

---

## Backend

### Tecnologías

- ![Java](https://ziadoua.github.io/m3-Markdown-Badges/badges/Java/java1.svg)
- ![JWT](https://ziadoua.github.io/m3-Markdown-Badges/badges/JWT/jwt1.svg)
- ![MYSQL](https://ziadoua.github.io/m3-Markdown-Badges/badges/MySQL/mysql1.svg)
- ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?logo=spring&logoColor=white&style=for-the-badge)
- JPA / Hibernate
- Spring Security

### Funcionalidades

- Autenticación y registro de usuarios
- Generación y validación de JWT
- Endpoints protegidos
- Registro de predicciones por usuario
- Consulta de historial personal

### Estructura principal

```
  src/main/java/com.hackaton.one/
├── auth/                # Controladores y servicios de autenticación (Login/Registro)
├── configuration/       # Configuraciones de Seguridad, CORS y Clientes API Externos
├── controller/          # Endpoints REST de la aplicación (Prediction, User)
├── dto/                 # Objetos de Transferencia de Datos (Request/Response)
├── error/               # Manejo global de excepciones y respuestas de error personalizadas
├── jwt/                 # Lógica de filtros, generación y validación de tokens JWT
├── mappers/             # Conversión entre Entidades (Modelos) y DTOs
├── model/               # Entidades de JPA que representan las tablas en MySQL
├── repositories/        # Interfaces de Spring Data JPA para acceso a la base de datos
└── service/             # Lógica de negocio principal y comunicación con IA
```

---

#### Componentes clave

- auth/: Gestiona el flujo de entrada al sistema, integrando AuthService para la validación de credenciales.
- configuration/: Incluye SecurityConfiguration para definir qué rutas son públicas o privadas, y WebClienteMLConfig para la conexión con la nube.
- dto/: Clases como PredictionRequestDTO aseguran que solo se reciban y envíen los datos necesarios, protegiendo la integridad de la base de datos.
- jwt/: El JwtAuthenticationFilter intercepta cada petición para validar la identidad del usuario antes de permitir el acceso.
  resources/:
- db.migration/: Contiene scripts flyway para el versionado de la base de datos.
- application.properties: Configuración central de puertos, base de datos y llaves secretas.

## Seguridad

- Autenticación basada en JWT
- Protección de rutas en Frontend y Backend
- Interceptor Axios para envío automático del token

Ejemplo de Header enviado:

```
Authorization: Bearer <token>
```

---

## ![Docker](https://ziadoua.github.io/m3-Markdown-Badges/badges/Docker/docker3.svg)

El proyecto está preparado para ejecutarse mediante **Docker** ya que esta completamente dockerizado, garantizando su despliegue y portabilidad en cualquier entorno de manera idéntica.

Incluye:

- Contenedor para el Backend (Java)
- Contenedor para la Base de Datos (Imagen oficial de MySQL 8 configurada con persistencia de datos)
- Contenedor para el Frontend (React (Vite))
- Configuración lista para docker-compose

---

## Instalación y ejecución

La forma más rápida de ejecutar el proyecto completo es usando Docker Compose:

Clonar el repositorio:

```bash
git clone https://github.com/JSatomi/HackatonOne_FlightOnTime.git
cd HackatonOne_FlightOnTime
```

Levantar servicios:

```Bash
docker-compose up --build
```

Endpoints locales:

*Frontend: http://localhost:5173
*Backend API: http://localhost:8080

### Backend

```bash
mvn clean package
docker build -t flightontime-backend .
docker run -p 8080:8080 flightontime-backend
```

### Frontend

```bash
npm install
npm run dev
```

## Alternativa Online

El proyecto ha sido desplegado utilizando una arquitectura de microservicios distribuida para garantizar escalabilidad y separación de responsabilidades:

### 🌐 Backend For Frontend (BFF)

Servidor robusto desarrollado en **Spring Boot** y desplegado en una instancia de **Oracle Cloud Infrastructure (OCI)**. Se encarga de la seguridad (JWT), gestión de historial de vuelos y orquestación de datos.

- **URL de acceso:** [http://149.130.177.229:8080/](http://149.130.177.229:8080/)
  - **Usuario**: testuser

  - **password**: test123\*

- **Frontend Integrado:** La interfaz de usuario en **React + Tailwind CSS** se sirve como contenido estático desde este microservicio.

### Capa de Datos

- **Motor**: MySQL 8.0.

- **Rol**: Persistencia de usuarios y trazabilidad del historial de predicciones.

### 🤖 Microservicio de Predicción (IA/ML)

API especializada en ciencia de datos que consume modelos de Machine Learning para predecir retrasos aéreos con alta precisión.

- **Host:** [Hugging Face Spaces](https://huggingface.co/spaces)

- **Endpoint:** [https://stonedjjh-flight-prediction-api.hf.space/](https://stonedjjh-flight-prediction-api.hf.space/)

---

Frontend: Aplicación SPA desarrollada en React + Tailwind CSS, integrada como recursos estáticos dentro del BFF para optimizar el despliegue.

---

## 📊 Flujo de uso

1. El usuario se registra
2. Inicia sesión
3. Se genera un JWT
4. Accede al Dashboard
5. Realiza una predicción
6. Consulta su historial

---

## Manejo de errores

- **401 Unauthorized**: Token inválido o no enviado
- **Credenciales incorrectas**: Login fallido
- Validaciones de formulario en frontend

---

## Objetivo del proyecto

Este proyecto fue desarrollado con un enfoque **profesional y educativo**, integrando buenas prácticas de:

- Arquitectura full‑stack
- Seguridad
- Separación de responsabilidades
- Código mantenible

---

## Autor

Jorge Satomi Minami Aguilera – Ingeniero Mecatrónico | Desarrollador Backend & frontend
Daniel Jimenez – Desarrollador Full-Stack | DevOps – Colaboración clave en diseño del Frontend,
Dockerización del ecosistema y despliegue del modelo de ML en la nube.

---

## Estado del proyecto

En desarrollo / mejoras continuas

Próximos hitos:

- Mejorar modelo predictivo
- Métricas de precisión
- Despliegue en la nube
- Implementacion de gráficas avanzadas en el Dashboard
- UI/UX enhancements
- Despligue completo del frontend en servicions cloud (Vercel/OCI/AWS)

---

✨ _FlightOnTime — prediciendo el futuro de los vuelos_ ✨
