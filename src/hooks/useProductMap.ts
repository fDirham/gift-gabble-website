import { AmazonProductObj } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";

export default function useProductMap() {
  const [productMap, setProductMap, resetProductMap] = useSessionStorage<{
    [k: string]: AmazonProductObj[];
  }>("productMap", {});

  return {
    productMap,
    setProductMap,
    resetProductMap,
  };
}
