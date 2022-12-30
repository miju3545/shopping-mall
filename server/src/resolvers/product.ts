export const mockProducts = (() =>
  Array.from({ length: 100 }, (_, i) => ({
    id: `${i + 1}`,
    imageUrl: `https:/picsum.photos/id/${i + 10}/200/150`,
    price: 5000,
    title: `임시상품${i + 1}`,
    createdAt: new Date(1671965475944 * (i * 1000 * 60 * 60 * 24)).toString(),
  })))();

const ProductResolver = {
  Query: {
    products: (parent, args, context, info) => {
      return mockProducts;
    },
    product: (parent, { id }, context, info) => {
      return mockProducts.find((product) => product.id === id);
    },
  },
  Mutation: {},
};

export default ProductResolver;
