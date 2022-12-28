import React from 'react';

import { Product } from '../../graphql/products';
import ProductItem from './item';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="products">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
}
