# Screenshots and Logs

This file is for academic submission support. It contains:

- Recommended screenshots to include in the report
- Sample terminal logs
- Sample API outputs

## Recommended Screenshots

Take these screenshots from the running project:

1. Home Page
   - Show the product listing grid
   - URL: `http://127.0.0.1:5173/`

2. Login Page
   - Show the login form
   - URL: `http://127.0.0.1:5173/auth`

3. Register Page
   - Show the register form
   - URL: `http://127.0.0.1:5173/auth`

4. Product Details Page
   - Open any product and capture full product information

5. Cart Page
   - Add one or more products and capture the cart page

6. Checkout Page
   - Show shipping address and payment method form

7. Order Success
   - Capture the success message after placing an order

8. MySQL Database
   - Show `users`, `products`, `cart`, and `orders` tables in terminal or MySQL Workbench

9. FastAPI Backend Running
   - Capture the terminal where the backend is running

10. React Frontend Running

- Capture the terminal where the frontend is running

## Commands to Run Before Taking Screenshots

### Start MySQL

```bash
brew services start mysql
```

### Load Database Schema

```bash
mysql -h 127.0.0.1 -P 3306 -u root < database/schema.sql
```

### Start Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Start Frontend

```bash
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

## Sample Backend Log

```text
INFO:     Started server process [63802]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     127.0.0.1:49980 - "POST /api/auth/login HTTP/1.1" 200 OK
INFO:     127.0.0.1:49982 - "GET /api/products HTTP/1.1" 200 OK
INFO:     127.0.0.1:49984 - "POST /api/cart HTTP/1.1" 200 OK
INFO:     127.0.0.1:49999 - "POST /api/orders HTTP/1.1" 200 OK
> shopwave-frontend@1.0.0 dev
> vite --host 127.0.0.1 --port 5173

VITE v5.4.21 ready in 96 ms

Local: http://127.0.0.1:5173/
```

## Sample API Output

### Root API Response

```json
{
  "message": "Welcome to ShopWave API"
}
```

### Login Success Response

```json
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@shopwave.com"
  }
}
```

### Products Response

```json
[
  {
    "id": 4,
    "name": "Study Desk Lamp",
    "description": "LED desk lamp with brightness control for late-night study sessions.",
    "price": 899.0,
    "image_url": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    "stock": 25,
    "category": "Home"
  }
]
```

### Order Success Response

```json
{
  "message": "Order placed successfully",
  "order": {
    "id": 1,
    "status": "Placed",
    "shipping_address": "221B Baker Street, London",
    "payment_method": "Cash on Delivery",
    "total_amount": 4998.0
  }
}
```

## Suggested Report Section Name

You can use this heading in your report:

```text
Screenshots and Execution Logs
```

## Short Viva Explanation

You can explain it like this:

```text
The project was tested by running the React frontend on port 5173,
the FastAPI backend on port 8000, and MySQL on port 3306.
The screenshots show the main user flow: login, product browsing,
cart management, checkout, and order placement.
The logs confirm that the API endpoints responded successfully.
```
