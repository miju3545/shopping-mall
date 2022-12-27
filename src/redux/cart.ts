import { Product } from '../graphql/products';

const ADD_ITEM = 'cart/ADD_ITEM' as const;
const REMOVE_ITEM = 'cart/REMOVE_ITEM' as const;
const REMOVE_TOTAL = 'cart/REMOVE_TOTAL' as const;
const OPEN_CART = 'cart/OPEN' as const;
const CLOSE_CART = 'cart/CLOSE' as const;

export const addItem = (product: Product) => ({ type: ADD_ITEM, payload: product });
export const removeItem = (productId: string) => ({ type: REMOVE_ITEM, payload: productId });
export const removeTotal = (productId: string) => ({ type: REMOVE_TOTAL, payload: productId });
export const openCart = () => ({ type: OPEN_CART });
export const closeCart = () => ({ type: CLOSE_CART });

type CartAction =
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof removeTotal>
  | ReturnType<typeof openCart>
  | ReturnType<typeof closeCart>;

type CartState = {
  cart: Map<string, number>;
  isOpen: boolean;
};

const initialState: CartState = {
  cart: new Map(),
  isOpen: false,
};

export default function Cart(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_ITEM: {
      const id = action.payload.id;
      if (state.cart.has(id)) {
        state.cart.set(id, (state.cart.get(id) || 1) + 1);
      } else {
        state.cart.set(id, 1);
      }

      return { ...state };
    }
    case REMOVE_ITEM: {
      const id = action.payload;
      const count = state.cart.get(id) || 1;

      if (count > 1) {
        state.cart.set(id, count - 1);
      } else {
        state.cart.delete(id);
      }

      return { ...state };
      break;
    }

    case REMOVE_TOTAL: {
      const id = action.payload;

      state.cart.delete(id);

      return { ...state };
      break;
    }
    // return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case OPEN_CART:
      return { ...state, isOpen: true };
    case CLOSE_CART:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
