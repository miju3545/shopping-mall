import React from 'react';
import { Product } from '../../graphql/products';

export default function ProductDetail({ item }: { item: Product }) {
  const { category, title, description, imageUrl, price } = item;
  return (
    <div className="product-detail">
      <p className="product-detail__category">{category} </p>
      <p className="product-detail__title">{title} </p>
      <p className="product-detail__description">{description}</p>
      <img className="product-detail__image" src={imageUrl} alt="img" />
      <span className="product-detail__price">{price}</span>
    </div>
  );
}
