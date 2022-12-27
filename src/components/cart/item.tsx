import React, { SyntheticEvent, useState } from 'react';

import { useMutation } from 'react-query';
import { graphqlFetcher, getClient, QueryKeys } from '../../queryClient';
import { ADD_CART, Cart, UPDATE_CART } from '../../graphql/cart';

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
