import React, { SyntheticEvent, useState } from 'react';

import { useMutation } from 'react-query';
import { graphqlFetcher, getClient, QueryKeys } from '../../queryClient';
import { ADD_CART, Cart, DELETE_CART, UPDATE_CART } from '../../graphql/cart';

export default function CartItem({ item }: { item: Cart }) {
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
      onMutate: async (id) => {
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

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    updateCart(
      { id: item.id, amount }
      // {
      //   onSuccess: (newValue) => {
      //     const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>(QueryKeys.CART);
      //     const newCart = { ...prevCart, ...newValue };
      //     queryClient.setQueryData(QueryKeys.CART, newCart);
      //   },
      // }
    );
  };

  return (
    <li className="cart-item">
      <div className="cart-item__buttons">
        <input type="checkbox" className="cart-item__checkbox" />
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
      <p className="cart-item__price">{item.price}</p>
      <input
        type="number"
        className="cart-item__amount"
        value={item.amount}
        onChange={handleUpdateAmount}
      />
    </li>
  );
}
