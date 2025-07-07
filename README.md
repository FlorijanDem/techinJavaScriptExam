This project have front and back. Enter to these 2 directores and install dependences `npm i`.
For back you must set up postgres db in `.env` and ports (more you can find in back README.md).
In front you also have `.env` in this you must set up backend url example: 
Front env example
```
VITE_API_URL=http://localhost:3001/api/v1
```

Back env example
```
# Environment variables for backend
PORT=3001
DB_NAME=another
DB_USER=myuser
DB_PASS=mypassword
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES=10000
```