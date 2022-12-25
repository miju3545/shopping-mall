import React from 'react';
import { Product } from 'constants/types';

export default function ProductDetail({ item }: { item: Product }) {
  const {
    category,
    title,
    description,
    image,
    price,
    rating: { rate },
  } = item;

  return (
    <div className="product-detail">
      <p className="product-detail__category">{category} </p>
      <p className="product-detail__title">{title} </p>
      <p className="product-detail__description">{description}</p>
      <img className="product-detail__image" src={image} alt="img" />
      <span className="product-detail__price">{price}</span>
      <span className="product-detail__rating">{rate}</span>
    </div>
  );
}
