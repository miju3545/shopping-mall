import React from 'react';
import { Cart } from '../../graphql/cart';
import CartItem from './item';

export default function CartList({ items }: { items: Cart[] }) {
  return (
    <>
      <label>
        <input type="checkbox" className="cart-item__checkbox" />
        전체선택
      </label>
      <ul className="cart">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}
