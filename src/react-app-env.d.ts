/// <reference types="react-scripts" />

type Item = {
  id: string;
  name: string;
  count: number;
  price: number;
};

type Items = Item[] | [];
