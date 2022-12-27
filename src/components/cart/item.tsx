import React from 'react';

import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { ADD_CART, Cart, REMOVE_CART } from '../../graphql/cart';

export default function CartItem({ item }: { item: Cart }) {
  const { mutate: addItem } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));
  const { mutate: removeItem } = useMutation((id: string) => graphqlFetcher(REMOVE_CART, { id }));

  return (
    <div>
      <span>{item.title}</span>
      <div>
        <button onClick={() => removeItem(item.id)}>-</button>
        <span>{item.amount}</span>
        <button onClick={() => addItem(item.id)}>+</button>
      </div>
    </div>
  );
}
