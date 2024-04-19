import { resolveWho } from "@/components/content/LandingContent/SearchForm/SearchForm";
import { APIFormResponse, FormResponse, ProductObj } from "./customTypes";
import { encodeObject, timeoutPromise } from "./helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const isDummyMode = process.env.NEXT_PUBLIC_DUMMY_MODE !== "0";

type FetchRecommendArgs = {
  formResponse?: FormResponse;
  doRecList?: boolean;
  doProductList?: boolean;
  searchKeyWords?: string;
};

export async function fetchRecommend(args: FetchRecommendArgs): Promise<
  | {
      isError: false;
      recList: string[];
      productList: ProductObj[];
      productListQuery: string;
    }
  | {
      isError: true;
      error: any;
    }
> {
  const recommendUrl = API_URL + "recommend";
  let queryComponents: { [key: string]: string | number } = {};
  if (args.formResponse) {
    queryComponents = convertFormResponseForAPI(args.formResponse);
  }
  if (args.doRecList) {
    queryComponents["doRecList"] = 1;
  }
  if (args.doProductList) {
    queryComponents["doProductList"] = 1;
  }
  if (args.searchKeyWords) {
    queryComponents["searchKeyWords"] = args.searchKeyWords;
  }
  if (isDummyMode) {
    queryComponents["returnDummy"] = 1;
    // Faux loading
    await timeoutPromise(3000);
  }
  const queryParams = "?" + encodeObject(queryComponents);

  try {
    const res = await fetch(recommendUrl + queryParams);
    const data = await res.json();
    if (res.ok) {
      return { isError: false, ...data };
    }
    throw data;
  } catch (error) {
    return { isError: true, error };
  }
}

function convertFormResponseForAPI(
  formResponse: FormResponse
): APIFormResponse {
  const who = resolveWho(formResponse.whoOne, formResponse.whoTwo);
  const toReturn: APIFormResponse = {
    who,
    why: formResponse.why,
    whyExtra: formResponse.whyExtra,
    desc: formResponse.desc,
    pronouns: formResponse.pronouns,
    budget: formResponse.budget,
  };

  return toReturn;
}
