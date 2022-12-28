import { Cart } from '@/graphql/cart';

const CONTROL_CART = 'cart/CONTROL_CART' as const;
const ADD_CART = 'cart/ADD_CART' as const;
const REMOVE_CART = 'cart/REMOVE_CART' as const;
const UPDATE_CART = 'cart/UPDATE_CART' as const;
const OPEN_CART = 'cart/OPEN' as const;
const CLOSE_CART = 'cart/CLOSE' as const;

export const controlCart = (items: Cart[]) => ({ type: CONTROL_CART, payload: items });
export const addCart = (item: Cart) => ({ type: ADD_CART, payload: item });
export const updateCart = ({ id, amount }: { id: string; amount: number }) => ({
  type: UPDATE_CART,
  payload: { id, amount },
});

export const removeCart = ({ id }: { id: string }) => ({ type: REMOVE_CART, payload: { id } });
export const openCart = () => ({ type: OPEN_CART });
export const closeCart = () => ({ type: CLOSE_CART });

type CartAction =
  | ReturnType<typeof controlCart>
  | ReturnType<typeof addCart>
  | ReturnType<typeof updateCart>
  | ReturnType<typeof removeCart>
  | ReturnType<typeof openCart>
  | ReturnType<typeof closeCart>;

type CartState = {
  cart: Cart[];
  isOpen: boolean;
};

const initialState: CartState = {
  cart: [],
  isOpen: false,
};

export default function Cart(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case CONTROL_CART: {
      const items = action.payload;
      return { ...state, cart: items };
    }
    case ADD_CART: {
      const { id } = action.payload;
      const newItem = { ...action.payload, amount: (action.payload.amount || 0) + 1 };

      return { ...state, cart: [...state.cart, newItem] };
    }

    case UPDATE_CART: {
      const { id, amount } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.id === id) item.amount = amount;
        return item;
      });
      return { ...state, cart: newCart };
    }

    case REMOVE_CART: {
      const { id } = action.payload;

      const newCart = state.cart.filter((item) => item.id !== id);
      return { ...state, cart: newCart };
    }
    case OPEN_CART:
      return { ...state, isOpen: true };
    case CLOSE_CART:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
