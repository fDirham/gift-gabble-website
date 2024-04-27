// Change initialStates at the bottom
import { DUMMY_SEARCH_CONFIG } from "@/utilities/dummy";

const INIT_STATE_DEFAULT = {
  isSearching: false,
  recIdx: 0,
  recList: [],
  recProductMap: {},
  loadingIdeaList: false,
  searchFormCache: null,
};
const INIT_STATE_FILLED_SEARCH = {
  ...INIT_STATE_DEFAULT,
  searchFormCache: DUMMY_SEARCH_CONFIG,
};

export const initialStates = INIT_STATE_DEFAULT;
