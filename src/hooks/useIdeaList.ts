import { IdeaObj } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";
import { useCallback } from "react";

export default function useIdeaList() {
  const [ideaList, setIdeaList, isIdeaListLoaded, resetIdeaList] =
    useSessionStorage<IdeaObj[]>("ideaList", []);

  const getProductListForIdea = useCallback(
    (idea: string) => {
      const obj = ideaList.find((e) => e.idea == idea);
      if (!obj) return null;
      return obj.productList;
    },
    [ideaList]
  );

  return {
    ideaList,
    setIdeaList,
    isIdeaListLoaded,
    resetIdeaList,
    getProductListForIdea,
  };
}
