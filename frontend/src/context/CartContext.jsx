import { createContext, useContext, useEffect, useState } from "react";

import { apiDelete, apiGet, apiPost } from "../api/client";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total_amount: 0 });

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart({ items: [], total_amount: 0 });
    }
  }, [isAuthenticated]);

  async function fetchCart() {
    if (!token) {
      return;
    }
    const data = await apiGet("/api/cart", token);
    setCart(data);
  }

  async function addToCart(productId, quantity = 1) {
    const data = await apiPost("/api/cart", { product_id: productId, quantity }, token);
    setCart(data);
  }

  async function removeFromCart(productId) {
    const data = await apiDelete(`/api/cart/${productId}`, token);
    setCart(data);
  }

  async function checkout(orderDetails) {
    const data = await apiPost("/api/orders", orderDetails, token);
    setCart({ items: [], total_amount: 0 });
    return data;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
