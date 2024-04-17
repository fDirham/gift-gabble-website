import styles from "./SearchingContent.module.scss";
import { ProductObj, SearchConfig } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
import StarRatings from "react-star-ratings";
import ProductList from "./ProductList/ProductList";

type SearchingContentProps = {
  onBack: () => void;
  searchConfig: SearchConfig;
  recList: string[];
  productList: ProductObj[];
  currRec: string;
  onRecChange: (val: string) => void;
};

export default function SearchingContent(props: SearchingContentProps) {
  const { who } = props.searchConfig;

  const renderOther = () => {
    const renderRecList = props.recList.filter((rec) => rec !== props.currRec);
    return renderRecList.map((rec) => {
      return (
        <button
          className={"invisButton " + styles.otherRec}
          key={rec}
          onClick={() => props.onRecChange(rec)}
        >
          {rec}
        </button>
      );
    });
  };

  return (
    <div className={[styles.centerContainer].join(" ")}>
      <button
        onClick={props.onBack}
        className={"invisButton " + styles.backButton}
      >
        {"<- Go back and try again"}
      </button>
      <h2 className={styles.resultsBlurb}>
        We think your <span className={amaranth.className}>{who}</span> would
        love <span className={styles.recSpan}>{'"' + props.currRec + '"'}</span>
      </h2>
      <div className={styles.otherContainer}>
        <span className={styles.otherText}> They might also like: </span>
        {renderOther()}
      </div>
      <span className={styles.disclaimerText}>
        DICLAIMER: As an Amazon Associate I earn from qualifying purchases.
      </span>
      <ProductList productList={props.productList} />
    </div>
  );
}
