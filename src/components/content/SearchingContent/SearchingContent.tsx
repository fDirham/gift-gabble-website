import styles from "./SearchingContent.module.scss";
import { FormResponse, IdeaObj } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
type SearchingContentProps = {
  onBack: () => void;
  formResponse: FormResponse;
  ideaList: IdeaObj[];
};

export default function SearchingContent(props: SearchingContentProps) {
  const { who } = props.formResponse;

  const renderIdeaList = () => {
    return null;
  };

  return (
    <div className={styles.container}>
      <button
        onClick={props.onBack}
        className={"invisButton " + styles.backButton}
      >
        {"<- Go back and try again"}
      </button>
      <h2 className={styles.resultsBlurb}>
        Here are some gift ideas for your{" "}
        <span className={amaranth.className}>{who}</span>. Which one do you like
        the most?
      </h2>
      <span className={styles.amazonText}>
        Click on an idea to browse on Amazon
      </span>
      <div className={styles.redoContainer}>
        <span className={styles.redoText}>Don't like any?</span>
        <button className={styles.redoButton}>GENERATE NEW IDEAS</button>
      </div>
      <span className={styles.disclaimerText}>
        DISCLAIMER: As an Amazon Associate I earn from qualifying purchases.
      </span>
      {renderIdeaList()}
    </div>
  );
}
