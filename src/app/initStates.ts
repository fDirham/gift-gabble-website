// Change initialStates at the bottom
import { DUMMY_SEARCH_CONFIG } from "@/utilities/dummy";
import { AppStage } from "./page";

const INIT_STATE_DEFAULT = {
  appStage: AppStage.LANDING,
  loadingIdeaList: false,
  searchFormCache: null,
};
const INIT_STATE_FILLED_SEARCH = {
  ...INIT_STATE_DEFAULT,
  searchFormCache: DUMMY_SEARCH_CONFIG,
};

export const initialStates = INIT_STATE_DEFAULT;
