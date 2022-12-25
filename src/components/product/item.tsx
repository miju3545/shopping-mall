import { PRODUCT } from 'graphql/products';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({
  id,
  title,
  imageUrl,
  price,
  description,
  createdAt,
}: PRODUCT) {
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title} </p>
        <p className="product-item__description">{description}</p>
        <img className="product-item__image" src={imageUrl} alt="img" />
        <span className="product-item__price">{price}</span>
      </Link>
    </li>
  );
}
