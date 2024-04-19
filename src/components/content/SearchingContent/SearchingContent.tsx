import styles from "./SearchingContent.module.scss";
import { ProductObj, FormResponse } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
import ProductList from "./ProductList/ProductList";
import { DUMMY_REC_LIST } from "@/utilities/dummy";
import { resolveWho } from "../LandingContent/SearchForm/SearchForm";

type SearchingContentProps = {
  onBack: () => void;
  formResponse: FormResponse;
  recList: string[];
  productList: ProductObj[];
  currRec: string;
  onRecChange: (val: string) => void;
  loadingRecList: boolean;
  loadingProductList: boolean;
};

export default function SearchingContent(props: SearchingContentProps) {
  const { whoOne, whoTwo } = props.formResponse;

  const renderOther = () => {
    let renderRecList: string[] = [];
    const recObjClassList = [styles.otherRec];
    if (props.loadingRecList) {
      renderRecList = DUMMY_REC_LIST;
      recObjClassList.push(styles.loading);
    } else {
      renderRecList = props.recList.filter((rec) => rec !== props.currRec);
      recObjClassList.unshift("invisButton");
    }

    return renderRecList.map((rec) => {
      return (
        <button
          className={recObjClassList.join(" ")}
          key={rec}
          onClick={() => props.onRecChange(rec)}
        >
          {rec}
        </button>
      );
    });
  };

  const getRecSpanClass = () => {
    if (props.loadingRecList) {
      return [styles.recSpan, styles.loading].join(" ");
    }
    return styles.recSpan;
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
        We think your{" "}
        <span className={amaranth.className}>{resolveWho(whoOne, whoTwo)}</span>{" "}
        would love{" "}
        <span className={getRecSpanClass()}>{'"' + props.currRec + '"'}</span>
      </h2>
      <div className={styles.otherContainer}>
        <div className={styles.otherScrollContainer}>
          <span className={styles.otherText}> They might also like: </span>
          {renderOther()}
        </div>
      </div>
      <span className={styles.disclaimerText}>
        DISCLAIMER: As an Amazon Associate I earn from qualifying purchases.
      </span>
      <ProductList
        productList={props.productList}
        max={10}
        isLoading={props.loadingProductList}
      />
    </div>
  );
}
