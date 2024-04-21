import { ProductObj } from "@/utilities/customTypes";
import getRecList from "./getRecList";
import getProductList from "./getProductList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const doRecList = searchParams.get("doRecList");
  const doProductList = searchParams.get("doProductList");

  let recList: string[] = [];
  if (doRecList == "1") {
    const res = await getRecList(searchParams);
    if (res.isError) {
      const status = res.status || 500;
      return Response.json(res.errorObj, { status });
    }
    recList = res.recList;
  }

  let productList: ProductObj[] = [];
  let productListQuery = "";
  if (doProductList == "1") {
    const res = await getProductList(searchParams, recList);
    if (res.isError) {
      const status = res.status || 500;
      return Response.json(res.errorObj, { status });
    }

    productList = res.productList;
    productListQuery = res.query;
  }

  return Response.json({ recList, productList, productListQuery });
}
