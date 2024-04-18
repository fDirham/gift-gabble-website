import { ProductObj } from "@/utilities/customTypes";
import {
  DUMMY_PRODUCT_LIST_0,
  DUMMY_PRODUCT_LIST_1,
} from "@/utilities/dummyProductLists";
import { encodeObject } from "@/utilities/helpers";

export default async function getProductList(
  searchParams: URLSearchParams,
  isDebug: boolean,
  recList: string[]
): Promise<
  | { isError: false; productList: ProductObj[]; query: string }
  | { isError: true; errorObj: any; status?: number }
> {
  const searchKeyWords = searchParams.get("searchKeyWords");
  if (isDebug) {
    let productList = DUMMY_PRODUCT_LIST_0;
    if (searchKeyWords == "1") productList = DUMMY_PRODUCT_LIST_1;
    return { isError: false, productList, query: "debug " + searchKeyWords };
  }

  let query = searchKeyWords;
  if (!searchKeyWords) {
    if (recList.length) {
      query = recList[0];
    }
  }
  if (!query)
    return {
      isError: true,
      errorObj: { error: "Invalid inputs" },
      status: 400,
    };

  const productList = [];
  const params = {
    api_key: process.env.RAINFOREST_API_KEY!,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: query as string,
    associate_id: "fbdlabs-20",
    language: "en_US",
    currency: "usd",
    sort_by: "featured",
    page: "1",
    max_page: "1",
    output: "json",
  };

  try {
    const res = await fetch(
      `https://api.rainforestapi.com/request?` + encodeObject(params),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resObj = await res.json();
    const resList = resObj.search_results;
    for (let j = 0; j < resList.length; j++) {
      const curr = resList[j];
      const toAdd: ProductObj = {
        title: curr.title,
        asin: curr.asin,
        linkUrl: curr.link,
        imageUrl: curr.image,
        rating: curr.rating,
        ratingsTotal: curr.ratings_total,
        price: curr.price.raw,
        isPrime: curr.is_prime || false,
      };
      productList.push(toAdd);
    }
  } catch (e) {
    console.error("Retrieve product list failed", e);
    return {
      isError: true,
      errorObj: { error: "Failed to retrieve product list" },
      status: 500,
    };
  }

  return { isError: false, productList, query };
}
