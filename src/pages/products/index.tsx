import React from 'react';

import { useQuery } from 'react-query';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import ProductItem from '../../components/product/item';
import { Products, GET_PRODUCTS } from '../../graphql/products';
import { Cart, GET_CART } from '../../graphql/cart';

export default function ProductListPage() {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS));

  if (!data) return null;

  return (
    <div>
      <h2>상품목록</h2>

      <ul className="products">
        {data?.products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
}
