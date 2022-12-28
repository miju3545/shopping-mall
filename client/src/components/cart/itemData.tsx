import React from 'react';
import { Cart } from '@/graphql/cart';
import siteMetaData from '../../data/siteMetaData';

export default function ItemData({ item }: { item: Cart }) {
  return (
    <>
      <img src={item.imageUrl} className="cart-item__image" />
      <p className="cart-item__title">{item.title}</p>
      <p className="cart-item__price">
        {item.amount}개 → {(item.amount * item.price).toLocaleString(siteMetaData.locale)}원
      </p>
    </>
  );
}
