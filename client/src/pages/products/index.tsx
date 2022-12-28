import React from 'react';

import { useQuery } from 'react-query';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import { Products, GET_PRODUCTS } from '../../graphql/products';
import ProductList from '../../components/products/index';

export default function ProductListPage() {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS));

  if (!data) return null;

  return (
    <div>
      <h2 className="page-title">상품목록</h2>
      <ProductList products={data.products} />
    </div>
  );
}
