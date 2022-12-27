import React from 'react';

import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../queryClient';
import { Cart, GET_CART } from '../../graphql/cart';
import CartList from '../../components/cart';

export default function CartPage() {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  });

  if (!data) return null;

  const cartItems = Object.values(data) as Cart[];
  return (
    <div>
      <h2>장바구니</h2>
      {!cartItems.length && <small>장바구니가 비어있어요.</small>}
      <CartList items={cartItems} />
    </div>
  );
}
