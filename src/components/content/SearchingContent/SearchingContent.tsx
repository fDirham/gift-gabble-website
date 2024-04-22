import styles from "./SearchingContent.module.scss";
import { ProductObj, FormResponse } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
import ProductList from "./ProductList/ProductList";
import { DUMMY_REC_LIST } from "@/utilities/dummy";
import { resolveWho } from "../LandingContent/SearchForm/SearchForm";
import { spawn } from "child_process";

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
  const { whoOne, whoTwo, budget } = props.formResponse;

  // Filter product list
  const [inBudgetProductList, overBudgetProductList] = (() => {
    const inBudget: ProductObj[] = [];
    const overBudget: ProductObj[] = [];
    props.productList.forEach((productObj) => {
      if (budget <= 0) {
        inBudget.push(productObj);
        return;
      }

      if (!productObj.price || !productObj.priceNum) {
        overBudget.push(productObj);
        return;
      }
      if (productObj.priceNum > budget + 2) {
        overBudget.push(productObj);
        return;
      }

      inBudget.push(productObj);
    });

    return [inBudget, overBudget];
  })();

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

  const renderProductList = () => {
    if (props.loadingProductList) {
      return <ProductList productList={[]} max={20} isLoading={true} />;
    }

    const toRender = [];
    const hasInBudget = inBudgetProductList.length > 0;
    const hasOverBudget = overBudgetProductList.length > 0;

    if (hasInBudget) {
      toRender.push(
        <ProductList
          productList={inBudgetProductList}
          max={10}
          isLoading={false}
          key={"inBudgetList"}
        />
      );
    }

    if (hasOverBudget) {
      let overBudgetText =
        "We also found these products that are over your set budget.";
      if (!hasInBudget) {
        overBudgetText =
          "We did not find any products within budget, we found these products though.";
      }

      toRender.push(
        <p className={styles.overBudgetText} key={"overBudgetText"}>
          {overBudgetText}
        </p>
      );
      toRender.push(
        <ProductList
          productList={overBudgetProductList}
          max={10}
          isLoading={false}
          key={"overBudgetList"}
        />
      );
    }

    if (!hasInBudget && !hasOverBudget) {
      return (
        <p className={styles.notFoundText}>
          No Amazon products found {"😔"}. <br />
          Feel free to search for{" "}
          <span className={styles.notFoundRecSpan}>"{props.currRec}"</span> on
          your own. Or try out another recommendation.
        </p>
      );
    }

    return toRender;
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
      {renderProductList()}
    </div>
  );
}
