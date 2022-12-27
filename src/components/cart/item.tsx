import React, { SyntheticEvent, useState } from 'react';

import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { ADD_CART, Cart, UPDATE_CART } from '../../graphql/cart';

export default function CartItem({ item }: { item: Cart }) {
  const [amount, setAmount] = useState(item.amount);
  const { mutate: updateCart } = useMutation(({ id, amount }: { id: string; amount: number }) =>
    graphqlFetcher(UPDATE_CART, { id, amount })
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    setAmount(amount);
    updateCart({ id: item.id, amount });
  };

  return (
    <li className="cart-item">
      <img src={item.imageUrl} className="cart-item__image" />
      <p className="cart-item__title">{item.title}</p>
      <p className="cart-item__price">{item.price}</p>
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
    </li>
  );
}
