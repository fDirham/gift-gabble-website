import styles from "./SearchingContent.module.scss";
import { ProductObj, SearchConfig } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
import StarRatings from "react-star-ratings";

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

  const renderProductList = () => {
    return props.productList.map((productObj) => {
      return (
        <div className={styles.productBlock} key={productObj.linkUrl}>
          <img className={styles.productImg} src={productObj.imageUrl} />
          <div className={styles.productCopyContainer}>
            <h3 className={styles.productTitle}>{productObj.title}</h3>
            {!!productObj.rating && (
              <div className={styles.ratingContainer}>
                <span className={styles.ratingText}>{productObj.rating}</span>
                <StarRatings
                  rating={productObj.rating}
                  starDimension="16px"
                  starSpacing="0px"
                  starRatedColor="#FEA31C"
                />
                <span className={styles.ratingCountText}>
                  {"(" + productObj.ratingsTotal + ")"}
                </span>
              </div>
            )}
            {!!productObj.isPrime && (
              <img
                src="prime_logo.jpg"
                alt="prime"
                className={styles.primeLogo}
              />
            )}

            <a
              className={"button " + styles.productLink}
              href={productObj.linkUrl}
              target="_blank"
            >
              {productObj.price} on <b>Amazon</b>
            </a>
          </div>
        </div>
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
      <div className={styles.productListContainer}>
        <span className={styles.disclaimerText}>
          DICLAIMER: As an Amazon Associate I earn from qualifying purchases.
        </span>
        {renderProductList()}
      </div>
    </div>
  );
}
