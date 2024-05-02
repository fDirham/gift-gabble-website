import { IdeaObj } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";

export default function useIdeaList() {
  const [ideaList, setIdeaList, resetIdeaList] = useSessionStorage<IdeaObj[]>(
    "ideaList",
    []
  );

  return {
    ideaList,
    setIdeaList,
    resetIdeaList,
  };
}
