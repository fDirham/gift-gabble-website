import { IdeaObj } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";

export default function useIdeaList() {
  const [ideaList, setIdeaList, isIdeaListLoaded, resetIdeaList] =
    useSessionStorage<IdeaObj[]>("ideaList", []);

  return {
    ideaList,
    setIdeaList,
    isIdeaListLoaded,
    resetIdeaList,
  };
}
