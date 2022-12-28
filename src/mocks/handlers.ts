import { graphql } from 'msw';
import { GET_PRODUCTS, GET_PRODUCT } from '../graphql/products';
import { ADD_CART, GET_CART, Cart, UPDATE_CART, DELETE_CART } from '../graphql/cart';
import { EXECUTE_PAY } from '../graphql/payment';

const mockProducts = (() =>
  Array.from({ length: 100 }, (_, i) => ({
    id: `${i + 1}`,
    imageUrl: `https://placeimg.com/640/480/${i + 1}`,
    price: 5000,
    title: `임시상품${i + 1}`,
    createdAt: new Date(1671965475944 * (i * 1000 * 60 * 60 * 24)).toString(),
  })))();

let cartData: { [key: string]: Cart } = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),

  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find((product) => product.id === req.variables.id);
    if (found) return res(ctx.data(found));
    return res();
  }),

  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const { id } = req.variables;
    const targetProduct = mockProducts.find((product) => product.id === id);

    if (!targetProduct) {
      throw new Error('등록되지 않은 상품입니다.');
    }

    const newItem = { ...targetProduct, amount: (newCartData[id]?.amount || 0) + 1 };
    newCartData[id] = newItem;

    cartData = newCartData;

    return res(ctx.data(newItem));
  }),

  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const { id, amount } = req.variables;

    const found = newCartData?.[id];

    if (!found) {
      throw new Error('장바구니에 없는 상품입니다.');
    }

    const newItem = { ...found, amount };

    newCartData[id] = newItem;

    if (newCartData[id].amount <= 0) {
      delete newCartData[id];
    }

    cartData = newCartData;

    return res(ctx.data(newItem));
  }),

  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),

  graphql.mutation(DELETE_CART, (req, res, ctx) => {
    const { id } = req.variables;

    const newCartData = { ...cartData };
    const found = newCartData?.[id];

    if (!found) throw new Error('장바구니에 없는 상품입니다.');

    delete newCartData?.[id];

    cartData = newCartData;

    return res(ctx.data(found));
  }),

  graphql.mutation(EXECUTE_PAY, ({ variables: ids }, res, ctx) => {
    // variables => [{id: "1", amount: 2}]
    const newCartData = cartData;

    ids.forEach((id: string) => delete newCartData[id]);

    return res(ctx.data(ids));
  }),
];
