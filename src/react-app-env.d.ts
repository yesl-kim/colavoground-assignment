/// <reference types="react-scripts" />

type Item = {
  id: string;
  name: string;
  count: number;
  price: number;
};

type Discount = {
  id: string;
  name: string;
  rate: number;
};

type Discounts = Discount[];
