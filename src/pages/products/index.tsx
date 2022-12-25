import React from 'react';
import { useQuery } from 'react-query';
import { fetcher, QueryKeys } from '../../queryClient';
import { Product } from 'constants/types';
import ProductItem from '../../components/product/item';

export default function ProductList() {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({ method: 'GET', path: '/products' })
  );

  return (
    <div>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
}
