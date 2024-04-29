export type IdeaObj = {
  idea: string;
  productList?: { link: string; image: string; title: string }[];
};

export type AmazonProductObj = {};

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
