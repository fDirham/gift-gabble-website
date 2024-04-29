export type IdeaObj = {
  idea: string;
  imageList?: string[];
};

export type AmazonProductObj = {
  title: string;
  asin: string;
  linkUrl: string;
  imageUrl: string;
  rating: number;
  ratingsTotal: number;
  price: string;
  priceNum: number;
  isPrime: boolean;
};

export type FormResponse = {
  why: string;
  who: string;
  whoOne: string;
  whoTwo: string;
  desc: string;
  budget: number;
  whyExtra: string;
  giftNotes: string;
};

export type APIFormResponse = {
  who: string;
  why: string;
  whyExtra?: string;
  desc: string;
  budget: number;
  giftNotes?: string;
};

export type APIReturnREC = IdeaObj[];
