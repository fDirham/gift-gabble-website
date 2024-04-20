// Change initialStates at the bottom
import {
  DUMMY_REC_LIST,
  DUMMY_REC_PRODUCT_MAP,
  DUMMY_SEARCH_CONFIG,
} from "@/utilities/dummy";

const INIT_STATE_DEFAULT = {
  isSearching: false,
  recIdx: 0,
  recList: [],
  recProductMap: {},
  loadingRecList: false,
  loadingProductList: false,
  searchFormCache: null,
};

const INIT_STATE_LOADING_REC = {
  isSearching: false,
  recIdx: 0,
  recList: [],
  recProductMap: {},
  loadingRecList: true,
  loadingProductList: true,
  searchFormCache: DUMMY_SEARCH_CONFIG,
};

const INIT_STATE_LOADING_PRODUCT = {
  isSearching: true,
  recIdx: 0,
  recList: DUMMY_REC_LIST,
  recProductMap: {},
  loadingRecList: false,
  loadingProductList: true,
  searchFormCache: DUMMY_SEARCH_CONFIG,
};

const INIT_STATE_SEARCHING = {
  isSearching: true,
  recIdx: 0,
  recList: DUMMY_REC_LIST,
  recProductMap: DUMMY_REC_PRODUCT_MAP,
  loadingRecList: false,
  loadingProductList: false,
  searchFormCache: DUMMY_SEARCH_CONFIG,
};

const INIT_STATE_FILLED_SEARCH = {
  ...INIT_STATE_DEFAULT,
  searchFormCache: DUMMY_SEARCH_CONFIG,
};

export const initialStates = INIT_STATE_DEFAULT;
