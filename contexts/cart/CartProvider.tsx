import { FC, ReactNode, useEffect, useReducer } from 'react';

import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '.';
import { ICartProduct } from '../../interfaces';

interface Props {
  children: ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const Cart_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);

  useEffect(() => {
    loadCartCookie();
  }, []);

  useEffect(() => {
    loadSummaryOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cart])

  const loadCartCookie = () => {
    try {
      const cartCookie = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) as ICartProduct[] : [];
      dispatch({ type: '[Cart] Load cart from cookies | storage', payload: cartCookie });
    } catch (error) {
      dispatch({ type: '[Cart] Load cart from cookies | storage', payload: [] });
    }
  }

  const loadSummaryOrder = () => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0;

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    };

    dispatch({ type: '[Cart] Update order summary', payload: orderSummary });
  }

  const setCartCookie = (cart: ICartProduct[]) => {
    Cookie.set('cart', JSON.stringify(cart));
  };

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart
      .find(cartProduct => cartProduct._id === product._id && cartProduct.size === product.size);

    if (!productInCart) {
      dispatch({ type: '[Cart] Update products in cart', payload: [product, ...state.cart] });
      setCartCookie([product, ...state.cart]);
      return;
    }

    const newCart = state.cart.map(cartProduct => {
      if (cartProduct._id === product._id && cartProduct.size === product.size) {
        return {
          ...product,
          quantity: cartProduct.quantity + product.quantity
        }
      } else {
        return cartProduct;
      }
    });

    dispatch({ type: '[Cart] Update products in cart', payload: newCart });
    setCartCookie(newCart);
  };

  const removeProductCart = (product: ICartProduct) => {
    const newCart = state.cart
      .filter(p => !(p._id === product._id && p.size === product.size))

    dispatch({ type: '[Cart] Update products in cart', payload: newCart });
    setCartCookie(newCart);
  };

  const updateCartQuantity = (product: ICartProduct) => {
    const newCart = state.cart.map(p => {
      if (p._id === product._id && p.size === product.size) {
        return product
      } else {
        return p;
      }
    })

    dispatch({ type: '[Cart] Update products in cart', payload: newCart });
    setCartCookie(newCart);
  }

  return (
    <CartContext.Provider value={{
      ...state,

      addProductToCart,
      removeProductCart,
      updateCartQuantity,
    }}>
      {children}
    </CartContext.Provider>
  )
}