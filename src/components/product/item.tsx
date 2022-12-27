import React, { useState } from 'react';

import { Product } from '../../graphql/products';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { ADD_CART } from '../../graphql/cart';
import siteMetaData from '../../data/siteMetaData';

export default function ProductItem(product: Product) {
  const { id, title, imageUrl, price } = product;
  const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));

  return (
    <li className="product-item">
      <div className="product-item__buttons">
        <button onClick={() => addCart(product.id)} className="product-item__add-cart">
          장바구니 담기
        </button>
      </div>
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
      </Link>
      <img className="product-item__image" src={imageUrl} alt="img" />
      <p className="product-item__price">{price.toLocaleString(siteMetaData.locale)}원</p>
    </li>
  );
}
