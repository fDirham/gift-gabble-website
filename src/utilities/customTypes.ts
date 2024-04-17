export type ProductObj = {
  title: string;
  imageUrl: string;
  linkUrl: string;
  price: string;
  asin: string;
  rating?: number;
  ratingsTotal?: number;
  isPrime: boolean;
};

export type SearchConfig = {
  why: string;
  who: string;
  desc: string;
  budget: number;
};
