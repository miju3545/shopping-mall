import { createStore, combineReducers, Store } from 'redux';

import cart from './cart';

const rootReducer = combineReducers({ cart });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const getStore = (() => {
  let store: Store | null = null;

  return () => {
    if (!store) store = createStore(rootReducer);
    return store;
  };
})();
