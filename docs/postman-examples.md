# Postman API Examples

Base URL: `http://127.0.0.1:8000`

## 1. Register User

- Method: `POST`
- URL: `/api/auth/register`
- Body:

```json
{
  "name": "Aarush Gupta",
  "email": "aarush@example.com",
  "password": "password123"
}
```

## 2. Login User

- Method: `POST`
- URL: `/api/auth/login`
- Body:

```json
{
  "email": "aarush@example.com",
  "password": "password123"
}
```

## 3. Get All Products

- Method: `GET`
- URL: `/api/products`

## 4. Get Single Product

- Method: `GET`
- URL: `/api/products/1`

## 5. Add Product to Cart

- Method: `POST`
- URL: `/api/cart`
- Header: `Authorization: Bearer <JWT_TOKEN>`
- Body:

```json
{
  "product_id": 1,
  "quantity": 2
}
```

## 6. View Cart

- Method: `GET`
- URL: `/api/cart`
- Header: `Authorization: Bearer <JWT_TOKEN>`

## 7. Remove From Cart

- Method: `DELETE`
- URL: `/api/cart/1`
- Header: `Authorization: Bearer <JWT_TOKEN>`

## 8. Place Order

- Method: `POST`
- URL: `/api/orders`
- Header: `Authorization: Bearer <JWT_TOKEN>`
- Body:

```json
{
  "shipping_address": "221B Baker Street, London",
  "payment_method": "Cash on Delivery"
}
```

## 9. List Orders

- Method: `GET`
- URL: `/api/orders`
- Header: `Authorization: Bearer <JWT_TOKEN>`
