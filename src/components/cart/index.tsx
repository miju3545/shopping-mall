import React from 'react';
import { Cart } from '../../graphql/cart';
import CartItem from './item';

export default function CartList({ items }: { items: Cart[] }) {
  return (
    <ul>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
