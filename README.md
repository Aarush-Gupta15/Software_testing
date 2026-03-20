# ShopWave E-commerce Web Application

ShopWave is a full-stack e-commerce web application built with:

- Frontend: React + Vite
- Backend: FastAPI
- Database: MySQL

This project is simple, clean, and suitable for B.Tech academic submission, mini-project work, and viva explanation.

## Features

- User registration and login with JWT authentication
- Product listing page
- Product details page
- Add to cart and remove from cart
- Checkout and order placement
- Responsive frontend UI
- REST API backend
- MySQL database schema with sample products

## Tech Stack

- React
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication

## Project Structure

```text
shopwave/
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── schema.sql
├── docs/
│   ├── postman-examples.md
│   └── shopwave-postman-collection.json
└── README.md
```

## Quick Start

### 1. Start MySQL

Make sure your MySQL server is running.

Example:

```bash
brew services start mysql
```

### 2. Create the Database

Run:

```bash
mysql -h 127.0.0.1 -P 3306 -u root < database/schema.sql
```

### 3. Start the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend URL:

```text
http://127.0.0.1:8000
```

### 4. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev -- --host 127.0.0.1 --port 5173
```

Frontend URL:

```text
http://127.0.0.1:5173
```

## Demo Login

You can log in with this demo account:

- Email: `demo@shopwave.com`
- Password: `password123`

If the account does not exist yet, register it from the UI first.

## Environment Files

### Backend `.env`

```env
DATABASE_URL=mysql+pymysql://root@127.0.0.1:3306/shopwave
SECRET_KEY=change-this-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_URL=http://127.0.0.1:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://127.0.0.1:8000
```

## API Endpoints

| URL | Method | Description |
| --- | --- | --- |
| `/api/auth/register` | `POST` | Register a new user |
| `/api/auth/login` | `POST` | Login user |
| `/api/products` | `GET` | Get all products |
| `/api/products/{product_id}` | `GET` | Get single product |
| `/api/cart` | `GET` | View cart |
| `/api/cart` | `POST` | Add item to cart |
| `/api/cart/{product_id}` | `DELETE` | Remove item from cart |
| `/api/orders` | `GET` | View user orders |
| `/api/orders` | `POST` | Place an order |

## Sample Request Bodies

### Register

```json
{
  "name": "Aarush Gupta",
  "email": "aarush@example.com",
  "password": "password123"
}
```

### Login

```json
{
  "email": "aarush@example.com",
  "password": "password123"
}
```

### Add To Cart

```json
{
  "product_id": 1,
  "quantity": 2
}
```

### Place Order

```json
{
  "shipping_address": "221B Baker Street, London",
  "payment_method": "Cash on Delivery"
}
```

## Important Files

- Backend entry: `backend/app/main.py`
- Frontend entry: `frontend/src/main.jsx`
- Main app component: `frontend/src/App.jsx`
- MySQL schema: `database/schema.sql`
- Postman examples: `docs/postman-examples.md`
- Postman collection: `docs/shopwave-postman-collection.json`

## Postman Support

You can test the API using:

- `docs/postman-examples.md`
- `docs/shopwave-postman-collection.json`

## Notes

- The backend creates tables automatically at startup if the database exists.
- Sample product data is added from `database/schema.sql`.
- For real production use, update the secret key and database credentials.
