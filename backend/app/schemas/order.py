from pydantic import BaseModel


class PlaceOrderRequest(BaseModel):
    shipping_address: str
    payment_method: str


class OrderItemResponse(BaseModel):
    product_name: str
    quantity: int
    price: float


class OrderResponse(BaseModel):
    id: int
    status: str
    shipping_address: str
    payment_method: str
    total_amount: float
    items: list[OrderItemResponse]
