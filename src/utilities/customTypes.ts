export type ProductObj = {
  title: string;
  imageUrl: string;
  linkUrl: string;
  price?: string;
  priceNum?: number;
  asin: string;
  rating?: number;
  ratingsTotal?: number;
  isPrime: boolean;
};

export type FormResponse = {
  why: string;
  whoOne: string;
  whoTwo: string;
  desc: string;
  budget: number;
  whyExtra: string;
  giftNotes: string;
};

export type APIFormResponse = {
  why: string;
  who: string;
  desc: string;
  budget: number;
  whyExtra?: string;
  giftNotes: string;
};
