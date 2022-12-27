import { graphql } from 'msw';
import { GET_PRODUCTS, GET_PRODUCT } from '../graphql/products';
import { ADD_CART, REMOVE_CART, GET_CART, Cart } from '../graphql/cart';

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
    const newData = { ...cartData };
    const id = req.variables.id;

    if (newData[id]) {
      newData[id] = { ...newData[id], amount: newData[id].amount + 1 };
    } else {
      const found = mockProducts.find((product) => product.id === id);
      if (found) {
        newData[id] = { ...found, amount: 1 };
      }
    }

    cartData = newData;

    console.log('ADD_CART', cartData);

    return res(ctx.data(cartData));
  }),

  graphql.mutation(REMOVE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const id = req.variables.id;

    if (newData[id].amount > 1) {
      newData[id] = { ...newData[id], amount: newData[id].amount - 1 };
    } else {
      delete newData[id];
    }

    cartData = newData;

    console.log('REMOVE_CART', cartData);

    return res(ctx.data(newData));
  }),

  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
];
