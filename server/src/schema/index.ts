import { gql } from 'apollo-server-express';
import productSchema from './product';
import cartSchema from './cart';

const linkSchema = gql`
  type Query {
    _: Boolean
    # products: [Product!]
    # product(id: ID!): Product!
    # cart: [CartItem!]
  }

  type Mutation {
    _: Boolean
  }
`;

export default { linkSchema, productSchema, cartSchema };
