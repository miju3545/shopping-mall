import { mockProducts } from './product';
import CartItem from '../../../client/src/components/cart/item';

let cartData = [{ id: '1', amount: 2 }];

const cartResolver = {
  Query: {
    cart: (parent, { id }, context, info) => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (parent, { id }, context, info) => {
      const newCartData = { ...cartData };
      const product = mockProducts.find((product) => product.id === id);

      if (!product) throw new Error('등록되지 않은 상품입니다.');

      const item = { ...product, amount: (newCartData[id].amount || 0) + 1 };

      newCartData[id] = item;

      cartData = newCartData;

      return item;
    },
    updateCart: (parent, { id, amount }, context, info) => {
      const newCartData = { ...cartData };
      const product = mockProducts.find((product) => product.id === id);

      if (!product) throw new Error('등록되지 않은 상품입니다.');

      const item = { ...product, amount };
      newCartData[id] = item;

      cartData = newCartData;

      return item;
    },
    deleteCart: (parent, { id }, context, info) => {
      const newCartData = { ...cartData };

      delete newCartData[id];

      cartData = newCartData;

      return id;
    },
    executePay: (parent, { ids }, context, info) => {
      cartData.filter((item) => {
        if (!ids.includes(item.id)) return true;
      });

      return ids;
    },
  },
};

export default cartResolver;
