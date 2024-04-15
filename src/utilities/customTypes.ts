export type SearchResult = {
  title: string;
  imageUrl: string;
  linkUrl: string;
  price: string;
  asin: string;
  rating: number;
};

export type SearchConfig = {
  why: string;
  who: string;
  desc: string;
  budget: number;
};
