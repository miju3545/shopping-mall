import React from 'react';
import GlobalLayout from './pages/_layout';

import Index from './pages/index';
import CartIndex from './pages/cart';
import Payment from './pages/payment';
import ProductsIndex from './pages/products';
import ProductsId from './pages/products/[id]';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/cart', element: <CartIndex />, index: true },
      { path: '/payment', element: <Payment />, index: true },
      { path: '/products', element: <ProductsIndex />, index: true },
      { path: '/products/:id', element: <ProductsId /> },
    ],
  },
];

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/payment' },
  { route: '/products' },
  { route: '/products/:id' },
];
