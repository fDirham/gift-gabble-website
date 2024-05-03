export type IdeaObj = {
  idea: string;
  productList: ShallowAmazonProductObj[];
};

export type ShallowAmazonProductObj = {
  imageUrl: string;
  amazonUrl: string;
  title: string;
};

export type AmazonProductObj =
  | { isShallow: false; data: FullAmazonProductObj }
  | { isShallow: true; data: ShallowAmazonProductObj };

export type FullAmazonProductObj = {
  title: string;
  asin: string;
  linkUrl: string;
  imageUrl: string;
  rating?: number;
  ratingsTotal?: number;
  priceStr: string | null;
  priceSymbol: string | null;
  priceNum: number | null;
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
