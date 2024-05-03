import { FullAmazonProductObj } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";
import { useCallback } from "react";

export default function useProductMap() {
  const [productMap, setProductMap, isProductMapLoaded, resetProductMap] =
    useSessionStorage<{
      [k: string]: FullAmazonProductObj[];
    }>("productMap", {});

  const addToProductMap = useCallback(
    (k: string, productList: FullAmazonProductObj[]) => {
      if (isProductMapLoaded)
        setProductMap((curr) => {
          return { ...curr, [k]: productList };
        });
    },
    [productMap, setProductMap, isProductMapLoaded]
  );

  return {
    productMap,
    isProductMapLoaded,
    setProductMap,
    resetProductMap,
    addToProductMap,
  };
}
