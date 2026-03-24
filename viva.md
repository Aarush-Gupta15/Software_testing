# ShopWave Viva Guide

## 1. Project Overview

ShopWave is a full-stack e-commerce web application built using:

- Frontend: React + Vite
- Backend: FastAPI
- Database: MySQL

The application demonstrates a basic but complete online shopping workflow:

1. User registers or logs in
2. User views products
3. User adds products to cart
4. User removes products from cart if needed
5. User places an order
6. User views their previous orders in `My Orders`

This document explains:

- how the project works internally
- how frontend, backend, and database are connected
- how each API works
- how to test the APIs using Postman

This file is written in simple language for academic viva and project explanation.

---

## 2. Architecture

The project follows a 3-tier architecture:

### 2.1 Frontend Layer

The frontend is built using React and provides the user interface.

Main responsibilities:

- show product list
- show product details
- login and register users
- show cart data
- place orders
- show previous orders

Important frontend routes:

- `/` -> Home page
- `/products/:productId` -> Product details page
- `/login` -> Login page
- `/register` -> Register page
- `/cart` -> Cart page
- `/checkout` -> Checkout page
- `/orders` -> My Orders page

### 2.2 Backend Layer

The backend is built using FastAPI.

Main responsibilities:

- process requests from frontend and Postman
- validate request data
- authenticate users with JWT
- read and write data in MySQL
- return JSON responses

Important backend route groups:

- `/api/auth`
- `/api/products`
- `/api/cart`
- `/api/orders`

### 2.3 Database Layer

The database is MySQL.

Main responsibilities:

- store users
- store products
- store cart items
- store orders
- store ordered products

Important tables:

- `users`
- `products`
- `cart`
- `orders`
- `order_items`

---

## 3. Folder Structure

```text
shopwave/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
├── database/
│   └── schema.sql
└── viva.md
```

---

## 4. How the Project Works

### 4.1 User Authentication Flow

When a user registers or logs in:

1. frontend sends a request to backend
2. backend checks the data
3. backend creates or validates the user
4. backend returns a JWT token
5. frontend stores that token
6. protected APIs use that token in `Authorization: Bearer <token>`

Example:

- register API returns `access_token`
- same token is used for cart and orders APIs

### 4.2 Product Flow

When the user opens the home page:

1. React calls `GET /api/products`
2. backend fetches product rows from MySQL
3. backend returns product list
4. frontend displays cards for each product

When the user opens a single product:

1. React calls `GET /api/products/{id}`
2. backend returns one product
3. frontend shows details page

### 4.3 Cart Flow

When the user clicks Add to Cart:

1. frontend sends `POST /api/cart`
2. backend checks the logged-in user
3. backend checks product id
4. backend inserts or updates cart row
5. backend returns updated cart

Important note:

`POST /api/cart` returns the full cart after update, not just a success message.

### 4.4 Order Flow

When the user places an order:

1. frontend sends `POST /api/orders`
2. backend checks current user
3. backend reads all items in user cart
4. backend creates a new row in `orders`
5. backend creates rows in `order_items`
6. backend clears the cart
7. backend returns order confirmation

When the user opens My Orders:

1. frontend sends `GET /api/orders`
2. backend returns orders belonging to that user only
3. frontend displays grouped order cards

---

## 5. Database Tables Explanation

### 5.1 Users Table

Stores registered users.

Fields:

- `id`
- `name`
- `email`
- `password_hash`

Important point:

The actual password is never stored directly.
It is converted into hashed format before saving.

### 5.2 Products Table

Stores all available products.

Fields:

- `id`
- `name`
- `description`
- `price`
- `image_url`
- `stock`
- `category`

### 5.3 Cart Table

Stores cart items for each user.

Fields:

- `id`
- `user_id`
- `product_id`
- `quantity`

### 5.4 Orders Table

Stores basic order information.

Fields:

- `id`
- `user_id`
- `shipping_address`
- `payment_method`
- `status`
- `total_amount`

### 5.5 Order Items Table

Stores the products inside a specific order.

Fields:

- `id`
- `order_id`
- `product_id`
- `quantity`
- `price`

---

## 6. API Documentation

## 6.1 Authentication APIs

### Register User

- Method: `POST`
- URL: `http://127.0.0.1:8000/api/auth/register`
- Body:

```json
{
  "name": "Aarush Gupta",
  "email": "aarush@example.com",
  "password": "123456"
}
```

- Success Response:

```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Aarush Gupta",
    "email": "aarush@example.com"
  }
}
```

- Error Response:

```json
{
  "detail": "Email already registered"
}
```

### Login User

- Method: `POST`
- URL: `http://127.0.0.1:8000/api/auth/login`
- Body:

```json
{
  "email": "aarush@example.com",
  "password": "123456"
}
```

- Success Response:

```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Aarush Gupta",
    "email": "aarush@example.com"
  }
}
```

---

## 6.2 Product APIs

### Get All Products

- Method: `GET`
- URL: `http://127.0.0.1:8000/api/products`
- Body: none

- Success Response:

```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "Comfortable over-ear headphones with noise reduction and long battery life.",
    "price": 2499.0,
    "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    "stock": 20,
    "category": "Electronics"
  }
]
```

### Get Single Product

- Method: `GET`
- URL: `http://127.0.0.1:8000/api/products/1`
- Body: none

- Success Response:

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "Comfortable over-ear headphones with noise reduction and long battery life.",
  "price": 2499.0,
  "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  "stock": 20,
  "category": "Electronics"
}
```

---

## 6.3 Cart APIs

These APIs require login token.

Header format:

```text
Authorization: Bearer <JWT_TOKEN>
```

### Add Product to Cart

- Method: `POST`
- URL: `http://127.0.0.1:8000/api/cart`
- Body:

```json
{
  "product_id": 1,
  "quantity": 2
}
```

- Success Response:

```json
{
  "items": [
    {
      "id": 12,
      "quantity": 2,
      "product": {
        "id": 1,
        "name": "Wireless Headphones",
        "price": 2499.0,
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
      }
    }
  ],
  "total_amount": 4998.0
}
```

Important point:

This API returns the updated full cart.

### Get Cart

- Method: `GET`
- URL: `http://127.0.0.1:8000/api/cart`
- Body: none

- Success Response:

```json
{
  "items": [
    {
      "id": 12,
      "quantity": 2,
      "product": {
        "id": 1,
        "name": "Wireless Headphones",
        "price": 2499.0,
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
      }
    }
  ],
  "total_amount": 4998.0
}
```

### Remove From Cart

- Method: `DELETE`
- URL: `http://127.0.0.1:8000/api/cart/1`
- Body: none

Important point:

This route removes cart item by `product_id`.

---

## 6.4 Order APIs

### Place Order

- Method: `POST`
- URL: `http://127.0.0.1:8000/api/orders`
- Body:

```json
{
  "shipping_address": "221B Baker Street, London",
  "payment_method": "Cash on Delivery"
}
```

- Success Response:

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

If cart is empty:

```json
{
  "detail": "Cart is empty"
}
```

### List Orders

- Method: `GET`
- URL: `http://127.0.0.1:8000/api/orders`
- Body: none

- Success Response:

```json
[
  {
    "id": 1,
    "status": "Placed",
    "shipping_address": "221B Baker Street, London",
    "payment_method": "Cash on Delivery",
    "total_amount": 4998.0,
    "items": [
      {
        "product_id": 1,
        "product_name": "Wireless Headphones",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        "quantity": 2,
        "price": 2499.0,
        "subtotal": 4998.0
      }
    ]
  }
]
```

Important point:

Both order APIs use the same URL:

- `POST /api/orders` -> place new order
- `GET /api/orders` -> list previous orders

---

## 7. How JWT Token Works

JWT token is used for protected APIs.

Protected APIs in this project:

- `/api/cart`
- `/api/orders`

### How to get token

Register or login first.

Example response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Aarush Gupta",
    "email": "aarush@example.com"
  }
}
```

Use value of `access_token`.

### How to send token

In Postman:

1. open `Authorization` tab
2. choose `Bearer Token`
3. paste only token value

Do not paste the word `Bearer` inside the token field if Postman already provides Bearer mode.

---

## 8. Postman Testing Guide

## 8.1 Correct Testing Order

Use this sequence:

1. Register user
2. Login user
3. Copy token
4. Get all products
5. Get single product
6. Add product to cart
7. Get cart
8. Remove from cart if needed
9. Add product again
10. Place order
11. List orders

---

## 8.2 Register in Postman

Method:
`POST`

URL:
`http://127.0.0.1:8000/api/auth/register`

Body:

```json
{
  "name": "Test User",
  "email": "testuser123@example.com",
  "password": "123456"
}
```

Important:

Use a new email each time if register fails with:

```json
{
  "detail": "Email already registered"
}
```

Useful trick:

```json
{
  "name": "Test User",
  "email": "test{{$timestamp}}@example.com",
  "password": "123456"
}
```

---

## 8.3 Login in Postman

Method:
`POST`

URL:
`http://127.0.0.1:8000/api/auth/login`

Body:

```json
{
  "email": "testuser123@example.com",
  "password": "123456"
}
```

---

## 8.4 Add Token Automatically in Postman

After successful login or register, save token in Postman environment.

Test script:

```javascript
const jsonData = pm.response.json();
pm.environment.set("jwt_token", jsonData.access_token);
```

Then use:

```text
Authorization: Bearer {{jwt_token}}
```

---

## 8.5 Example Postman Test Scripts

### Register or Login Success Test

```javascript
pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response has JSON body", function () {
    pm.response.to.be.json;
});

pm.test("Response contains user data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("access_token").that.is.a("string");
    pm.expect(jsonData).to.have.property("user").that.is.an("object");
    pm.expect(jsonData.user).to.have.property("name").that.is.a("string");
    pm.expect(jsonData.user).to.have.property("email").that.is.a("string");
});
```

### Add To Cart Success Test

```javascript
pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response has JSON body", function () {
    pm.response.to.be.json;
});

pm.test("Response contains cart object", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("object");
    pm.expect(jsonData).to.have.property("items").that.is.an("array");
    pm.expect(jsonData).to.have.property("total_amount");
});

pm.test("Requested product was added to cart", function () {
    const jsonData = pm.response.json();
    const requestBody = JSON.parse(pm.request.body.raw);
    const requestedProductId = Number(requestBody.product_id);
    const requestedQuantity = Number(requestBody.quantity);

    const foundItem = jsonData.items.find(function(item) {
        return Number(item.product.id) === requestedProductId;
    });

    pm.expect(foundItem, "Requested product not found in cart").to.exist;
    pm.expect(Number(foundItem.quantity)).to.be.at.least(requestedQuantity);
});
```

### List Orders Success Test

```javascript
pm.test("Status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});

pm.test("Response has JSON body", function () {
    pm.response.to.be.json;
});

pm.test("Response is an array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array");
});
```

---

## 9. Common Errors and Reasons

## 9.1 404 Not Found

Reason:

- wrong URL
- backend not running
- using frontend URL instead of backend URL

Correct backend base URL:

```text
http://127.0.0.1:8000
```

Wrong frontend URL for API testing:

```text
http://127.0.0.1:5173
```

---

## 9.2 Email Already Registered

Reason:

- trying to register same email again

Solution:

- use another email
- or use login API instead

---

## 9.3 Cart Is Empty

Reason:

- trying to place order before adding products

Solution:

1. add product to cart
2. then call `POST /api/orders`

---

## 9.4 Invalid Character in Authorization Header

Reason:

- token pasted in wrong format
- quotes or extra characters added

Correct format in manual header:

```text
Authorization: Bearer your_token_here
```

If using Postman Bearer Token mode:

- paste only token value
- do not write `Bearer`

---

## 9.5 Token Expired

Reason:

- JWT expiry time completed

Solution:

- login again
- or register a new user and use new token

---

## 10. How to Run the Project

## 10.1 Start MySQL

```bash
brew services start mysql
```

## 10.2 Start Backend

```bash
cd /Users/aarushgupta/Desktop/shopwave/backend
source venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend docs:

```text
http://127.0.0.1:8000/docs
```

## 10.3 Start Frontend

```bash
cd /Users/aarushgupta/Desktop/shopwave/frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

Frontend website:

```text
http://127.0.0.1:5173
```

---

## 11. Viva Questions and Answers

### Q1. Which architecture is used in this project?

Answer:

This project uses 3-tier architecture:

- frontend layer
- backend API layer
- database layer

### Q2. Why is JWT used?

Answer:

JWT is used for authentication. After login, backend sends a token. That token is used in protected routes like cart and orders.

### Q3. Why is password not stored directly?

Answer:

Password is stored as hash for security. If database is leaked, original password is still not directly visible.

### Q4. Difference between `POST /api/orders` and `GET /api/orders`?

Answer:

- `POST /api/orders` places a new order
- `GET /api/orders` shows previous orders of that user

### Q5. Why use REST APIs?

Answer:

REST APIs separate frontend and backend cleanly. Frontend can call backend using HTTP methods like GET, POST, and DELETE.

### Q6. Why use React?

Answer:

React helps build reusable components and dynamic user interfaces.

### Q7. Why use FastAPI?

Answer:

FastAPI is simple, fast, easy to write, and automatically provides Swagger documentation.

---

## 12. Final Summary

ShopWave is a beginner-friendly but complete e-commerce project.

It demonstrates:

- authentication
- REST API design
- cart management
- order management
- database relationships
- frontend and backend integration
- Postman API testing

For viva, the most important points to explain are:

1. frontend sends requests
2. backend processes logic
3. database stores records
4. JWT protects private routes
5. cart and order APIs work per logged-in user

