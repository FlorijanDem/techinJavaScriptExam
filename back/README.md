It is built with Node.js, Express, and PostgreSQL.

## Features

- User authentication (signup, login, logout) with JWT and Argon2 password hashing
- Excursion management (CRUD)
- Category and date management
- Secure routes with role-based access control

## Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL

## Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd back
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root of `back`:

   ```
   PORT=3001
   DB_NAME=exam
   DB_USER=myuser
   DB_PASS=mypassword
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   JWT_COOKIE_EXPIRES=10000
   ```

   Adjust values as needed.

4. **Initialize the database**

   Create the database and tables. You can use the provided `init.sql`:

   ```bash
   psql -U <your-db-user> -d <your-db-name> -f init.sql
   ```
   Or if you want db already with users you can use dump

   admin user
   admin@example.com
   Admin1234


5. **Start the server**

   ```bash
   npm start
   ```

   The server will run on the port specified in `.env` (default: 3001).

## Security

- Passwords are hashed with Argon2.
- JWT is used for authentication, stored in HTTP-only cookies.
- Role-based access control for protected routes.
