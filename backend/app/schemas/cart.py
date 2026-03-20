from pydantic import BaseModel


class AddToCartRequest(BaseModel):
    product_id: int
    quantity: int = 1


class CartProduct(BaseModel):
    id: int
    name: str
    price: float
    image_url: str


class CartItemResponse(BaseModel):
    id: int
    quantity: int
    product: CartProduct


class CartResponse(BaseModel):
    items: list[CartItemResponse]
    total_amount: float
