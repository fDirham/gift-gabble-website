import { ProductObj } from "@/utilities/customTypes";
import getRecList from "./getRecList";
import getProductList from "./getProductList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const doRecList = searchParams.get("doRecList");
  const doProductList = searchParams.get("doProductList");

  const debugMode = searchParams.get("debugMode");
  const isDebug = debugMode === "1";

  let recList: string[] = [];
  if (doRecList == "1") {
    const res = await getRecList(searchParams, isDebug);
    if (res.isError) {
      const status = res.status || 500;
      return Response.json(res.errorObj, { status });
    }
    recList = res.recList;
  }

  let productList: ProductObj[] = [];
  if (doProductList == "1") {
    const res = await getProductList(searchParams, isDebug, recList);
    if (res.isError) {
      const status = res.status || 500;
      return Response.json(res.errorObj, { status });
    }

    productList = res.productList;
  }

  return Response.json({ recList, productList });
}
