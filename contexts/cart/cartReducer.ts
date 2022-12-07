import { CartState } from '.';
import { ICartProduct } from '../../interfaces';
import { ShippingAddres } from './CartProvider';

type CartActionType =
  | { type: '[Cart] Load cart from cookies | storage', payload: ICartProduct[] }
  | { type: '[Cart] Load address from cookies | storage', payload: ShippingAddres }
  | { type: '[Cart] Update shippingaddress', payload: ShippingAddres }
  | { type: '[Cart] Update products in cart', payload: ICartProduct[] }
  | {
    type: '[Cart] Update order summary',
    payload: {
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
    },
  }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[Cart] Load cart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: action.payload
      }

    case '[Cart] Update shippingaddress':
    case '[Cart] Load address from cookies | storage': {
      return {
        ...state,
        shippingAddress: action.payload,
      }
    }

    case '[Cart] Update products in cart': {
      return {
        ...state,
        cart: [...action.payload],
      }
    }

    case '[Cart] Update order summary': {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state;
  }
}