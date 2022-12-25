import { Product } from 'constants/types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({
  id,
  title,
  image,
  price,
  category,
  description,
  rating,
}: Product) {
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__category">{category} </p>
        <p className="product-item__title">{title} </p>
        <p className="product-item__description">{description}</p>
        <img className="product-item__image" src={image} alt="img" />
        <span className="product-item__price">{price}</span>
        <span className="product-item__rating">{rating.rate}</span>
      </Link>
    </li>
  );
}
