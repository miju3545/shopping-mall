import React from 'react';
import { useQuery } from 'react-query';
import { fetcher, QueryKeys } from '../../queryClient';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/product/detail';
import { Product } from '@/constants/types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({ method: 'GET', path: `/products/${id}` })
  );

  if (!data) return null;

  return <ProductDetail item={data} />;
}
