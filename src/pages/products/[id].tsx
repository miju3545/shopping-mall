import React from 'react';
import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../queryClient';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/products/detail';
import { Product, GET_PRODUCT } from '../../graphql/products';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );

  if (!data) return null;

  return <ProductDetail item={data} />;
}
