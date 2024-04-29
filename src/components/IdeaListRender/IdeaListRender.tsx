import styles from "./IdeaList.module.scss";
import { IdeaObj } from "@/utilities/customTypes";

type IdeaListRenderProps = {
  ideaList: IdeaObj[];
};
export default function IdeaListRender(props: IdeaListRenderProps) {
  const renderIdeaList = () => {
    return props.ideaList.map((ideaObj) => {
      return <div className={styles.ideaBlockContainer}>{ideaObj.idea}</div>;
    });
  };

  return <div className={styles.container}>{renderIdeaList()}</div>;
}
