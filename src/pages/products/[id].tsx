import React from 'react';
import { useQuery } from 'react-query';
import { fetcher, QueryKeys } from '../../queryClient';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery([QueryKeys.PRODUCTS, id], () =>
    fetcher({ method: 'GET', path: `/products/${id}` })
  );

  if (!data) return null;

  const {
    category,
    title,
    description,
    image,
    price,
    rating: { rate },
  } = data;

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
