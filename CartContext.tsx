import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { CartItem, CartState, CartContextType } from './models/Cart';


type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };


const initialState: CartState = {
  items: [],
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: CartItem) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id: number) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};