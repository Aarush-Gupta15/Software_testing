# ShopWave E-commerce Web Application

## Project Overview

ShopWave is a complete e-commerce web application built with a clean 3-tier architecture:

1. Frontend: React application for the user interface
2. Backend: FastAPI REST API for business logic
3. Database: MySQL for persistent data storage

This project is designed to be simple, readable, and suitable for B.Tech academic submission and viva. It covers product browsing, authentication, cart management, and order placement.

## Folder Structure

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
├── .gitignore
└── README.md
```

## Backend Code

### Main Features

- JWT-based login and registration
- Product listing and single product details
- Add to cart, remove from cart, and view cart
- Place order from cart
- MySQL integration using SQLAlchemy

### Backend Run Command

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Frontend Code

### Main Features

- Home page with product listing
- Product details page
- Login/Register page
- Cart page
- Checkout page
- Reusable header and product card components
- Responsive UI using plain CSS

### Frontend Run Command

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Database Schema

The MySQL schema is available in [database/schema.sql](/Users/aarushgupta/Desktop/shopwave/database/schema.sql).

### Run the SQL file

```bash
mysql -u root -p < database/schema.sql
```

## REST API Endpoints

| URL | Method | Request Body | Response Format |
| --- | --- | --- | --- |
| `/api/auth/register` | `POST` | `{ "name", "email", "password" }` | `{ "access_token", "token_type", "user" }` |
| `/api/auth/login` | `POST` | `{ "email", "password" }` | `{ "access_token", "token_type", "user" }` |
| `/api/products` | `GET` | None | `[ { "id", "name", "description", "price", "image_url", "stock", "category" } ]` |
| `/api/products/{product_id}` | `GET` | None | `{ "id", "name", "description", "price", "image_url", "stock", "category" }` |
| `/api/cart` | `GET` | None | `{ "items": [], "total_amount": 0 }` |
| `/api/cart` | `POST` | `{ "product_id", "quantity" }` | `{ "items": [], "total_amount": 0 }` |
| `/api/cart/{product_id}` | `DELETE` | None | `{ "items": [], "total_amount": 0 }` |
| `/api/orders` | `GET` | None | `[ { "id", "status", "shipping_address", "payment_method", "total_amount", "items" } ]` |
| `/api/orders` | `POST` | `{ "shipping_address", "payment_method" }` | `{ "message", "order" }` |

## Example Request Bodies

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

### Add to Cart

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

## Example JSON Responses

### Login Success

```json
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Aarush Gupta",
    "email": "aarush@example.com"
  }
}
```

### Products List

```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "Comfortable over-ear headphones with noise reduction and long battery life.",
    "price": 2499.0,
    "image_url": "https://images.unsplash.com/...",
    "stock": 20,
    "category": "Electronics"
  }
]
```

### Cart Response

```json
{
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "product": {
        "id": 1,
        "name": "Wireless Headphones",
        "price": 2499.0,
        "image_url": "https://images.unsplash.com/..."
      }
    }
  ],
  "total_amount": 4998.0
}
```

## Step-by-Step Implementation

### 1. Set Up Backend

1. Open terminal in the project folder.
2. Move to the backend folder.
3. Create and activate a virtual environment.
4. Install Python dependencies.
5. Copy `.env.example` to `.env`.
6. Start the FastAPI server.

### 2. Connect MySQL

1. Make sure MySQL server is running.
2. Create the database by running `database/schema.sql`.
3. Update `DATABASE_URL` in `backend/.env`.
4. Restart the backend server.

### 3. Run Frontend

1. Move to the frontend folder.
2. Install dependencies using `npm install`.
3. Copy `.env.example` to `.env`.
4. Start the development server using `npm run dev`.

## Postman Support

Detailed sample requests are available in [docs/postman-examples.md](/Users/aarushgupta/Desktop/shopwave/docs/postman-examples.md).

You can also import the ready-made collection file: [docs/shopwave-postman-collection.json](/Users/aarushgupta/Desktop/shopwave/docs/shopwave-postman-collection.json).

## Notes

- The backend automatically creates tables at startup using SQLAlchemy.
- The SQL file is still included for manual setup and academic explanation.
- For production, move the secret key to a secure environment and use stronger deployment settings.
