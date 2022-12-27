import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux';
import ItemData from './itemData';
import siteMetaData from '../../data/siteMetaData';
import { Link, useNavigate, useNavigation, useRoutes } from 'react-router-dom';

export default function Pay() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, { price, amount }) => (sum += price * amount), 0);

  const handleSubmit = () => {
    if (cart.length) navigate('/payment');
  };
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
          결제하기
        </button>
      </div>
    </div>
  );
}
