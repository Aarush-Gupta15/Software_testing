from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, cart, orders, products
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(
    title="ShopWave API",
    description="Simple e-commerce backend built with FastAPI and MySQL.",
    version="1.0.0",
)

allowed_origins = list(
    {
        settings.frontend_url,
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    # Creates tables for quick local setup. The schema.sql file is also provided.
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root() -> dict:
    return {"message": "Welcome to ShopWave API"}


app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(cart.router, prefix="/api/cart", tags=["Cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
