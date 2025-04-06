'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImageType {
  id: string;
  url: string;
  title: string;
  price: number;
}

interface CartContextType {
  cart: ImageType[];
  addToCart: (image: ImageType) => void;
  removeFromCart: (id: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ImageType[]>([]);

  const addToCart = (image: ImageType) => {
    setCart((prev) => [...prev, image]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((img) => img.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
