import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] Load cart from cookies | storage' }
  | { type: '[Cart] Add Product', payload: ICartProduct }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[Cart] Load cart from cookies | storage':
      return {
        ...state,
      }

    default:
      return state;
  }
}