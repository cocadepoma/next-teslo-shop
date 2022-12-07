import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippingAddres } from './CartProvider';

interface CartContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddres;

  addProductToCart: (product: ICartProduct) => void;
  removeProductCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  updateShippingAddress: (address: ShippingAddres) => void;
}

export const CartContext = createContext({} as CartContextProps);