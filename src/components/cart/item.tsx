import React, { SyntheticEvent, forwardRef, useRef } from 'react';

import { useMutation } from 'react-query';
import { graphqlFetcher, getClient, QueryKeys } from '../../queryClient';
import { Cart, DELETE_CART, UPDATE_CART } from '../../graphql/cart';
import siteMetaData from '../../data/siteMetaData';

const CartItem = forwardRef<HTMLInputElement, { item: Cart }>(function CartItem({ item }, ref) {
  const amountRef = useRef<HTMLInputElement | null>(null);
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);

        const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>(QueryKeys.CART);
        if (!prevCart?.[id]) return prevCart;

        const newCart = { ...(prevCart || {}), [id]: { ...prevCart[id], amount } };
        queryClient.setQueryData(QueryKeys.CART, newCart);
        return prevCart;
      },
      onSuccess: (newValue) => {
        const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>(QueryKeys.CART);
        const newCart = { ...(prevCart || {}), [item.id]: newValue };
        queryClient.setQueryData(QueryKeys.CART, newCart);
      },
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries(QueryKeys.CART);

        const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>(QueryKeys.CART);
        if (!prevCart?.[id]) return prevCart;

        const newCart = { ...(prevCart || {}) };
        delete newCart[id];

        queryClient.setQueryData(QueryKeys.CART, newCart);
        return prevCart;
      },
      onSuccess: (newValue) => {
        const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>(QueryKeys.CART);
        const newCart = { ...(prevCart || {}) };
        delete newCart?.[item.id];
        queryClient.setQueryData(QueryKeys.CART, newCart);
      },
    }
  );

  const handleUpdateAmount = (type: 'INCREASE' | 'DECREASE') => (e: SyntheticEvent) => {
    const current = Number(amountRef.current?.value || 0);
    const amount = type === 'INCREASE' ? current + 1 : current - 1;

    if (amount === 0) {
      alert('1개 이상부터 구매할 수 있는 상품입니다.');
      return;
    }

    updateCart({ id: item.id, amount });
  };

  return (
    <li className="cart-item">
      <div className="cart-item__buttons">
        <input type="checkbox" className="cart-item__checkbox" name={`select-item`} ref={ref} />
        <button
          type="button"
          className="cart-item__delete"
          onClick={() => deleteCart({ id: item.id })}
        >
          삭제
        </button>
      </div>
      <img src={item.imageUrl} className="cart-item__image" />
      <p className="cart-item__title">{item.title}</p>
      <p className="cart-item__price">
        {(item.amount * item.price).toLocaleString(siteMetaData.locale)}원
      </p>
      <div className="cart-item__amount-controller">
        <button type="button" onClick={handleUpdateAmount('DECREASE')}>
          -
        </button>
        <input
          disabled
          type="number"
          className="cart-item__amount"
          value={item.amount}
          ref={amountRef}
        />
        <button type="button" onClick={handleUpdateAmount('INCREASE')}>
          +
        </button>
      </div>
    </li>
  );
});

export default CartItem;
