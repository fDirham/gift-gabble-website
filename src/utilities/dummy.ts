import { FormResponse } from "./customTypes";
import {
  DUMMY_PRODUCT_LIST_0,
  DUMMY_PRODUCT_LIST_1,
} from "./dummyProductLists";

export const DUMMY_SEARCH_CONFIG: FormResponse = {
  who: "girlfriend",
  why: "birthday",
  desc: "Lorem ipsum baba yetu mf",
  budget: 0,
};

export const DUMMY_REC_LIST: string[] = [
  "Personalized soccer keychain",
  "Soccer ball stress ball",
  "UFC keychain",
  "UFC poster",
  "Soccer socks",
  "UFC fight night snacks",
  "Soccer water bottle",
  "UFC fridge magnet",
  "Soccer phone grip",
  "UFC themed phone case",
];

export const DUMM_REC_PRODUCT_MAP = {
  [DUMMY_REC_LIST[0]]: DUMMY_PRODUCT_LIST_0,
  [DUMMY_REC_LIST[1]]: DUMMY_PRODUCT_LIST_1,
};
