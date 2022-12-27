import React, { useState } from 'react';

import { Product } from '../../graphql/products';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { ADD_CART } from '../../graphql/cart';

export default function ProductItem(product: Product) {
  const { id, title, imageUrl, price } = product;
  const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));

  return (
    <li className="product-item">
      <button onClick={() => addCart(product.id)} className="product-item__add-cart">
        장바구니 담기
      </button>
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
      </Link>
      <img className="product-item__image" src={imageUrl} alt="img" />
      <span className="product-item__price">{price}</span>
    </li>
  );
}
