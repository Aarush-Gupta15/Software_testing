from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.api.routes.dependencies import get_current_user
from app.core.database import get_db
from app.models.cart_item import CartItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.user import User
from app.schemas.order import PlaceOrderRequest

router = APIRouter()


@router.get("")
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[dict]:
    orders = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product))
        .filter(Order.user_id == current_user.id)
        .order_by(Order.id.desc())
        .all()
    )

    return [
        {
            "id": order.id,
            "status": order.status,
            "shipping_address": order.shipping_address,
            "payment_method": order.payment_method,
            "total_amount": order.total_amount,
            "items": [
                {
                    "product_id": item.product.id,
                    "product_name": item.product.name,
                    "image_url": item.product.image_url,
                    "quantity": item.quantity,
                    "price": item.price,
                    "subtotal": item.quantity * item.price,
                }
                for item in order.items
            ],
        }
        for order in orders
    ]


@router.post("")
def place_order(
    payload: PlaceOrderRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    cart_items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == current_user.id)
        .all()
    )
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_amount = sum(item.quantity * item.product.price for item in cart_items)
    order = Order(
        user_id=current_user.id,
        shipping_address=payload.shipping_address,
        payment_method=payload.payment_method,
        total_amount=total_amount,
        status="Placed",
    )
    db.add(order)
    db.flush()

    for item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.product.price,
        )
        db.add(order_item)
        db.delete(item)

    db.commit()
    db.refresh(order)

    return {
        "message": "Order placed successfully",
        "order": {
            "id": order.id,
            "status": order.status,
            "shipping_address": order.shipping_address,
            "payment_method": order.payment_method,
            "total_amount": order.total_amount,
        },
    }
