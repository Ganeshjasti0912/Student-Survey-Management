# Student Survey Management

A full-stack Student Survey Management application with:
- **Frontend:** React (Vite)
- **Backend:** Spring Boot (Java)
- **Features:** Create / View / Edit / Delete surveys

---

## Project Structure
```
.
├── backend/
│ └── survey_page/ # Spring Boot backend
└── frontend/ # React (Vite) frontend
```

---

## Prerequisites

Install these on your machine:
- **Node.js (LTS)** + npm
- **Java (JDK 17 recommended)**

---

## 1)Run Backend (Spring Boot)

From repo root:

```bash
cd backend/survey_page
mvn spring-boot:run
```

Backend runs at:

http://localhost:8080

## 2)Run Frontend (React)

Open a new terminal from repo root:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

- http://localhost:5173

## API Configuration (Frontend → Backend)

The frontend calls the backend at:

- http://localhost:8080

Update this file (for connecting backend server from frontend):

- `frontend/src/services/surveyApi.js`

Example:
```
const API_URL = "http://localhost:8080";
```

## CORS Note (If API calls fail)

If the frontend cannot call the backend due to CORS, allow the frontend origin:

http://localhost:5173

Common fixes in Spring Boot:

Add @CrossOrigin(origins = "http://localhost:5173") on your controller, or

Configure global CORS in Spring Security / WebMvcConfigurer.

Build for Production

Frontend build
cd frontend
npm run build

Backend JAR build
cd backend/survey_page
mvn clean package

Author

Ganesh Jasti
