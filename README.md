# Clone

A full-stack e-commerce clone of — a premium concealed carry bags, holsters & accessories store.

## Tech Stack

### Backend
- **Java 17** + **Spring Boot 3.2**
- **Spring Data JPA** (H2 in-memory DB by default, PostgreSQL-ready)
- **Spring Security** + **JWT** authentication
- **Maven** build

### Frontend
- **React 18** + **Vite**
- **TailwindCSS** for styling
- **React Router** for routing
- **Axios** for API calls
- **Lucide React** for icons

## Project Structure

```
945industries-clone/
├── backend/                   # Spring Boot API
│   ├── src/main/java/com/industries945/store/
│   │   ├── config/            # Data seeder
│   │   ├── controller/        # REST controllers
│   │   ├── dto/               # Data transfer objects
│   │   ├── exception/         # Global exception handler
│   │   ├── model/             # JPA entities
│   │   ├── repository/        # Spring Data repositories
│   │   ├── security/          # JWT + Spring Security config
│   │   └── service/           # Business logic
│   └── pom.xml
├── frontend/                  # React SPA
│   ├── src/
│   │   ├── api/               # Axios API client
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context (Auth, Cart)
│   │   └── pages/             # Page components
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API starts on **http://localhost:8080**. The H2 console is available at http://localhost:8080/h2-console.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on **http://localhost:5173** and proxies API calls to the backend.

## API Endpoints

| Method | Endpoint                          | Description                |
|--------|-----------------------------------|----------------------------|
| GET    | /api/products                     | List all products          |
| GET    | /api/products/featured            | Featured products          |
| GET    | /api/products/{slug}              | Product by slug            |
| GET    | /api/products/category/{slug}     | Products by category       |
| GET    | /api/categories                   | List all categories        |
| GET    | /api/categories/{slug}            | Category by slug           |
| GET    | /api/search?q={query}             | Search products            |
| GET    | /api/cart                         | Get cart (X-Session-Id)    |
| POST   | /api/cart/items                   | Add to cart                |
| PUT    | /api/cart/items/{id}?quantity=N   | Update cart item qty       |
| DELETE | /api/cart/items/{id}              | Remove cart item           |
| DELETE | /api/cart                         | Clear cart                 |
| POST   | /api/auth/register                | Register new user          |
| POST   | /api/auth/login                   | Login (returns JWT)        |
| POST   | /api/newsletter                   | Subscribe to newsletter    |
| POST   | /api/contact                      | Submit contact form        |

## Features

- Product catalog with categories (Bags, Holsters, Accessories, Bundles, Gift Cards)
- Product search
- Shopping cart with session-based tracking
- User registration & login with JWT
- Newsletter subscription
- Contact form
- Free shipping on orders above $99.99
- Responsive design matching the 945 Industries brand aesthetic
- Seed data with real product names from the original site

## Switching to PostgreSQL

Update `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/store945
    driver-class-name: org.postgresql.Driver
    username: your_user
    password: your_password
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
```
