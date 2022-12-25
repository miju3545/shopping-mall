export type AnyOBJ = {
  [key: string]: any;
};

type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: Rating;
};
