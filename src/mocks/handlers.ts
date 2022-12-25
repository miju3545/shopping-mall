import { graphql } from 'msw';
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';

const mockProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  imageUrl: `https://placeimg.com/640/480/${i + 1}`,
  price: 5000,
  title: `임시상품 - ${i + 1}`,
  createdAt: new Date(1671965475944 * (i * 1000 * 60 * 60 * 24)).toString(),
}));

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    return res(
      ctx.data(mockProducts.find((product) => product.id === Number(req.variables.id)) || {})
    );
  }),
];
