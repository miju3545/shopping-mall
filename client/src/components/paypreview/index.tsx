import React, { SyntheticEvent } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux';
import ItemData from '../cart/itemData';
import siteMetaData from '../../data/siteMetaData';

export default function PayPreview({
  handleSubmit,
  submitTitle,
}: {
  handleSubmit: (e: SyntheticEvent) => void;
  submitTitle: string;
}) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const totalPrice = cart.reduce((sum, { price, amount }) => (sum += price * amount), 0);

  return (
    <div className="cart-paypreview">
      <h3>결제</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <ItemData item={item} />
          </li>
        ))}
      </ul>
      <p className="cart-paypreview__pay">
        총 결제 금액: {totalPrice.toLocaleString(siteMetaData.locale)}원
      </p>
      <div className="cart-paypreview__button-zone">
        <button onClick={handleSubmit} disabled={cart.length === 0}>
          {submitTitle}
        </button>
      </div>
    </div>
  );
}
